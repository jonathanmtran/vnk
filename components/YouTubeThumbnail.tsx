import Image from "next/image";
import React from "react";
import { YouTubeSearchResultThumbnails } from "youtube-search";

export default class YouTubeThumbnail extends React.Component<YouTubeSearchResultThumbnails> {
  render() {
    if (!this.props.default) {
      return;
    }

    return (
      <Image
        src={this.props.default.url}
        height={this.props.default.height}
        width={this.props.default.width}
        alt="Thumbnail"
      />
    );
  }
}
