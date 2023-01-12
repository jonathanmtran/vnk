import type { NextApiRequest, NextApiResponse } from "next";
import youtubeSearch, {
  YouTubeSearchOptions,
  YouTubeSearchResults,
} from "youtube-search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { query } = req.body;

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

    let searchResults = {};

    await youtubeSearch(query + querySuffix, opts).then((result) => {
      searchResults = result;
    });

    return res.send(searchResults);

    return res.status(500).json({});
  }

  return res.status(501).json({});
}
