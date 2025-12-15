import { useState } from "react";
import { SquarePen } from "lucide-react";
import AddBtn from "../components/addBtn";
import SearchBar from "../components/searchBar";

const BookMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const testbook =[
        {book_id: 1,
        title: "Harry Porter and the Philosopher's Stone",
        category: 'Khoa học viễn tưởng',
        publisher: "Scholastic",
        publication_year: 1997,
        edition: 1,
        name: "J.K. Rowling",
        copy_total: 5,
        copy_available: 3,},
        {book_id: 2,
        title: "To Kill a Mockingbird",
        category: 'Văn học cổ điển',
        publisher: "J.B. Lippincott & Co.",
        publication_year: 1960,
        edition: 1,
        name: "Harper Lee",
        copy_total: 4,
        copy_available: 1,},
        {book_id: 3,
        title: "1984",
        category: 'Chính trị - Xã hội',
        publisher: "Secker & Warburg",
        publication_year: 1949,
        edition: 1,
        name: "George Orwell",
        copy_total: 6,
        copy_available: 4,}
    ]
    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} />
                <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)"/>
            </div>
            <div className="w-full px-7 pb-7">
                {testbook.map((book) => (
                    <div key={book.book_id} className="w-full mb-5">
                        <div className="w-full h-full flex flex-row bg-[#D9D9D9] rounded-lg px-8 py-3 text-black">
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-xl">{book.title}</h2>
                                    <p className="text-lg">{book.name}</p>
                                    <div className="flex flex-row gap-10 text-sm mt-2">
                                        <p>Thể loại: {book.category}</p>
                                        <p>Nhà xuất bản: {book.publisher}</p>
                                        <p className>Xuất bản năm: {book.publication_year}</p>
                                        <p>Phiên bản: {book.edition}</p>
                                        <p>Số lượng: {book.copy_total}</p>
                                        <p>Số bản có thể mượn: {book.copy_total - book.copy_available}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="self-center">
                                <SquarePen className="w-7 h-7 cursor-pointer"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showAddDialog && (
                <>
                    <div className="absolute inset-0 bg-(--containerBlack) opacity-75" onClick={() => setShowAddDialog(false)}/>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                            <div className="flex flex-1 flex-col">
                                <h2 className="text-2xl font-bold mb-4 self-center">Thêm mới sách</h2>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label className="w-auto self-start">Tiêu đề sách</label>
                                        <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="w-auto self-start">Tác giả</label>
                                        <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-col flex-1">
                                            <label className="w-auto self-start">Thể loại</label>
                                            <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <label className="w-auto self-start">Xuất bản năm</label>
                                            <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-col flex-1">
                                            <label className="w-auto self-start">Tổng số sách</label>
                                            <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <label className="w-auto self-start">Phiên bản</label>
                                            <input type="text" className="flex-1 px-3 py-2 rounded-lg bg-black text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-12">
                                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition">
                                    Thêm
                                </button>
                                <button 
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition"
                                    onClick={() => setShowAddDialog(false)}
                                    >
                                    Huỷ
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BookMang;