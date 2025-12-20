import { useState, useEffect } from "react";

import AddBtn from  '../../components/addBtn';

const Staff = ({ toggleDialog }) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [newStaff, setNewStaff] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const fetchStaffs = () => {
        fetch('http://localhost:8080/staff')
            .then(response => response.json())
            .then(data => setStaffs(data))
            .catch(error => console.error('Error fetching staffs:', error));
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const handleAddStaff = () => {
        fetch('http://localhost:8080/staff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStaff),
        })
        .then(() => {
            setShowAddDialog(false);
            fetchStaffs();
            setNewStaff({
                firstName: '',
                lastName: '',
                phone: '',
                email: ''
            });
        })
        .catch((error) => console.error('Error adding staff:', error));
    };

    return ( 
        <>
            <div
                className="absolute inset-0 bg-black opacity-75"
                onClick={() => toggleDialog(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-2/3">
                    <div className="flex flex-row">
                        <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm"/>
                        <button className="ml-auto font-bold text-2xl cursor-pointer" onClick={() => toggleDialog(false)}>✕</button>
                    </div>
                    <div className="w-full mt-3">
                        <div class="w-full mx-auto bg-[#3a3a3a] rounded-xl overflow-hidden border border-gray-600">
                            <table class="w-full text-left">
                            <thead class="bg-[#4a4a4a] text-gray-200">
                                <tr class="border-b border-gray-600">
                                <th class="px-6 py-4 font-semibold">Họ và Tên</th>
                                <th class="px-6 py-4 font-semibold">Số điện thoại</th>
                                <th class="px-6 py-4 font-semibold">Email</th>
                                <th class="px-1 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map((staff) => (
                                    <tr key={staff.id} class="border-b border-gray-600 group">
                                        <td class="px-6 py-4 font-semibold">{staff.lastName} {staff.firstName}</td>
                                        <td class="px-6 py-4">{staff.phone}</td>
                                        <td class="px-6 py-4">{staff.email}</td>
                                        <td class="px-1 py-4 text-2xl text-red-500 cursor-pointer opacity-0 group-hover:opacity-100" onClick={() => { setSelectedStaff(staff); setShowDeleteDialog(true); }}>x</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showAddDialog && (
                <div>
                    <div className="absolute inset-0 bg-black opacity-75" onClick={() => setShowAddDialog(false)} />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                            <h2 className="text-2xl font-bold mb-4 self-center">Thêm nhân viên mới</h2>
                            <div className="flex flex-col gap-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="Họ"
                                    className="p-2 border border-gray-600 rounded-lg bg-(--inputBlack) text-white"
                                    value={newStaff.lastName}
                                    onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    className="p-2 border border-gray-600 rounded-lg bg-(--inputBlack) text-white"
                                    value={newStaff.firstName}
                                    onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="p-2 border border-gray-600 rounded-lg bg-(--inputBlack) text-white"
                                    value={newStaff.phone}
                                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="p-2 border border-gray-600 rounded-lg bg-(--inputBlack) text-white"
                                    value={newStaff.email}
                                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                                    onClick={handleAddStaff}
                                >Thêm</button>
                                <button
                                    className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
                                    onClick={() => setShowAddDialog(false)}
                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteDialog && selectedStaff && (
                <div>
                    <div className="absolute inset-0 bg-black opacity-75" onClick={() => setShowDeleteDialog(false)} />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                            <h2 className="text-2xl font-bold mb-4 self-center">Xác nhận xóa nhân viên</h2>
                            <p className="mb-6">Bạn có chắc chắn muốn xóa nhân viên {selectedStaff.lastName} {selectedStaff.firstName}?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                                    onClick={() => {
                                        fetch(`http://localhost:8080/staff/${selectedStaff.id}`, {
                                            method: 'DELETE',
                                        })
                                        .then(() => {
                                            setShowDeleteDialog(false);
                                            fetchStaffs();
                                        })
                                        .catch((error) => console.error('Error deleting staff:', error));
                                    }}
                                >Xóa</button>
                                <button
                                    className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
                                    onClick={() => setShowDeleteDialog(false)}
                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default Staff;