import Sidebar from "./sidebar/sidebar";
import BookMang from "./book/book";
import MemberMang from "./member/member";
import BorrowMang from "./borrow/borrow";
import { useState } from "react";

const LibrarySystem = () => {
    const [selectedFunc, setSelectedFunc] = useState('book');
    return ( 
        <>
            <div className="w-full center-flex bg-(--containerBlack) py-5 border-b border-white/50 uppercase bold-style">
                quản lí thư viện
            </div>
            <div className="flex items-start p-10 gap-5">
                <Sidebar 
                selectedFunc={selectedFunc}
                onFuncChange={setSelectedFunc}
                />
                {selectedFunc === 'book' && <BookMang />}
                {selectedFunc === 'member' && <MemberMang />}
                {selectedFunc === 'borrow' && <BorrowMang />}
            </div>
        </>
    );
}
 
export default LibrarySystem;