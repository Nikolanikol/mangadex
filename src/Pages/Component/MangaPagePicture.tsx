import axios from "axios";
import React, { FC, useEffect, useState } from "react";
interface MangaPagePictureProps {
  coverId: string;
  id: string;
}
const MangaPagePicture: FC<MangaPagePictureProps> = ({ coverId, id }) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.mangadex.org/cover/${coverId}
`
      )
      .then((res) => setData(res.data.data.attributes.fileName));
  }, []);

  return (
    <div>
      <img
        src={`https://uploads.mangadex.org/covers/${id}/${data}.512.jpg`}
        alt=""
      />
    </div>
  );
};

export default MangaPagePicture;
