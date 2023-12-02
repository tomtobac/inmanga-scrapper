### inmanga-scrapper

A simple scrapper for inmanga.com using [inmanga-scrapperapi](https://github.com/nicoestc/inmanga-scrapperapi). It allows you to download manga chapters from inmanga.com and store them into `/mangas` folder. It won't download chapters that are already downloaded.

Due the insusuability of the website in mobile browser I decided to create this script to download chapters and read them in my phone.

### Requirements

- [NodeJS](https://nodejs.org/en/)
- [deno](https://deno.land/)
- [inmanga-scrapperapi](https://github.com/nicoestc/inmanga-scrapperapi)

### Usage

1. Run the API server (Server should be running on localhost:3000)

```bash
##
$ deno run --allow-net --allow-read app.ts
```

1. Install app dependencies.
2. Update variables in `constants.js` such as `mangaId` and `chapterId`.
3. Run the app

```bash
$ npm install
$ npm start
```
