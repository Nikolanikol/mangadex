import axios from "axios";
import { FC, useEffect, useState } from "react";
import { MangaItem } from "../MangaList/Type";
import { Button } from "antd";
import { Link } from "react-router";

interface MangaCardProps {
  item: MangaItem;
  id: string;
  coverId: string;
}
const MangaCard: FC<MangaCardProps> = ({ item, id, coverId }) => {
  useEffect(() => {
    axios
      .get(`https://api.mangadex.org/cover/${coverId}`)
      .then((res) => {
        setFileName(res.data.data.attributes.fileName);
      })
      .catch((e) => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка:</div>;
  console.log(item);
  const title = item.attributes.altTitles.find((i) => i.en)
    ? item.attributes.altTitles.find((i) => i.en).en
    : "not found";
  console.log(title);
  return (
    <div>
      <div className="min-h-[300px] flex items-center justify-center border-1 border-black">
        <img
          width={200}
          height={300}
          src={`https://uploads.mangadex.org/covers/${id}/${fileName}.512.jpg`}
          alt=""
        />
      </div>
      <p>{title}</p>
      <Button>
        {" "}
        <Link to={`/manga/${item.id}`}> на страницу</Link>
      </Button>
    </div>
  );
};

export default MangaCard;
