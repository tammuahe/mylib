import { useState, useEffect } from "react";

const AddDialog = ({ toggleDialog }) => {
    const [newBook, setNewBook] = useState({
        book_id: 0,
        title: "",
        category: "",
        publisher: "",
        publication_year: "",
        edition: "",
        name: "",
        copy_total: "",
        copy_available: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        setNewBook((prev) => ({
            ...prev,
            copy_available: prev.copy_total,
        }));
    }, [newBook.copy_total]);

    const handleAdd = () =>{
        console.log(newBook);
    }

    return (
        <>
            <div
                className="absolute inset-0 bg-black opacity-75"
                onClick={() => toggleDialog(false)}
            />

            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">
                            Thêm mới thành viên
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="self-start">Họ và Tên</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newBook.name}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Thành phố</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newBook.name}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Email</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newBook.name}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-12">
                        <button 
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={handleAdd}
                        >
                            Thêm
                        </button>

                        <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            onClick={() => toggleDialog(false)}
                        >
                            Huỷ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddDialog;
