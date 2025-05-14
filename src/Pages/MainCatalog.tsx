import React from "react";
import TagList from "../Components/TagList/TagList";
import MangaList from "../Components/MangaList/MangaList";

const MainCatalog = () => {
  return (
    <div className="grid grid-cols-10 max-w-[1200px] w-full">
      <div className=" col-span-2">
        <TagList />
      </div>

      <div className=" col-span-7 min-w-full">
        <MangaList />{" "}
      </div>
    </div>
  );
};

export default MainCatalog;
