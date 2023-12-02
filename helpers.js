import * as imgDownload from "image-downloader";
import fs from "fs";
import { API_URL } from "./constants";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export function fileDoesExist(path) {
  return fs.existsSync(path);
}

export async function createDir(path) {
  if (!fileDoesExist(path)) {
    fs.mkdirSync(path);
  }
}

export async function downloadImage(url, outputPath) {
  await imgDownload.image({ url, dest: outputPath, timeout: 1000 });
}

export async function getAllChapters(mangaId) {
  const queryParams = new URLSearchParams({
    id: mangaId,
  });

  const url = API_URL + "/manga/chapter/get-all?" + queryParams;
  const response = await fetch(url, options);

  const data = await response.json();
  return data.results.sort(
    (chapterA, chapterB) => chapterA.Number - chapterB.Number
  );
}

export async function getChapter(mangaName, chapterNumber, chapterId) {
  const url =
    API_URL +
    "/manga/chapter/get/" +
    mangaName +
    "/" +
    chapterNumber +
    "/" +
    chapterId;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
}
