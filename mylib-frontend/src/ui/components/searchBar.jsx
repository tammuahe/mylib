import { Search, Filter, X } from "lucide-react"

const SearchBar = ({placeHolder}) => {
    return ( 
        <div className="flex flex-1 gap-2 px-4 py-2 bg-(--black) rounded-xl">
            <input
                type="text"
                placeholder={placeHolder}
                size={placeHolder.length - 10}
                className="flex-1"
            />
            <button>
                <Search className="w-5 h-5 opacity-50 cursor-pointer"/>
            </button>
        </div>
    );
}
 
export default SearchBar;