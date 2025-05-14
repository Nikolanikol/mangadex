import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
interface MangaPageChapterRowProps {
  mangaId: string;
}
interface IChapter {
  chapter: string;
  count: number;
  is: string;
}
interface IVolume {
  count: number;
  volume: string;
  chapter: IChapter;
}
interface ChapterItem {
  0: string;
  1: IVolume;
}

const createChapterArr = (min: number, max: number): number[] => {
  const arr: number[] = [];

  for (let i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
};
const getChapterId = (arr: ChapterItem[], number: number) => {
  let res = [];
  for (let key of arr) {
    if (Array.isArray(key)) {
      console.log(key);
      const data = key[1].chapters;
      res.push(data);
    }
  }
  console.log("RES", res);
};
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
  const [chapter, setChapter] = useState<number | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<number>();
  useEffect(() => {
    if (chapter) {
      const current = getChapterId(newData, 1);
    }
  }, [chapter]);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  const newData = Object.entries(data);
  console.log(newData);
  const lastChapter = Object.entries(
    newData[newData.length - 1][1].chapters
  ).pop()[0];
  const chapterArr = createChapterArr(1, lastChapter);

  return (
    <div>
      <p>MangaPageChapterRow</p>
      <select onChange={(e) => setChapter(e.target.value)}>
        {chapterArr.map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MangaPageChapterRow;
