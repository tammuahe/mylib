import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import AddBtn from "../components/addBtn";
import SearchBar from "../components/searchBar";
import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";

const BookMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);    
    const [selectedBook, setSelectedBook] = useState(null);
    const [keyword, setKeyword] = useState("");

    const [books, setBooks] = useState([]);
    
    const fetchBook = (searchKeyword = "") => {
        const url = searchKeyword
            ? `http://localhost:8080/book?keyword=${encodeURIComponent(searchKeyword)}`
            : `http://localhost:8080/book`;

        fetch(url)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Error fetching books:", error));
    };

        useEffect(() => {
            fetchBook(keyword);
        }, [keyword]);

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} placeHolder="Thêm"/>
                <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)" onSearch={setKeyword}/>
            </div>
            <div className="w-full px-7 pb-7">
                {books.map((book) => (
                    <div key={book.id} className="w-full mb-5">
                        <div className="w-full h-full flex flex-row bg-[#D9D9D9] rounded-lg px-8 py-3 text-black">
                        <div className="flex-1">
                            <div className="flex flex-col">
                            <h2 className="font-bold text-xl">{book.title}</h2>
                            <p className="text-lg">
                                {book.authors.map((author) => author.name).join(", ")}
                            </p>
                            <div className="flex flex-row gap-10 text-sm mt-2">
                                <p>Thể loại: {book.categories.map((cat) => cat.name).join(", ")}</p>
                                <p>Nhà xuất bản: {book.publisher.name}</p>
                                <p>Xuất bản năm: {book.publicationYear}</p>
                                <p>Phiên bản: {book.edition}</p>
                                <p>Số lượng: {book.copyTotal}</p>
                                <p>Số bản có thể mượn: {book.copyTotal - book.copyAvailable}</p>
                                <p>Vị trí sách: {book.location.shelfName} (Tầng {book.location.floorNo})</p>
                            </div>
                            </div>
                        </div>
                        <div className="self-center" onClick={() => {setShowEditDialog(true); setSelectedBook(book);}}>
                            <SquarePen className="w-7 h-7 cursor-pointer" />
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            {showAddDialog && (
                <AddDialog toggleDialog= {setShowAddDialog} onAdded={fetchBook}/>
            )}
            {showEditDialog && (
                <EditDialog toggleDialog={setShowEditDialog} book={selectedBook} onUpdated={fetchBook}/>
            )}
        </div>
    );
}

export default BookMang;