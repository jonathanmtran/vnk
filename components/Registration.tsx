import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { YouTubeSearchResults } from "youtube-search";
import YouTubeSearch from "./YouTubeSearch";
import YouTubeThumbnail from "./YouTubeThumbnail";

const ADD_TO_QUEUE = gql`
  mutation AddToQueue($input: AddToQueueInput!) {
    AddToQueue(input: $input) {
      id
      name
      songName
      youTubeUrl
      created
      performed
    }
  }
`;

export default function RegistrationComponent(props: any) {
  const [name, setName] = useState("");
  const [songName, setSongName] = useState("");
  const [youTubeVideo, setYouTubeVideo] = useState<YouTubeSearchResults>(
    {} as YouTubeSearchResults
  );
  const [addToQueue] = useMutation(ADD_TO_QUEUE);

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

    setSongName(youTubeVideo.title);
  }, [youTubeVideo]);

  async function handleRegister(e: any) {
    e.preventDefault();

    if (!youTubeVideo) {
      return;
    }

    await addToQueue({
      variables: {
        input: {
          queueId: props.queueId,
          name: name.trim(),
          songName: songName.trim(),
          youTubeUrl: youTubeVideo.link,
        },
      },
    }).then((res) => {
      if (res.errors) {
        console.error(res.errors);
        return;
      }

      setName("");
      setYouTubeVideo({} as YouTubeSearchResults);
      setSongName("");

      props.onRegisterSuccess();
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
