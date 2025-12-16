import { useState, useEffect } from "react";

import AddBtn from  '../../components/addBtn';

const Staff = ({ toggleDialog }) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [staffs, setStaffs] = useState([]);

    const fetchStaffs = () => {
        fetch('http://localhost:8080/staff')
            .then(response => response.json())
            .then(data => setStaffs(data))
            .catch(error => console.error('Error fetching staffs:', error));
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

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
                        <button className="ml-auto font-bold text-2xl cursor-pointer" onClick={() => toggleDialog(false)}>X</button>
                    </div>
                    <div className="w-full mt-3">
                        <div class="w-full mx-auto bg-[#3a3a3a] rounded-xl overflow-hidden border border-gray-600">
                            <table class="w-full text-left">
                            <thead class="bg-[#4a4a4a] text-gray-200">
                                <tr class="border-b border-gray-600">
                                <th class="px-6 py-4 font-semibold">Họ và Tên</th>
                                <th class="px-6 py-4 font-semibold">Số điện thoại</th>
                                <th class="px-6 py-4 font-semibold">Email</th>
                                <th class="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map((staff) => (
                                    <tr key={staff.id} class="border-b border-gray-600">
                                        <td class="px-6 py-4 font-semibold">{staff.lastName} {staff.firstName}</td>
                                        <td class="px-6 py-4">{staff.phone}</td>
                                        <td class="px-6 py-4">{staff.email}</td>
                                        <td class="px-6 py-4 text-xl cursor-pointer opacity-0 hover:opacity-100" onClick={() => { setSelectedStaff(staff); setShowDeleteDialog(true); }}>x</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Staff;