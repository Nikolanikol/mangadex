import React from "react";
import { useStores } from "../../Stores/RootStoreContext";

const contentRating = [
  {
    id: 1,
    value: "safe",
  },
  {
    id: 2,
    value: "suggestive",
  },
  {
    id: 3,
    value: "erotica",
  },
  {
    id: 4,
    value: "pornographic",
  },
];

const Header = () => {
  const { filterStore } = useStores();
  return (
    <div className="max-w-[1200px] w-full h-[100px] bg-black rounded-3xl py-2 px-3 sticky top-0 z-10">
      <label htmlFor="mode">Переключить мод</label>
      <select
        name=""
        id="mode"
        onChange={(e) => filterStore.setContentRating(e.target.value)}
      >
        {contentRating.map((item) => (
          <option key={item.id} value={item.value}>
            {item.value}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
