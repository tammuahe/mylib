import { useState, useEffect } from "react";

import SearchBar from "../components/searchBar";
import AddBtn from  '../components/addBtn';

import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";
import StaffDialog from "./staff/staff";

const MemberMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showStaffDialog, setShowStaffDialog] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [keyword, setKeyword] = useState("");

    const [members, setMembers] = useState([]);


    const fetchMembers = (searchKeyword = "") => {
        const url = searchKeyword
            ? `http://localhost:8080/member?keyword=${encodeURIComponent(searchKeyword)}`
            : `http://localhost:8080/member`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error("Error fetching books:", error));
    };

    useEffect(() => {
        fetchMembers(keyword);
    }, [keyword]);

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <div className="flex-1 flex-row flex gap-5">
                    <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm"/>
                    <SearchBar placeHolder="Tìm kiếm thành viên theo tên, số điện thoại, email" onSearch={setKeyword}/>
                </div>
                <button 
                    className="flex items-center rounded-lg bg-black px-3 py-1 text-white font-bold gap-6 cursor-pointer hover:bg-black-600 transition stroke"
                    onClick={()=>setShowStaffDialog(true)}
                >
                    Nhân viên
                </button>
            </div>
            <div className="w-full px-7 pb-7">
                <div className="w-full mx-auto bg-[#3a3a3a] rounded-xl overflow-hidden border border-gray-600">
                    <table className="w-full text-left">
                    <thead className="bg-[#4a4a4a] text-gray-200">
                        <tr className="border-b border-gray-600">
                        <th className="px-6 py-4 font-semibold">Họ và Tên</th>
                        <th className="px-6 py-4 font-semibold">Số điện thoại</th>
                        <th className="px-6 py-4 font-semibold">Thành phố</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Trạng thái</th>
                        <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id} className="border-b border-gray-600">
                                <td className="px-6 py-4 font-semibold">{member.lastName} {member.firstName}</td>
                                <td className="px-6 py-4">{member.phone}</td>
                                <td className="px-6 py-4">{member.city}</td>
                                <td className="px-6 py-4">{member.email}</td>
                                {member.active ?
                                    <td className="px-6 py-4 font-bold text-green-400">Hoạt động</td> :<td className="px-6 py-4 font-bold text-red-400">Không hoạt động</td>}
                                <td className="px-6 py-4 text-xl cursor-pointer opacity-0 hover:opacity-100" onClick={() => { setSelectedMember(member); setShowEditDialog(true); }}>≡</td>
                            </tr>
                        ))}

                    </tbody>
                    </table>
                </div>


            </div>
            {showAddDialog && (
                <AddDialog toggleDialog= {setShowAddDialog} onAdded={fetchMembers} />
            )}
            {showEditDialog && (
                <EditDialog toggleDialog={setShowEditDialog} member={selectedMember} onUpdated={fetchMembers} />
            )}
            {showStaffDialog && (
                <StaffDialog toggleDialog={setShowStaffDialog} />
            )}
        </div>
    );
}

export default MemberMang;