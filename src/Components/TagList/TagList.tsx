import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import axios from "axios";
import React from "react";
interface IName {
  en: string;
}
interface IAttributes {
  name: IName;
}
interface ITag {
  id: string;
  attributes: IAttributes;
}
const fetchData = async (): Promise<ITag[]> => {
  const res = await axios
    .get("https://api.mangadex.org/manga/tag")
    .then((res) => res.data.data);
  return res;
};
const TagList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  console.log(data);
  return (
    <div className="border-2 border-amber-100 flex flex-col items-start px-2 py-4">
      {data?.map((item) => (
        <div key={item.id}>#{item.attributes.name.en}</div>
      ))}
    </div>
  );
};

export default TagList;
