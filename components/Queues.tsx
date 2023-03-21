import {
  Box,
  Button,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Queues() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    fetch("/api/queues")
      .then((response) => response.json())
      .then((jsonObject) => {
        setQueues(jsonObject.queues);
      });
  }, []);

  return (
    <>
      <Heading>Queues</Heading>
      <Box textAlign="right">
        <Button>
          <Link href="/queue/create">Create Queue</Link>
        </Button>
      </Box>
      <UnorderedList>
        {queues.map((q: any) => (
          <ListItem key={q.id}>
            <Link href={`/queue/${q.id}`}>{q.queue_name}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}
