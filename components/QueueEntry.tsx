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
import { GiMicrophone } from "react-icons/gi";

export default function QueueEntry(props: any) {
  const { id, name, songName, youTubeUrl, performed, onPerform, onRemove } =
    props;

  return (
    <>
      <Card key={id} mt={3}>
        <CardBody>
          <>
            <Icon as={FaUser} /> {name}
            <br />
            <Icon as={FaMusic} /> {songName}
            <br />
            <LinkIcon /> <a href={youTubeUrl}>{youTubeUrl}</a>
            {performed !== null ? (
              <>
                <br />
                <Icon as={GiMicrophone} /> {performed}
              </>
            ) : null}
          </>
        </CardBody>
        {performed === null ? (
          <CardFooter>
            <ButtonGroup spacing={1} size="sm">
              {performed === null ? (
                <Button onClick={() => onPerform(id)}>Mark as Performed</Button>
              ) : null}
              {typeof onRemove !== "undefined" ? (
                <Button onClick={() => onRemove(id)}>Remove</Button>
              ) : null}
            </ButtonGroup>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}
