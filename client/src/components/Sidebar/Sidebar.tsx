import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

function Sidebar() {
  return (
    <div className={"h-full flex flex-col gap-2 my-2 md:my-0 md:p-4 "}>
      <SearchInput />
      <Conversations />
    </div>
  );
}

export default Sidebar;
