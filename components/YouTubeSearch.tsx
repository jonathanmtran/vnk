import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button, ButtonGroup, Card, CardBody, CardFooter, FormControl, FormLabel, IconButton,
  Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  SimpleGrid
} from '@chakra-ui/react';
import React from 'react';
import { YouTubeSearchResults } from "youtube-search";
import YouTubeThumbnail from './YouTubeThumbnail';

interface YouTubeSearchProps {
  onSetYouTubeVideo: any;
}

interface YouTubeSearchState {
  youTubeQuery: string;
  youTubeQueryResults: Array<YouTubeSearchResults>;
  isPreviewOpen: boolean;
  previewVideo: YouTubeSearchResults;
  previewId: string;
}

export default class YouTubeSearch extends React.Component <YouTubeSearchProps, YouTubeSearchState> {
  constructor(props: YouTubeSearchProps) {
    super(props)
    this.state = {
      youTubeQuery: '',
      youTubeQueryResults: new Array<YouTubeSearchResults>(),
      isPreviewOpen: false,
      previewVideo: {} as YouTubeSearchResults,
      previewId: '',
    }

    this.handleYtQueryChange = this.handleYtQueryChange.bind(this)
    this.handleYtSearch = this.handleYtSearch.bind(this)
  }

  handleYtQueryChange(event: any) {
    this.setState({
      youTubeQuery: event.target.value
    })
  }

  handleYtSearch(event: any) {
    event.preventDefault();

    if (this.state.youTubeQuery.trim() === '') {
      return;
    }

    this.setState({
      youTubeQuery: this.state.youTubeQuery.trim(),
    });

    fetch('/api/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: this.state.youTubeQuery }),
    })
      .then(response => response.json())
      .then(jsonResponse => {
        const searchResults = jsonResponse;
        this.setState({
          youTubeQueryResults: searchResults.results as Array<YouTubeSearchResults>,
        });
      });
  }

  handlePreview(video: YouTubeSearchResults) {
    const url = new URL(video.link)
    let v = url.searchParams.get('v');

    if (!v) {
      return
    }

    this.setState({
      previewVideo: video,
      previewId: v,
      isPreviewOpen: true
    })
  }

  render() {
    return (
      <>
        <FormControl mt={3}>
          <FormLabel>Tim Kiếm YouTube video</FormLabel>
          <Box display="flex" justifyContent="space-between">
            <Input type="text" name="ytQuery" value={this.state.youTubeQuery} onChange={this.handleYtQueryChange} />&nbsp;
            <IconButton aria-label='Search YouTube' icon={<SearchIcon />} onClick={this.handleYtSearch} />
          </Box>
        </FormControl>

        {this.state.youTubeQueryResults.length > 0 ?
        <SimpleGrid mt={3} columns={1} spacing={1}>
        {this.state.youTubeQueryResults.map((video: YouTubeSearchResults) =>
        <Card key={video.id}
          direction={{ base: 'column', sm: 'row'}}
        >
          <YouTubeThumbnail {...video.thumbnails} />
          <CardBody>
            {video.title}<br />
            <small>{video.channelTitle}</small>
          </CardBody>
          <CardFooter>
            <ButtonGroup size='sm' spacing='1'>
              <Button onClick={() => this.handlePreview(video)}>Nghe Trước</Button>
              <Button onClick={() => this.props.onSetYouTubeVideo(video)}>Select</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        )}
        </SimpleGrid>
        : null }

        <Modal isOpen={this.state.isPreviewOpen} onClose={() => this.setState({ isPreviewOpen: false })} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <iframe width="100%" height="315"
                src={`https://www.youtube-nocookie.com/embed/${this.state.previewId}`}
                title="YouTube video player" frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup size="sm" spacing="1">
                <Button onClick={() => this.props.onSetYouTubeVideo(this.state.previewVideo)}>Select</Button>
                <Button onClick={() => this.setState({ isPreviewOpen: false })}>Close</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
