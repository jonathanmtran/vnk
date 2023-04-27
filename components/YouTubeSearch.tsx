import { gql, useLazyQuery } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { YouTubeSearchResults } from "youtube-search";
import YouTubeThumbnail from "./YouTubeThumbnail";

const QUERY_YT_QUERY = gql`
  query YouTubeVideos($query: String!) {
    youTubeVideos(query: $query) {
      id
      title
      link
      thumbnails {
        default {
          url
          height
          width
        }
      }
    }
  }
`;

export default function YouTubeSearch(props: any) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState(
    new Array<YouTubeSearchResults>()
  );
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState({} as YouTubeSearchResults);
  const [previewId, setPreviewId] = useState("");
  const [searchYt] = useLazyQuery(QUERY_YT_QUERY);

  const handlePreview = (video: YouTubeSearchResults) => {
    const url = new URL(video.link);
    let v = url.searchParams.get("v");

    if (!v) {
      return;
    }

    setPreviewVideo(video);
    setPreviewId(v);
    setPreviewOpen(true);
  };

  const handleYtSearch = (event: any) => {
    event.preventDefault();

    if (query.trim() === "") {
      return;
    }

    setQuery(query.trim());

    searchYt({
      variables: {
        query,
      },
    }).then((res) => {
      const results = res.data.youTubeVideos as Array<YouTubeSearchResults>;
      setQueryResults(results);
    });
  };

  return (
    <>
      <FormControl mt={3}>
        <FormLabel>Tim Kiếm YouTube video</FormLabel>
        <Box display="flex" justifyContent="space-between">
          <Input
            type="text"
            name="ytQuery"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          &nbsp;
          <IconButton
            aria-label="Search YouTube"
            icon={<SearchIcon />}
            onClick={handleYtSearch}
          />
        </Box>
      </FormControl>

      {queryResults.length > 0 ? (
        <SimpleGrid mt={3} columns={1} spacing={1}>
          {queryResults.map((video: YouTubeSearchResults) => (
            <Card key={video.id} direction={{ base: "column", sm: "row" }}>
              <YouTubeThumbnail {...video.thumbnails} />
              <CardBody>
                {video.title}
                <br />
                <small>{video.channelTitle}</small>
              </CardBody>
              <CardFooter>
                <ButtonGroup size="sm" spacing="1">
                  <Button onClick={() => handlePreview(video)}>
                    Nghe Trước
                  </Button>
                  <Button onClick={() => props.onSetYouTubeVideo(video)}>
                    Select
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      ) : null}

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${previewId}`}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm" spacing="1">
              <Button onClick={() => props.onSetYouTubeVideo(previewVideo)}>
                Select
              </Button>
              <Button onClick={() => setPreviewOpen(false)}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
