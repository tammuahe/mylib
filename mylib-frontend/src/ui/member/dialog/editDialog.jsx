import { useState, useEffect } from 'react'

const EditDialog = ({ toggleDialog, member, onUpdated }) => {
    const [editMember, setEditMember] = useState({
        id: null,
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        email: "",
        active: true,
    });
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        if (member) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditMember({
                id: member.id ?? null,
                firstName: member.firstName ?? "",
                lastName: member.lastName ?? "",
                phone: member.phone ?? "",
                city: member.city ?? "",
                email: member.email ?? "",
                active: member.active ?? true,
            });
        }
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleToggleActive = (e) => {
        const { checked } = e.target;
        setEditMember((prev) => ({
            ...prev,
            active: checked,
        }));
    };

    const handleSave = () => {
        if (!editMember.id) return;
        fetch(`http://localhost:8080/member/${editMember.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editMember),
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
    };

    const handleDelete = () => {
        if (!editMember.id) return;
        fetch(`http://localhost:8080/member/${editMember.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                toggleDialog(false);
                if (onUpdated) onUpdated();
            })
            .catch((error) => console.error('Error deleting member:', error));
    };

    return (
        <>
            <div className="absolute inset-0 bg-black opacity-75" onClick={() => toggleDialog(false)} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">Sửa thông tin thành viên</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="self-start">Họ</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editMember.lastName}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Tên</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editMember.firstName}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editMember.phone}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Thành phố</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={editMember.city}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={editMember.email}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={editMember.active}
                                    onChange={handleToggleActive}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <label htmlFor="active" className="cursor-pointer select-none">
                                    Đang hoạt động
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-12">
                        <div className="flex-1">
                            <button
                                className="mt-4 px-6 py-2 bg-(--delBtn) text-black font-semibold rounded-lg hover:bg-(--delBtnH) cursor-pointer transition"
                                onClick={() => setShowConfirmDialog(true)}
                            >
                                Xóa
                            </button>
                        </div>
                        <div className="">
                            <button
                                className="px-6 py-2 mr-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition"
                                onClick={handleSave}
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
                            <p className="text-center font-semibold text-xl">Bạn chắc chắn muốn xóa thành viên này chứ?</p>
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