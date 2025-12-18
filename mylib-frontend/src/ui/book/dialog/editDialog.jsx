import { useState, useEffect } from 'react'

const EditDialog = ({toggleDialog, book, onUpdated}) =>{
    console.log(book)
    const [editBook, setEditBook] = useState({
        id: null,
        title: "",
        categoryId: null,
        category: "",
        publisherId: null,
        publisher: "",
        publicationYear: "",
        edition: "",
        copyTotal: "",
        copyAvailable: "",
        locationId: null,
        authorId: null,
        author: ""
    });

    const [showConfirmDialog,setShowConfirmDialog]= useState(false);

    useEffect(() => {
        if (book) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditBook({
                id: book.id,
                title: book.title ?? "",
                author: book.authors?.[0]?.name ?? "",
                authorId: book.authors?.[0]?.id ?? "",
                category: book.categories?.[0]?.name ?? "",
                categoryId: book.categories?.[0]?.id ?? "",
                publisherId: book.publisher.id ?? "",
                publisher: book.publisher.name ?? "",
                publicationYear: book.publicationYear ?? "",
                edition: book.edition ?? "",
                copyTotal: book.copyTotal ?? 0,
                copyAvailable: book.copyAvailable ?? 0,
                locationId: book.location.id ?? 1,
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleEditSave = () => {
        const payload = {
            title: editBook.title,
            categoryIds: [editBook.categoryId],
            publisherId: editBook.publisherId,
            publicationYear: Number(editBook.publicationYear),
            edition: Number(editBook.edition),
            copyTotal: Number(editBook.copyTotal),
            copyAvailable: Number(editBook.copyAvailable),
            locationId: editBook.locationId,
            authorIds: [editBook.authorId],
        };
        fetch(`http://localhost:8080/book/${editBook.id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then((data) => {
            console.log('Member updated successfully:', data);
            toggleDialog(false);
            if (onUpdated) onUpdated();
        })
        .catch((error) => console.error('Error updating member:', error));
    }

    const handleDelete = () => {
        if (!editBook.id) return;
        fetch(`http://localhost:8080/book/${editBook.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                toggleDialog(false);
                if (onUpdated) onUpdated();
            })
            .catch((error) => console.error('Error deleting book:', error));
    };
    return (
        <>
            <div className="absolute inset-0 bg-black opacity-75"/>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">Sửa sách</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="w-auto self-start">Tiêu đề sách</label>
                                <input 
                                    type="text" 
                                    className="flex-1 px-3 py-2 rounded-lg bg-black text-white" 
                                    name='title'
                                    value={editBook.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="w-auto self-start">Tác giả</label>
                                <input 
                                    type="text" 
                                    className="flex-1 px-3 py-2 rounded-lg bg-black text-white" 
                                    name='author'
                                    value={editBook.author || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-col flex-1">
                                    <label className="self-start">Thể loại</label>
                                    <select
                                        name="category"
                                        value={editBook.category || ""}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white appearance-none"
                                    >
                                        <option value="">Chọn thể loại</option>
                                        <option value="1">Science Fiction</option>
                                        <option value="2">Fantasy</option>
                                        <option value="3">History</option>
                                        <option value="4">Philosophy</option>
                                        <option value="5">Technology</option>
                                    </select>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="w-auto self-start">Xuất bản năm</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 px-3 py-2 rounded-lg bg-black text-white" 
                                        name='publicationYear'
                                        value={editBook.publicationYear || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-col flex-1">
                                    <label className="w-auto self-start">Tổng số sách</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 px-3 py-2 rounded-lg bg-black text-white" 
                                        name='copyTotal'
                                        value={editBook.copyTotal || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="w-auto self-start">Phiên bản</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 px-3 py-2 rounded-lg bg-black text-white" 
                                        name='edition'
                                        value={editBook.edition || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-12">
                        <div className="flex-1">
                            <button 
                                className="mt-4 px-6 py-2 bg-(--delBtn) text-black font-semibold rounded-lg hover:bg-(--delBtnH) cursor-pointer transition"
                                onClick={()=> setShowConfirmDialog(true)}
                                >
                                Xóa
                            </button>
                        </div>
                        <div className="">
                            <button 
                                className="px-6 py-2 mr-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition"
                                onClick={handleEditSave}
                            >
                                Lưu
                            </button>
                            <button 
                                className="mt-4 px-6 py-2 bg-(--cancelBtn) text-black font-semibold rounded-lg hover:bg-(--cancelBtnH) cursor-pointer transition"
                                onClick={() => toggleDialog(false)}
                                >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {showConfirmDialog && (
            <>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="fixed inset-0 flex items-center justify-center flex-col">
                    <div className="flex flex-col bg-(--containerBlack) rounded-lg p-6">
                        <p className='text-center font-semibold text-xl'>Bạn chắc chắn muốn xóa chứ?</p>
                        <div className="self-end">
                            <button 
                                className="px-6 py-2 mr-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition"
                                onClick={handleDelete}
                            >
                                Xóa
                            </button>
                            <button 
                                className="mt-4 px-6 py-2 bg-(--cancelBtn) text-black font-semibold rounded-lg hover:bg-(--cancelBtnH) cursor-pointer transition"
                                onClick={() => setShowConfirmDialog(false)}
                                >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )}
        </>
    );
}

export default EditDialog;