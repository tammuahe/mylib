import { useState, useEffect } from "react";

const AddDialog = ({ toggleDialog, onAdded }) => {
    const [newBook, setNewBook] = useState({
        title: "",
        categoryIds: [],        
        publisherId: null,      
        publicationYear: null,  
        edition: null,          
        copyTotal: null,        
        copyAvailable: null,    
        locationId: null,       
        authorIds: []           
    });
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const fetchAuthors = () => {
        fetch('http://localhost:8080/author')
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Error fetching staffs:', error));
    }
    const fetchPublishers = () => {
        fetch('http://localhost:8080/publisher')
            .then(response => response.json())
            .then(data => setPublishers(data))
            .catch(error => console.error('Error fetching staffs:', error));
    }

    useEffect(() => {
        fetchAuthors();
        fetchPublishers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewBook((prev) => ({
            ...prev,
            [name]: value === "" ? null : isNaN(value) ? value : Number(value),
        }));
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNewBook((prev) => ({
            ...prev,
            copyAvailable: prev.copyTotal,
        }));
    }, [newBook.copyTotal]);

    const handleAdd = () => {
        console.log("Payload gửi API:", newBook);
        fetch('http://localhost:8080/book',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newBook)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Member added successfully:', data);
            toggleDialog(false);
            if (onAdded) onAdded();
        })
        .catch(error => {
            console.error('Error adding member:', error);
        });
    };

    return (
        <>
            <div
                className="absolute inset-0 bg-black opacity-75"
                onClick={() => toggleDialog(false)}
            />

            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Thêm mới sách
                    </h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="title"
                                placeholder="Tiêu đề sách"
                                value={newBook.title}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <select
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        authorIds: [Number(e.target.value)],
                                    })
                                }
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn tác giả</option>
                                {authors.map((author)=>(
                                    <option value={author.id}>{author.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col flex-1">
                                <select
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            categoryIds: [Number(e.target.value)],
                                        })
                                    }
                                    className="px-3 py-2 rounded-lg bg-black text-white"
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
                                <input
                                    type="number"
                                    name="publicationYear"
                                    placeholder="Năm xuất bản"
                                    value={newBook.publicationYear ?? ""}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col flex-1">
                                <input
                                    type="number"
                                    name="copyTotal"
                                    placeholder="Tổng số sách"
                                    value={newBook.copyTotal ?? ""}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <input
                                    type="number"
                                    name="edition"
                                    placeholder="Phiên bản"
                                    value={newBook.edition ?? ""}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <select
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        publisherId: Number(e.target.value),
                                    })
                                }
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn NXB</option>
                                {publishers.map((publisher)=>(
                                    <option value={publisher.id}>{publisher.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <select
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        locationId: Number(e.target.value),
                                    })
                                }
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn vị trí</option>
                                <option value="1">Tầng 1</option>
                                <option value="2">Tầng 2</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-10">
                        <button
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={handleAdd}
                        >
                            Thêm
                        </button>
                        <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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