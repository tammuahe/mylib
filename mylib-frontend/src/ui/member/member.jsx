import { useState, useEffect } from "react";

import SearchBar from "../components/searchBar";
import AddBtn from  '../components/addBtn';

import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";

const MemberMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/member')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error('Error fetching members:', error));
    }, []);

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <div className="flex-1 flex-row flex gap-5">
                    <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm"/>
                    <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)"/>
                </div>
                <button className="flex items-center rounded-lg bg-black px-3 py-1 text-white font-bold gap-6 cursor-pointer hover:bg-black-600 transition stroke">Nhân viên</button>
            </div>
            <div className="w-full px-7 pb-7">
                <div class="w-full mx-auto bg-[#3a3a3a] rounded-xl overflow-hidden border border-gray-600">
                    <table class="w-full text-left">
                    <thead class="bg-[#4a4a4a] text-gray-200">
                        <tr class="border-b border-gray-600">
                        <th class="px-6 py-4 font-semibold">Họ và Tên</th>
                        <th class="px-6 py-4 font-semibold">Số điện thoại</th>
                        <th class="px-6 py-4 font-semibold">Thành phố</th>
                        <th class="px-6 py-4 font-semibold">Email</th>
                        <th class="px-6 py-4 font-semibold">Trạng thái</th>
                        <th class="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id} class="border-b border-gray-600">
                                <td class="px-6 py-4 font-semibold">{member.lastName} {member.firstName}</td>
                                <td class="px-6 py-4">{member.phone}</td>
                                <td class="px-6 py-4">{member.city}</td>
                                <td class="px-6 py-4">{member.email}</td>
                                <td class="px-6 py-4 font-bold text-green-400">{member.status}</td>
                                <td class="px-6 py-4 text-xl cursor-pointer opacity-0 hover:opacity-100" onClick={()=>setShowEditDialog(true)}>≡</td>
                            </tr>
                        ))}

                    </tbody>
                    </table>
                </div>


            </div>
            {showAddDialog && (
                <AddDialog toggleDialog= {setShowAddDialog}/>
            )}
            {showEditDialog && (
                <EditDialog toggleDialog={setShowEditDialog}/>
            )}
        </div>
    );
}

export default MemberMang;