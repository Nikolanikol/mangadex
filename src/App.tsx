import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MangaList from "./Components/MangaList/MangaList";
import { Route, Routes } from "react-router";
import MangaPage from "./Pages/MangaPage";
import MainCatalog from "./Pages/MainCatalog";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainCatalog />} />
        <Route path="/manga/:id" element={<MangaPage />} />
      </Routes>
    </>
  );
}

export default App;
