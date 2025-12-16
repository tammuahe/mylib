import { useState } from "react";
import { SquarePen } from "lucide-react";
import AddBtn from "../components/addBtn";
import SearchBar from "../components/searchBar";
import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";

const BookMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
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

    const res = async () => {
        const response = await fetch("http://localhost:8080/api/books");
        const data = await response.json();
        console.log(data);
    }

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm"/>
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
                            <div className="self-center" onClick={() => setShowEditDialog(true)}>
                                <SquarePen className="w-7 h-7 cursor-pointer"/>
                            </div>
                        </div>
                    </div>
                ))}
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

export default BookMang;