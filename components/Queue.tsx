import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Badge,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QueueEntry from "./QueueEntry";

type QueueProps = {
  id: string;
};

const QUEUE_QUERY = gql`
  query Queue($queueId: ID) {
    queue(id: $queueId) {
      id
      name
      created
      queue {
        id
        name
        songName
        youTubeUrl
        performed
        created
      }
    }
  }
`;

const UPDATE_QUEUE_ENTRY_MUTATION = gql`
  mutation UpdateQueueEntry($input: AddToQueueInput!) {
    UpdateQueueEntry(input: $input) {
      id
      performed
    }
  }
`;

const DELETE_QUEUE_ENTRY_MUTATION = gql`
  mutation DeleteQueueEntry($input: DeleteQueueEntryInput!) {
    DeleteQueueEntry(input: $input) {
      affectedRows
    }
  }
`;

export default function Queue(props: QueueProps) {
  const queueId = props.id;
  const [upcoming, setUpcoming] = useState([]);
  const [performed, setPerformed] = useState([]);
  const { data, refetch } = useQuery(QUEUE_QUERY, {
    variables: {
      queueId,
    },
  });
  const [updateQueueEntry] = useMutation(UPDATE_QUEUE_ENTRY_MUTATION);
  const [deleteQueueEntry] = useMutation(DELETE_QUEUE_ENTRY_MUTATION);

  useEffect(() => {
    if (!data || !data.queue) {
      return;
    }

    const upcoming = data.queue.queue.filter((item: any) => {
      return item.performed === null;
    });

    const performed = data.queue.queue.filter((item: any) => {
      return item.performed !== null;
    });

    setUpcoming(upcoming);
    setPerformed(performed);
  }, [data]);

  const handleRemove = async (id: string) => {
    await deleteQueueEntry({
      variables: {
        input: {
          queueId,
          id,
        },
      },
    });

    refetch();
  };

  const handlePerform = async (id: string) => {
    await updateQueueEntry({
      variables: {
        input: {
          queueId,
          id,
          performed: new Date(),
        },
      },
    });

    refetch();
  };

  return (
    <>
      <Heading as="h3">Queue</Heading>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>
            Upcoming <Badge>{upcoming.length}</Badge>
          </Tab>
          <Tab>Performed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {upcoming.length === 0 ? "The queue is empty" : null}
            {upcoming.map((item: any) => (
              <QueueEntry
                key={item.id}
                {...item}
                onPerform={handlePerform}
                onRemove={handleRemove}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {performed.map((item: any) => (
              <QueueEntry key={item.id} {...item} onPerform={handlePerform} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
