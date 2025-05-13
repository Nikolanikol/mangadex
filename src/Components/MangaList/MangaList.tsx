import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination } from "antd";
import MangaCard from "../MangaCard/MangaCard";
import { useEffect, useState } from "react";
import { MangaItem } from "./Type";

const fetchData = async (offset = 1) => {
  const res = await axios.get(
    `https://api.mangadex.org/manga?limit=12&offset=${offset * 12}`
  );
  return res.data;
};
const MangaList = () => {
  const [data, setData] = useState<MangaItem[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [curentPage, setCurentPage] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchData(curentPage)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
        setLoading(false);
      })
      .catch((e) => setError(true));
  }, [curentPage]);

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
};

export default MangaList;
