import { useState, useEffect } from "react";

import SearchBar from "../components/searchBar";
import AddBtn from  '../components/addBtn';

import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";

import {Funnel, ChevronDown} from 'lucide-react'


const BorrowMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [borrows, setBorrows] = useState([]);
    const [selectedBorrow, setSelectedBorrow] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);

    const [filteredStatus, setFilteredStatus] = useState('ALL');

    const fetchBorrow = () => {
        fetch('http://localhost:8080/borrow')
            .then(response => response.json())
            .then(data => {
                setBorrows(data);
                console.log('Fetched borrows:', data);
            })
            .catch(error => console.error('Error fetching borrows:', error));
    };

    useEffect(() => {
        fetchBorrow();
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null);
            setOpenFilter(false);
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const statuses = [
        { key: 'ALL', label: 'Tất cả' },
        { key: 'BORROWED', label: 'Đang mượn' },
        { key: 'RETURNED', label: 'Đã trả' },
        { key: 'OVERDUE', label: 'Quá hạn' },
        { key: 'LOST', label: 'Mất' },
    ];

    const displayedBorrows = filteredStatus === 'ALL' ? borrows : borrows.filter(b => b?.status === filteredStatus);

    const handleSelectStatus = (status) => {
        setFilteredStatus(status);
        setOpenFilter(false);
    };

    const handleConfirmReturn = (borrow) =>{
        fetch(`http://localhost:8080/borrow/${borrow.id}/status/RETURNED`, {
            method: 'PATCH',
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                fetchBorrow();
                console.log('first')
            })
            .catch((error) => console.error('Error deleting member:', error));
    }

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-10">
                <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)"/>
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm đơn mượn"/>
                <div className="relative">
                    <button
                        className="flex-row center-flex gap-3 bg-black rounded px-3 py-1"
                        onClick={(e) => { e.stopPropagation(); setOpenFilter(!openFilter); }}
                    >
                        <Funnel/>
                        {statuses.find(s => s.key === filteredStatus)?.label || filteredStatus}
                        <ChevronDown/>
                    </button>

                    {openFilter && (
                        <div
                            className="absolute mt-2 right-0 z-50 w-40 bg-[#2b2b2b] rounded-md shadow-lg border border-gray-600 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {statuses.map((s) => (
                                <button
                                    key={s.key}
                                    className={`w-full text-left px-4 py-2 hover:bg-[#3a3a3a] ${s.key === filteredStatus ? 'font-semibold' : ''}`}
                                    onClick={() => handleSelectStatus(s.key)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full px-7 pb-7">
                <div className="w-full mx-auto bg-[#3a3a3a] border border-gray-600">
                    <table className="w-full text-left">
                        <thead className="bg-[#4a4a4a] text-gray-200">
                            <tr className="border-b border-gray-600">
                                <th className="px-6 py-4 font-semibold">Tên sách</th>
                                <th className="px-6 py-4 font-semibold">Người mượn</th>
                                <th className="px-6 py-4 font-semibold">Ngày mượn</th>
                                <th className="px-6 py-4 font-semibold">Ngày trả</th>
                                <th className="px-6 py-4 font-semibold">Nhân viên tạo đơn</th>
                                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {displayedBorrows.map((borrow) => (
                            <tr key={borrow.id} className="border-b">
                            <td className="px-6 py-4">
                                {borrow.book?.title}
                            </td>

                            <td className="px-6 py-4">
                                {borrow.member?.firstName} {borrow.member?.lastName}
                            </td>

                            <td className="px-6 py-4">
                                {new Date(borrow.borrowAt).toLocaleDateString("vi-VN")}
                            </td>
                            
                            <td className="px-6 py-4">
                                {borrow.returnAt
                                ? new Date(borrow.returnAt).toLocaleDateString("vi-VN")
                                : "-"}
                            </td>

                            <td className="px-6 py-4">
                                {borrow.issuedBy?.firstName} {borrow.issuedBy?.lastName}
                            </td>

                            <td className="px-6 py-4 font-semibold">
                                <span
                                    className={{
                                    BORROWED: "text-yellow-400",
                                    RETURNED: "text-green-400",
                                    OVERDUE: "text-red-400",
                                    LOST: "text-red-400",
                                    }[borrow.status]}
                                >
                                    {{
                                    BORROWED: "Đang mượn",
                                    RETURNED: "Đã trả",
                                    OVERDUE: "Quá hạn",
                                    LOST: "Mất",
                                    }[borrow.status]}
                                </span>
                            </td>
                            <td className="px-6 py-4 relative">
                                <span
                                    className="text-xl cursor-pointer opacity-0 hover:opacity-100"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === borrow.id ? null : borrow.id);
                                        setSelectedBorrow(borrow);
                                    }}
                                >
                                    ≡
                                </span>

                                {openMenuId === borrow.id && (
                                    <div
                                        className="absolute right-6 top-10 z-[9999] w-40 bg-[#2b2b2b] rounded-md shadow-lg border border-gray-600 overflow-hidden"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {borrow.status === "BORROWED" && (
                                            <button
                                                className="w-full text-left px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]"
                                                onClick={() => {
                                                    console.log("Confirm return:", borrow.id);
                                                    handleConfirmReturn(selectedBorrow);
                                                    setOpenMenuId(null);
                                                }}
                                            >
                                                Xác nhận trả
                                            </button>
                                        )}

                                        <button
                                            className="w-full text-left px-4 py-2 cursor-pointer hover:bg-black"
                                            onClick={() => {
                                                console.log("Delete borrow:", borrow.id);
                                                setOpenMenuId(null);
                                            }}
                                        >
                                            Xoá đơn
                                        </button>
                                    </div>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showAddDialog && (
                <AddDialog toggleDialog= {setShowAddDialog}/>
            )}
            
        </div>
    );
}
 
export default BorrowMang;