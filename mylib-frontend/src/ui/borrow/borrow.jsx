import { useState, useEffect } from "react";

import SearchBar from "../components/searchBar";
import AddBtn from  '../components/addBtn';

import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";

import {Funnel, ChevronDown} from 'lucide-react'


const BorrowMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const [filteredStatus, setFilteredStatus] = useState('ALL');

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-10">
                <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)"/>
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm đơn mượn"/>
                <button className="flex-row center-flex gap-3 bg-black rounded px-3 py-1">
                    <Funnel/>
                    {filteredStatus}
                    <ChevronDown/>
                </button>
            </div>
            <div className="w-full px-7 pb-7">
                <div class="w-full mx-auto bg-[#3a3a3a] rounded-xl overflow-hidden border border-gray-600">
                    <table class="w-full text-left">
                    <thead class="bg-[#4a4a4a] text-gray-200">
                        <tr class="border-b border-gray-600">
                        <th class="px-6 py-4 font-semibold">Tên sách</th>
                        <th class="px-6 py-4 font-semibold">Người mượn</th>
                        <th class="px-6 py-4 font-semibold">Ngày mượn</th>
                        <th class="px-6 py-4 font-semibold">Ngày trả</th>
                        <th class="px-6 py-4 font-semibold">Nhân viên tạo đơn</th>
                        <th class="px-6 py-4 font-semibold">Trạng thái</th>
                        <th class="px-6 py-4"></th>
                        </tr>
                    </thead>
                        <tr class="border-b border-gray-600">
                        <td class="px-6 py-4 font-semibold">Clean Code</td>
                        <td class="px-6 py-4">Nguyễn Văn A</td>
                        <td class="px-6 py-4">1/12/2025</td>
                        <td class="px-6 py-4">20/12/2025</td>
                        <td class="px-6 py-4 font-semibold">Lê thị X</td>
                        <td class="px-6 py-4 font-bold text-green-400">ACTIVE</td>
                        <td class="px-6 py-4 text-xl cursor-pointer opacity-0 hover:opacity-100" onClick={()=>setShowEditDialog(true)}>≡</td>
                        </tr>

                        <tr class="border-b border-gray-600">
                        <td class="px-6 py-4 font-semibold">Nguyễn Thị B</td>
                        <td class="px-6 py-4">0123456789</td>
                        <td class="px-6 py-4">Tuyên Quang</td>
                        <td class="px-6 py-4">bnguyenthi@gmail.com</td>
                        <td class="px-6 py-4 font-bold text-green-400">ACTIVE</td>
                        <td class="px-6 py-4 text-xl cursor-pointer opacity-0 hover:opacity-100" onClick={()=>setShowEditDialog(true)}>≡</td>
                        </tr>
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
 
export default BorrowMang;