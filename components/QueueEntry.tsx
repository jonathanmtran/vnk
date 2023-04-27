import { LinkIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaMusic, FaUser } from "react-icons/fa";

export default class QueueEntry extends React.Component<any, any> {
  render() {
    return (
      <Card key={this.props.id} mt={3}>
        <CardBody>
          <>
            <Icon as={FaUser} /> {this.props.name}
            <br />
            <Icon as={FaMusic} /> {this.props.songName}
            <br />
            <LinkIcon />{" "}
            <a href={this.props.youtube_url}>{this.props.youTubeUrl}</a>
            <br />
            {this.props.performed}
          </>
        </CardBody>
        {this.props.performed === null ? (
          <>
            <CardFooter>
              <ButtonGroup spacing={1} size="sm">
                {this.props.performed === null ? (
                  <Button onClick={() => this.props.onPerform(this.props.id)}>
                    Mark as Performed
                  </Button>
                ) : null}
                {typeof this.props.onRemove !== "undefined" ? (
                  <Button onClick={() => this.props.onRemove(this.props.id)}>
                    Remove
                  </Button>
                ) : null}
              </ButtonGroup>
            </CardFooter>
          </>
        ) : null}
      </Card>
    );
  }
}
