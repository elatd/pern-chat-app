import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

function Sidebar() {
    return (
        <div className={"h-full flex flex-col gap-2 p-4  border-r-2"}>
            <SearchInput/>
            <Conversations/>
        </div>
    );
}

export default Sidebar;