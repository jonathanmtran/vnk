import youtubeSearch, {
  YouTubeSearchOptions,
  YouTubeSearchResults,
} from "youtube-search";

export class YouTubeAPI {
  async search(query: string) {
    if (query.trim() === "") {
      return;
    }

    let querySuffix = "";
    if (query.indexOf("karaoke") === -1) {
      querySuffix = " karaoke";
    }

    let opts: YouTubeSearchOptions = {
      key: process.env.NEXT_YT_API_KEY,
      maxResults: 10,
    };

    let searchResults: YouTubeSearchResults[] = [];

    await youtubeSearch(query + querySuffix, opts).then((result) => {
      searchResults = result.results;
    });

    return searchResults;
  }
}
