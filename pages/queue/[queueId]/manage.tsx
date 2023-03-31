import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Queue from "../../../components/Queue";
import { config } from "../../../config";

interface QueueObject {
  id: string;
  name: string;
  queue: Array<any>;
}

export default function QueuePage() {
  const router = useRouter();
  const queueId = router.query.queueId as string;
  const [queue, setQueue] = useState({} as QueueObject);
  const [title, setTitle] = useState(config.title);

  useEffect(() => {
    if (typeof queueId === "undefined") {
      return;
    }

    fetch(`/api/queue/${queueId}`)
      .then((response) => response.json())
      .then((jsonObject) => setQueue(jsonObject));
  }, [queueId]);

  useEffect(() => {
    if (!queue) {
      return;
    }
    setTitle(`${queue.name} - Manage | ${config.title}`);
  }, [queue]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container maxW="container.md">
        <Queue id={queueId} />
      </Container>
    </>
  );
}
