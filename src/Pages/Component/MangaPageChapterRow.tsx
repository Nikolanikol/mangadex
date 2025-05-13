import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
interface MangaPageChapterRowProps {
  mangaId: string;
}

const fetchData = async (mangaId: string) => {
  const res = await axios
    .get(`https://api.mangadex.org/manga/${mangaId}/aggregate`)

    .then((res) => res.data.volumes);
  return res;
};
const MangaPageChapterRow: FC<MangaPageChapterRowProps> = ({ mangaId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => fetchData(mangaId),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  console.log(data);
  return (
    <div>
      <p>MangaPageChapterRow</p>
      {mangaId}
    </div>
  );
};

export default MangaPageChapterRow;
