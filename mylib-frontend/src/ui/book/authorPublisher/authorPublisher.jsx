import { useState, useEffect } from "react";


const AuthorPublisherDialog = ({toggleDialog}) => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({
        name: ''
    });
    const [publishers, setPublishers] = useState([]);
    const [newPublisher, setNewPublisher] = useState({
        language: '',
        name: ''
    });

    const [selectedAuthor, setSeletedAuthor] = useState(null);
    const [selectedPublisher, setSeletedPublisher] = useState(null);
    const [showConfirmDeleteAuthorDialog, setShowConfirmDeleteAuthorDialog] = useState(false);
    const [showConfirmDeletePublisherDialog, setShowConfirmDeletePublisherDialog] = useState(false);

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

    const handleAddAuthor = () => {
        fetch('http://localhost:8080/author', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAuthor),
        })
        .then(() => {
            fetchAuthors();
            setNewAuthor({
                name: ''
            });
        })
        .catch((error) => console.error('Error adding author:', error));
    };

    const handleAddPublisher = () => {
        console.log(newPublisher);
        fetch('http://localhost:8080/publisher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPublisher),
        })
        .then(() => {
            fetchPublishers();
            setNewPublisher({
                language: '',
                name: ''
            });
        })
        .catch((error) => console.error('Error adding publisher:', error));
    };

    return ( 
        <>
            <div
                className="absolute inset-0 bg-black opacity-75"
            />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-2/3">
                    <div className="flex justify-end">
                        <button
                            className="font-bold text-2xl cursor-pointer"
                            onClick={() => toggleDialog(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Thêm mới tác giả"
                                value={newAuthor.name}
                                className="flex-1 bg-transparent border border-neutral-600 rounded px-3 py-2 text-gray-400 placeholder-gray-500 focus:outline-none focus:border-neutral-500"
                                onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                            />
                            <button 
                                className="w-10 h-10 border border-neutral-600 rounded flex items-center justify-center text-gray-400 hover:bg-neutral-700 transition-colors text-xl cursor-pointer"
                                onClick={handleAddAuthor}
                            >
                                +
                            </button>
                        </div>

                        <div className="border border-neutral-600 rounded overflow-hidden">
                            <div className="bg-neutral-700 px-4 py-3 text-center">
                            <span className="text-white font-bold">Tác Giả</span>
                            </div>
                            <div className="divide-y divide-neutral-700">
                            {authors.map((author) => (
                                <div key={author.id} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-700/50">
                                    <span className="text-white">{author.name}</span>
                                    <button 
                                        className="text-gray-500 hover:text-white text-sm cursor-pointer"
                                        onClick={()=>{
                                            setSeletedAuthor(author);
                                            setShowConfirmDeleteAuthorDialog(true);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Thêm mới nhà phát hành"
                                value={newPublisher.name}
                                className="flex-1 bg-transparent border border-neutral-600 rounded px-3 py-2 text-gray-400 placeholder-gray-500 focus:outline-none focus:border-neutral-500"
                                onChange={(e) => setNewPublisher({ ...newPublisher, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Ngôn ngữ (EN,VI,...)"
                                value={newPublisher.language}
                                className="bg-transparent border border-neutral-600 rounded px-3 py-2 text-gray-400 placeholder-gray-500 focus:outline-none focus:border-neutral-500"
                                onChange={(e) => setNewPublisher({ ...newPublisher, language: e.target.value })}
                            />
                            <button 
                                className="w-10 h-10 border border-neutral-600 rounded flex items-center justify-center text-gray-400 hover:bg-neutral-700 transition-colors text-xl cursor-pointer"
                                onClick={handleAddPublisher}
                            >
                                +
                            </button>
                        </div>

                        <div className="border border-neutral-600 rounded overflow-hidden">
                            <div className="bg-neutral-700 px-4 py-3 text-center">
                            <span className="text-white font-bold">Nhà phát hành</span>
                            </div>
                            <div className="divide-y divide-neutral-700">
                            {publishers.map((publisher) => (
                                <div key={publisher.id} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-700/50">
                                    <span className="text-white">{publisher.language}</span>
                                    <span className="text-white">{publisher.name}</span>
                                    <button 
                                        className="text-gray-500 hover:text-white text-sm cursor-pointer"
                                        onClick={()=>{
                                            setSeletedPublisher(publisher);
                                            setShowConfirmDeletePublisherDialog(true);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmDeleteAuthorDialog && selectedAuthor && (
                <div>
                    <div className="absolute inset-0 bg-black opacity-75"/>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                            <h2 className="text-2xl font-bold mb-4 self-center">Xác nhận xóa tác giả</h2>
                            <p className="mb-6">Bạn có chắc chắn muốn xóa tác giả {selectedAuthor.name} ?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                                    onClick={() => {
                                        fetch(`http://localhost:8080/author/${selectedAuthor.id}`, {
                                            method: 'DELETE',
                                        })
                                        .then(() => {
                                            setShowConfirmDeleteAuthorDialog(false);
                                            fetchAuthors();
                                        })
                                        .catch((error) => console.error('Error deleting staff:', error));
                                    }}
                                >Xóa</button>
                                <button
                                    className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
                                    onClick={() => setShowConfirmDeleteAuthorDialog(false)}
                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmDeletePublisherDialog && selectedPublisher && (
                <div>
                    <div className="absolute inset-0 bg-black opacity-75"/>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                            <h2 className="text-2xl font-bold mb-4 self-center">Xác nhận xóa tác giả</h2>
                            <p className="mb-6">Bạn có chắc chắn muốn xóa nhà phát hành {selectedPublisher.name} ?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                                    onClick={() => {
                                        fetch(`http://localhost:8080/publisher/${selectedPublisher.id}`, {
                                            method: 'DELETE',
                                        })
                                        .then(() => {
                                            setShowConfirmDeletePublisherDialog(false);
                                            fetchPublishers();
                                        })
                                        .catch((error) => console.error('Error deleting staff:', error));
                                    }}
                                >Xóa</button>
                                <button
                                    className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
                                    onClick={() => setShowConfirmDeletePublisherDialog(false)}
                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default AuthorPublisherDialog;