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
  let res = {};
  for (let key of arr) {
    if (Array.isArray(key)) {
      const data = Object.values(key[1].chapters).find(
        (i) => i.chapter === number.toString()
      );
      if (data) {
        res = data;
      }
    }
  }
  return res;
};
const fetchData = async (mangaId: string) => {
  const res = await axios
    .get(`https://api.mangadex.org/manga/${mangaId}/aggregate`)

    .then((res) => res.data.volumes);
  return res;
};
//////////////////////
const MangaPageChapterRow: FC<MangaPageChapterRowProps> = ({ mangaId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => fetchData(mangaId),
  });
  const [chapter, setChapter] = useState<number | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<number>();
  ////////////////////////
  const [slideData, setSlideData] = useState<ISlideData | null>();
  useEffect(() => {
    if (chapter) {
      const current = getChapterId(newData, chapter);

      setCurrentChapterId(current.id);
      //   console.log(currentChapterId);
      axios
        .get(`https://api.mangadex.org/at-home/server/${current.id}`)
        .then((res) => setSlideData(res.data));
    }
  }, [chapter]);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  const newData = Object.entries(data);

  const arr = Object.entries(newData[newData.length - 1][1].chapters);

  const getLastNumber = () => {
    if (isNaN(Number(arr[arr.length - 1][0]))) return arr[arr.length - 2][0];

    return arr[arr.length - 1][0];
  };
  const lastChapter = getLastNumber(data);

  ///////////////////////
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
      <div>
        {slideData &&
          slideData.chapter.data.map((item) => (
            <div>
              <img
                src={
                  slideData.baseUrl +
                  "/data/" +
                  slideData.chapter.hash +
                  "/" +
                  item
                }
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MangaPageChapterRow;

interface ISlideData {
  baseUrl: string;
  chapter: IChapter;
}
interface IChapter {
  data: string[];
  hash: string;
}
