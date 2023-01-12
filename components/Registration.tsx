import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { YouTubeSearchResults } from "youtube-search";
import YouTubeSearch from "./YouTubeSearch";
import YouTubeThumbnail from "./YouTubeThumbnail";

export default function RegistrationComponent(props: any) {
  const [name, setName] = useState("");
  const [songName, setSongName] = useState("");
  const [youTubeVideo, setYouTubeVideo] = useState<YouTubeSearchResults>(
    {} as YouTubeSearchResults
  );

  function handleNameChange(e: any) {
    setName(e.target.value);
  }

  function handleSongNameChange(e: any) {
    setSongName(e.target.value);
  }

  useEffect(() => {
    if (!youTubeVideo) {
      return;
    }

    if (Object.keys(youTubeVideo).length === 0) {
      return;
    }

    if (songName && songName.trim().length > 0) {
      return;
    }

    setSongName(youTubeVideo.title);
  }, [youTubeVideo]);

  function handleRegister(e: any) {
    e.preventDefault();

    if (!youTubeVideo) {
      return;
    }

    let body = {
      name: name.trim(),
      songName: songName.trim(),
      youTubeUrl: youTubeVideo.link,
    };

    fetch(`/api/queue/${props.queueId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((jsonObject) => {
        if (jsonObject[0].id) {
          setName("");
          setYouTubeVideo({} as YouTubeSearchResults);
          setSongName("");

          props.onRegisterSuccess();
        }
      });
  }

  function handleResetVideo() {
    setYouTubeVideo({} as YouTubeSearchResults);
    setSongName("");
  }

  return (
    <>
      <form onSubmit={handleRegister}>
        <FormControl>
          <FormLabel>Tên</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>

        {Search(youTubeVideo, setYouTubeVideo)}

        <FormControl mt={3}>
          <FormLabel>Tên Bài Hát</FormLabel>
          <Input
            type="text"
            name="songName"
            value={songName}
            onChange={handleSongNameChange}
          />
        </FormControl>

        {SelectedVideo(youTubeVideo, handleResetVideo)}

        <Button width="full" mt={3} onClick={handleRegister}>
          Đăng Ký
        </Button>
      </form>
    </>
  );
}

function Search(video: YouTubeSearchResults, onSetYouTubeVideo: Function) {
  if (Object.keys(video).length > 0) return;

  return <YouTubeSearch onSetYouTubeVideo={onSetYouTubeVideo} />;
}

function SelectedVideo(video: YouTubeSearchResults, onResetVideo: Function) {
  if (Object.keys(video).length === 0) {
    return;
  }

  return (
    <>
      <Card key={video.id} mt={3} direction={{ base: "column", sm: "row" }}>
        <YouTubeThumbnail {...video.thumbnails} />
        <CardBody>
          {video.title}
          <br />
          <small>{video.channelTitle}</small>
        </CardBody>
        <CardFooter>
          <Button onClick={() => onResetVideo()}>x</Button>
        </CardFooter>
      </Card>
    </>
  );
}
