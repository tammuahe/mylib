import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ placeHolder, onSearch }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
    };

    const handleSearch = () => {
        onSearch(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-1 gap-2 px-4 py-2 bg-(--black) rounded-xl">
            <input
                type="text"
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}   // ✅ ENTER
                className="flex-1 bg-transparent outline-none text-white"
            />

            <button onClick={handleSearch}>
                <Search className="w-5 h-5 opacity-50 cursor-pointer" />
            </button>
        </div>
    );
};

export default SearchBar;
