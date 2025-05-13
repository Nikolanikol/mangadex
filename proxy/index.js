const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.get("/api", async (req, res) => {
  res.status(200).json({ message: "ok" });
});
app.get("/api/cover", async (req, res) => {
  try {
    // Прокси-запрос к API
    const { id } = req.query;
    console.log("id - ", id);
    const response = await axios
      .get(`https://api.mangadex.org/cover/${id}`)
      .then((res) => res.data.data.attributes.fileName)
      .catch((e) => console.log(e.message));

    return res.status(200).json({ result: response });
  } catch (error) {
    res.status(500).json({ error: "Ошибка запроса к API" });
  }
});

app.listen(PORT, () => {
  console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
