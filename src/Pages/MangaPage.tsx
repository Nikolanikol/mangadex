import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { MangaItem } from "../Components/MangaList/Type";
import MangaPagePicture from "./Component/MangaPagePicture";
import MangaPageChapterRow from "./Component/MangaPageChapterRow";

const fetchData = async (id: string): Promise<MangaItem> => {
  const data = axios
    .get(`https://api.mangadex.org/manga/${id}`)
    .then((res) => res.data.data);

  return data;
};

const MangaPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["manga", id],
    queryFn: () => fetchData(id),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  console.log(data);
  const coverId = data?.relationships.find((i) => i.type === "cover_art")
    ? data?.relationships.find((i) => i.type === "cover_art").id
    : "";
  return (
    <div>
      {/* <div>{id}</div> */}
      <h2>
        {data?.attributes.title.en} {data?.attributes.year}
      </h2>
      <h3>{data?.attributes.altTitles[0].ja}</h3>

      <div className="grid gap-4 grid-cols-2">
        <MangaPagePicture coverId={coverId} id={data?.id} />
        <div className="flex justify-center">
          <p className="max-w-[350px] ">
            {data?.attributes.description
              ? data?.attributes.description.en
              : data?.attributes.description.ja}
          </p>
        </div>
      </div>
      <div className=" pt-5">
        <MangaPageChapterRow mangaId={id} />
      </div>
    </div>
  );
};

export default MangaPage;
