import { useState, useEffect, useRef } from "react";

/**
 * Lấy thời điểm hiện tại cho input datetime-local
 * Format: yyyy-MM-ddTHH:mm (local time)
 */
const getNowForInput = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
};

const AddDialog = ({ toggleDialog }) => {
    const inputRef = useRef(null);

    // ===== STATE CHUẨN THEO BODY BE =====
    const [newBorrow, setNewBorrow] = useState({
        bookId: "",
        memberId: "",
        staffId: "",
        borrowAt: getNowForInput(),
        durationDay: 1
    });

    const [staffs, setStaffs] = useState([]);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    // ===== FETCH DATA =====
    useEffect(() => {
        fetch("http://localhost:8080/book")
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => console.error("Error fetching books:", err));

        fetch("http://localhost:8080/member")
            .then(res => res.json())
            .then(data => setMembers(data))
            .catch(err => console.error("Error fetching members:", err));

        fetch("http://localhost:8080/staff")
            .then(res => res.json())
            .then(data => setStaffs(data))
            .catch(err => console.error("Error fetching staffs:", err));
    }, []);

    // ===== HANDLE CHANGE =====
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBorrow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ===== SUBMIT =====
    const handleAdd = () => {
        const payload = {
            bookId: Number(newBorrow.bookId),
            memberId: Number(newBorrow.memberId),
            staffId: Number(newBorrow.staffId),
            borrowAt: `${newBorrow.borrowAt}:00.000`, // local datetime cho BE
            durationDay: Number(newBorrow.durationDay),
            status: "BORROWED"
        };

        fetch("http://localhost:8080/borrow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(() => toggleDialog(false));
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-75"
                onClick={() => toggleDialog(false)}
            />

            {/* Dialog */}
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-(--containerBlack) rounded-lg p-6 w-1/3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 self-center">
                            Thêm phiếu mượn
                        </h2>

                        <div className="flex flex-col gap-4">
                            {/* SÁCH */}
                            <select
                                name="bookId"
                                value={newBorrow.bookId}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn sách</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>

                            {/* NHÂN VIÊN */}
                            <select
                                name="staffId"
                                value={newBorrow.staffId}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn nhân viên</option>
                                {staffs.map(staff => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.lastName} {staff.firstName}
                                    </option>
                                ))}
                            </select>

                            {/* THÀNH VIÊN */}
                            <select
                                name="memberId"
                                value={newBorrow.memberId}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-lg bg-black text-white"
                            >
                                <option value="">Chọn thành viên</option>
                                {members.map(member => (
                                    <option key={member.id} value={member.id}>
                                        {member.lastName} {member.firstName}
                                    </option>
                                ))}
                            </select>

                            {/* NGÀY MƯỢN */}
                            <div
                                className="flex flex-col cursor-pointer"
                                onClick={() => inputRef.current?.showPicker()}
                            >
                                <label className="self-start">Ngày mượn</label>
                                <input
                                    ref={inputRef}
                                    type="datetime-local"
                                    name="borrowAt"
                                    value={newBorrow.borrowAt}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>

                            {/* SỐ NGÀY MƯỢN */}
                            <div className="flex flex-col">
                                <label className="self-start">Số ngày mượn</label>
                                <input
                                    type="number"
                                    min={1}
                                    name="durationDay"
                                    value={newBorrow.durationDay}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded-lg bg-black text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ACTION */}
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
