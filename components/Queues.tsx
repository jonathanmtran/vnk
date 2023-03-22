import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, List, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import QueueI from "./QueueI";

export default function Queues() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    fetch("/api/queues")
      .then((response) => response.json())
      .then((jsonObject) => {
        setQueues(jsonObject.queues);
      });
  }, []);

  const handleDelete = async (queueId: String) => {
    let affectedRows = 0;

    await fetch("/api/queues", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queueId: queueId,
      }),
    }).then(async (response) => {
      const responseJson = await response.json();

      if (!response.ok) {
        console.debug(responseJson);
      }

      affectedRows = responseJson.affectedRows;
    });

    return affectedRows;
  };

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading>Queues</Heading>
        </Box>
        <Spacer />
        <Button leftIcon={<AddIcon />} size="sm">
          <Link href="/queue/create">Create Queue</Link>
        </Button>
      </Flex>
      <List spacing={5}>
        {queues.map((q: any) => (
          <QueueI key={q.id} queue={q} onDelete={handleDelete} />
        ))}
      </List>
    </>
  );
}
