import { gql, useLazyQuery } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Queue from "../../../components/Queue";
import { config } from "../../../config";

const QUEUE_QUERY = gql`
  query Queue($queueId: ID) {
    queue(id: $queueId) {
      id
      name
      created
    }
  }
`;

export default function QueuePage() {
  const router = useRouter();
  const queueId = router.query.queueId as string;
  const [title, setTitle] = useState(config.title);
  const [getQueue, { called, loading }] = useLazyQuery(QUEUE_QUERY);

  if (called && loading) {
    return;
  }

  if (!called) {
    if (!queueId) {
      return;
    }

    getQueue({
      variables: {
        queueId,
      },
    }).then((res) => {
      setTitle(`${res.data.queue.name} - Manage | ${config.title}`);
    });

    return;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Container maxW="container.lg">
          <Queue id={queueId} />
        </Container>
      </main>
    </>
  );
}
