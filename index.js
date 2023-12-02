import task from "tasuku";
import {
  downloadImage,
  getAllChapters,
  getChapter,
  createDir,
  fileDoesExist,
} from "./helpers.js";
import { MANGA_ID, MANAGA_NAME } from "./constants.js";

task("Downloading manga", async ({ setTitle, task }) => {
  const currentDirectory = process.cwd();
  const mangaPath = `${currentDirectory}/mangas/${MANAGA_NAME}`;
  createDir(mangaPath);
  setTitle(`Downloading ${MANAGA_NAME}...`);
  const chapters = await getAllChapters(MANGA_ID);
  setTitle(`Downloading ${MANAGA_NAME}: 0/${chapters.length} chapters`);
  // check for the last chapter downloaded
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const subtask = await task(
      "Downloading chapter " + chapter.Number,
      async ({ setTitle: setSubtaskTitle, setWarning }) => {
        const mangaFriendlyChapterNumber = chapter.FriendlyChapterNumber;
        const chapterNumber = chapter.Number;
        const chapterId = chapter.Identification;
        const chapterPath = `${mangaPath}/${mangaFriendlyChapterNumber}`;
        createDir(chapterPath);
        setSubtaskTitle(`Downloading chapter ${chapterNumber}...`);
        const pages = await getChapter(MANAGA_NAME, chapterNumber, chapterId);
        for (const page of pages) {
          const pagePathUrl = `${chapterPath}/${page.PageNum}.jpg`;
          if (fileDoesExist(pagePathUrl)) {
            setSubtaskTitle(
              `Downloading chapter ${chapterNumber}: Page ${page.PageNum} already exists, skipping...`
            );
            continue;
          }
          // add a random delay between 0.5 and 1 seconds
          const delay = Math.floor(Math.random() * 1000) + 500;
          await new Promise((resolve) => setTimeout(resolve, delay));
          const pageUrl = page.ChapterURL;
          const pageNumber = page.PageNum;
          try {
            await downloadImage(pageUrl, pagePathUrl);
          } catch (e) {
            setWarning(
              `Error downloading page ${pageNumber}/${
                pages.length
              } of chapter ${i + 1}: ${e}, retrying...`
            );
          }
          setSubtaskTitle(
            `Downloading chapter ${chapterNumber}: Downloaded page ${pageNumber}`
          );
        }
      }
    );
    setTitle(
      `Downloading ${MANAGA_NAME}: ${i + 1}/${chapters.length} chapters`
    );
    subtask.clear();
  }
});
