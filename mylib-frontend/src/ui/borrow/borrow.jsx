import { useState, useEffect } from "react";

import SearchBar from "../components/searchBar";
import AddBtn from  '../components/addBtn';

import AddDialog from "./dialog/addModal";
import EditDialog from "./dialog/editDialog";


const BorrowMang = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    return ( 
        <div className="h-full flex-1 flex-col center-flex bg-(--containerBlack) rounded-lg text-white stroke">
            <div className="w-full p-7 flex gap-5">
                <AddBtn showDialog={showAddDialog} setShowDialog={setShowAddDialog} />
                <SearchBar placeHolder="Tìm kiếm sách (Tiêu đề, Tác giả,...)"/>
            </div>
            <div className="w-full px-7 pb-7">
                
            </div>
            {showAddDialog && (
                <AddDialog toggleDialog= {setShowAddDialog}/>
            )}
            {showEditDialog && (
                <EditDialog toggleDialog={setShowEditDialog}/>
            )}
        </div>
    );
}
 
export default BorrowMang;