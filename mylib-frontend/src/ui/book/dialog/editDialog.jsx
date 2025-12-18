import { useState, useEffect } from "react";

const EditDialog = ({ toggleDialog, book, onUpdated }) => {
    const [editBook, setEditBook] = useState({
        id: null,
        title: "",
        authorId: "",
        categoryId: "",
        publisherId: "",
        publicationYear: "",
        edition: "",
        copyTotal: "",
        copyAvailable: "",
        locationId: "",
    });

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const fetchAuthors = () => {
        fetch("http://localhost:8080/author")
            .then(res => res.json())
            .then(setAuthors)
            .catch(err => console.error(err));
    };

    const fetchPublishers = () => {
        fetch("http://localhost:8080/publisher")
            .then(res => res.json())
            .then(setPublishers)
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAuthors();
        fetchPublishers();
    }, []);

    useEffect(() => {
        if (!book) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEditBook({
            id: book.id,
            title: book.title ?? "",
            authorId: book.authors?.[0]?.id ?? "",
            categoryId: book.categories?.[0]?.id ?? "",
            publisherId: book.publisher?.id ?? "",
            publicationYear: book.publicationYear ?? "",
            edition: book.edition ?? "",
            copyTotal: book.copyTotal ?? "",
            copyAvailable: book.copyAvailable ?? "",
            locationId: book.location?.id ?? "",
        });
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditBook(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSave = () => {
        const payload = {
            title: editBook.title,
            authorIds: [Number(editBook.authorId)],
            categoryIds: [Number(editBook.categoryId)],
            publisherId: Number(editBook.publisherId),
            publicationYear: Number(editBook.publicationYear),
            edition: Number(editBook.edition),
            copyTotal: Number(editBook.copyTotal),
            copyAvailable: Number(editBook.copyAvailable),
            locationId: Number(editBook.locationId),
        };

        console.log("PUT payload:", payload);
        fetch(`http://localhost:8080/book/${editBook.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                toggleDialog(false);
                onUpdated && onUpdated();
            })
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/book/${editBook.id}`, {
            method: "DELETE",
        })
            .then(() => {
                toggleDialog(false);
                onUpdated && onUpdated();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className="absolute inset-0 bg-black opacity-75" />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sửa sách</h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label>Tiêu đề</label>
                            <input
                                name="title"
                                value={editBook.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-black text-white rounded"
                            />
                        </div>

                        <div>
                            <label>Tác giả</label>
                            <select
                                value={editBook.authorId}
                                onChange={e =>
                                    setEditBook(prev => ({
                                        ...prev,
                                        authorId: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 bg-black text-white rounded"
                            >
                                <option value="">Chọn tác giả</option>
                                {authors.map(a => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Nhà xuất bản</label>
                            <select
                                value={editBook.publisherId}
                                onChange={e =>
                                    setEditBook(prev => ({
                                        ...prev,
                                        publisherId: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 bg-black text-white rounded"
                            >
                                <option value="">Chọn NXB</option>
                                {publishers.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label>Thể loại</label>
                                <select
                                    value={editBook.categoryId}
                                    onChange={e =>
                                        setEditBook(prev => ({
                                            ...prev,
                                            categoryId: e.target.value,
                                        }))
                                    }
                                    className="w-full px-3 py-2 bg-black text-white rounded"
                                >
                                    <option value="">Chọn thể loại</option>
                                    <option value="1">Science Fiction</option>
                                    <option value="2">Fantasy</option>
                                    <option value="3">History</option>
                                    <option value="4">Philosophy</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label>Năm XB</label>
                                <input
                                    name="publicationYear"
                                    value={editBook.publicationYear}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-black text-white rounded"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label>Tổng số</label>
                                <input
                                    name="copyTotal"
                                    value={editBook.copyTotal}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-black text-white rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Phiên bản</label>
                                <input
                                    name="edition"
                                    value={editBook.edition}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-black text-white rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between pt-8">
                        <button
                            className="px-6 py-2 bg-red-500 rounded"
                            onClick={() => setShowConfirmDialog(true)}
                        >
                            Xóa
                        </button>

                        <div>
                            <button
                                className="px-6 py-2 bg-green-500 mr-4 rounded"
                                onClick={handleEditSave}
                            >
                                Lưu
                            </button>
                            <button
                                className="px-6 py-2 bg-gray-500 rounded"
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
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) p-6 rounded">
                            <p className="mb-4">Bạn chắc chắn muốn xóa?</p>
                            <button
                                className="px-6 py-2 bg-red-500 mr-4 rounded"
                                onClick={handleDelete}
                            >
                                Xóa
                            </button>
                            <button
                                className="px-6 py-2 bg-gray-500 rounded"
                                onClick={() => setShowConfirmDialog(false)}
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default EditDialog;
