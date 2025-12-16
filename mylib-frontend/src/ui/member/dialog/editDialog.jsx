import { useState } from 'react'

const EditDialog = ({toggleDialog}) =>{
    const [editMember, setEditMember] = useState({
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
    const [showConfirmDialog,setShowConfirmDialog]= useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //GỌI API EDIT Ở ĐÂY
    
    // GỌI API XÓA Ở ĐÂY
    return (
        <>
            <div className="absolute inset-0 bg-black opacity-75" onClick={() => setShowEditDialog(false)}/>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">Sửa thông tin thành viên</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="self-start">Họ và Tên</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editMember.title}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editMember.name}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Thành phố</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editMember.name}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Email</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editMember.name}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
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
                            <button className="px-6 py-2 mr-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition">
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
                        <p className='text-center font-semibold text-xl'>Bạn chắc chắn muốn xóa thành viên này chứ?</p>
                        <div className="self-end">
                            <button className="px-6 py-2 mr-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition">
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