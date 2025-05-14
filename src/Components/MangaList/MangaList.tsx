import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination } from "antd";
import MangaCard from "../MangaCard/MangaCard";
import { useEffect, useState } from "react";
import { MangaItem } from "./Type";
import { useStores } from "../../Stores/RootStoreContext";
import { observer } from "mobx-react-lite";

const fetchData = async (
  offset = 1,
  tagQuery: string[],
  contentRating: string[]
) => {
  const res = await axios.get(
    `https://api.mangadex.dev/manga?limit=12&offset=${offset * 12}`,
    {
      params: {
        includedTags: tagQuery,
        contentRating: contentRating,
        order: {
          latestUploadedChapter: "desc",
        },
      },
    }
  );
  return res.data;
};
const MangaList = observer(() => {
  const { filterStore } = useStores();

  const [data, setData] = useState<MangaItem[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [curentPage, setCurentPage] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchData(curentPage, filterStore.tagFilter, filterStore.contentRating)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
        setLoading(false);
      })
      .catch((e) => setError(true));
    console.log(filterStore.tagFilter);
  }, [curentPage, filterStore.tagFilter, filterStore.contentRating]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка:</div>;

  return (
    <div>
      <div>
        <Pagination
          onChange={(e) => setCurentPage(e)}
          current={curentPage}
          defaultCurrent={curentPage}
          total={total ? total - 10 : 200}
          pageSize={10}
        />
      </div>
      <div className="grid-cols-3 gap-y-2 gapx-1 grid py-4">
        {data &&
          data.map((item, i) => {
            const coverId = item.relationships.find(
              (i) => i.type === "cover_art"
            ).id;

            return (
              <MangaCard key={i} item={item} id={item.id} coverId={coverId} />
            );
          })}
      </div>
    </div>
  );
});

export default MangaList;
