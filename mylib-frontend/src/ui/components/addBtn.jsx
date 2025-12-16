const AddBtn = ({showDialog, setShowDialog, placeHolder}) => {
    return (
        <button 
            className="flex items-center rounded-lg bg-[#7cd97f] px-3 py-1 text-black font-bold gap-6 cursor-pointer hover:bg-[#6bc86f] transition"
            onClick={() => setShowDialog(!showDialog)}
        >
            <span>{placeHolder}</span>
            <span className="text-2xl">+</span>
        </button>
    );
}
 
export default AddBtn;