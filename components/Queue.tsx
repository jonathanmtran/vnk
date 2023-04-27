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

export default function Queue(props: QueueProps) {
  const queueId = props.id;
  const [queue, setQueue] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [performed, setPerformed] = useState([]);

  useEffect(() => {
    fetchData(queueId);
  }, [queueId]);

  const fetchData = (id: string) => {
    if (typeof id === "undefined") return;
    console.debug({ ctx: "fetchData" });
    fetch(`/api/queue/${id}`)
      .then((response) => response.json())
      .then((json) => {
        const upcoming = json.queue.filter((item: any) => {
          return item.performed === null;
        });

        const performed = json.queue.filter((item: any) => {
          return item.performed !== null;
        });

        setQueue(json.queue);
        setUpcoming(upcoming);
        setPerformed(performed);
      });
  };

  const handleRemove = (id: string) => {
    fetch(`/api/queue/${queueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedQueue = queue.filter((item: any) => {
          return item.id !== json.id;
        });

        const updatedUpcomingQueue = upcoming.filter((item: any) => {
          return item.id !== json.id;
        });

        setQueue(updatedQueue);
        setUpcoming(updatedUpcomingQueue);
      });
  };

  const handlePerform = (id: string) => {
    fetch(`/api/queue/${queueId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.id !== queueId) {
          console.error({ queueId: queueId, id: jsonResponse.id });
        }

        fetchData(queueId);
      });
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
