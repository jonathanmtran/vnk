import { Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Queues(props: any) {
  const [queues, setQueues] = useState([])

  useEffect(() => {
    fetch('/api/queues')
      .then(response => response.json())
      .then(jsonObject => {
        setQueues(jsonObject.queues)
      })
  }, []);

  return (
    <>
      <Heading>Queues</Heading>
      <UnorderedList>
      {queues.map((q: any) =>
        <ListItem key={q.id}>
          <Link href={`/queue/${q.id}`}>{q.queue_name}</Link>
        </ListItem>
      )}
      </UnorderedList>
    </>
  );
}
