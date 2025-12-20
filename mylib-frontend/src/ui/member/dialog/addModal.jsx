import { useState } from "react";

const AddDialog = ({ toggleDialog, onAdded }) => {
    const [newMember, setNewMember] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        email: "",
        active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () =>{
        fetch('http://localhost:8080/member', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMember)
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
    }

    return (
        <>
            <div
                className="absolute inset-0 bg-black opacity-75"
            />

            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">
                            Thêm mới thành viên
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="self-start">Họ</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={newMember.lastName}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Tên</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={newMember.firstName}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={newMember.phone}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Thành phố</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={newMember.city}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
                            </div>

                            <div className="flex flex-col">
                                <label className="self-start">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={newMember.email}
                                        onChange={handleChange}
                                        className="px-3 py-2 rounded-lg bg-black text-white"
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-12">
                        <button 
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                            onClick={handleAdd}
                        >
                            Thêm
                        </button>

                        <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
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
