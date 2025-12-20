

const Sidebar = ({ selectedFunc, onFuncChange }) => {

    const handleChangeFunc = (e) => {
        onFuncChange(e.target.name);
    }

    const baseBtn = "bold-style my-2 px-6 py-3 font-bold text-lg rounded-xl text-center cursor-pointer";

    return ( 
        <div className="bg-(--containerBlack) ml-2 py-5 px-3 border border-white/50 rounded-xl flex flex-col">
            <button className={`${baseBtn} ${selectedFunc === 'book' ? 'bg-[#34393e]' : ''}`} onClick={handleChangeFunc} name="book">Quản lý sách</button>
            <button className={`${baseBtn} ${selectedFunc === 'member' ? 'bg-[#34393e]' : ''}`} onClick={handleChangeFunc} name="member">Quản lý thành viên</button>
            <button className={`${baseBtn} ${selectedFunc === 'borrow' ? 'bg-[#34393e]' : ''}`} onClick={handleChangeFunc} name="borrow">Quản lý mượn sách</button>
            <button className={`${baseBtn} ${selectedFunc === 'statistical' ? 'bg-[#34393e]' : ''}`} onClick={handleChangeFunc} name="statistical">Thống kê</button>
        </div>
    );
}
 
export default Sidebar;