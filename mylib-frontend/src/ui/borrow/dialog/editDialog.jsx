import { useState } from 'react'

const EditDialog = ({toggleDialog}) =>{
    const [editBook, setEditBook] = useState('');
    const [showConfirmDialog,setShowConfirmDialog]= useState(false);

    //GỌI API EDIT Ở ĐÂY
    
    // GỌI API XÓA Ở ĐÂY
    return (
        <>
            <div className="absolute inset-0 bg-black opacity-75" onClick={() => setShowEditDialog(false)}/>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">Sửa sách</h2>
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
                        <p className='text-center font-semibold text-xl'>Bạn chắc chắn muốn xóa chứ?</p>
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