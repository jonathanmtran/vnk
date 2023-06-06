import { gql, useMutation, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, List, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import QueueItem from './QueueItem';

export default function Queues() {
  const GET_QUEUES = gql`
    query Queues {
      queues {
        id
        name
        created
      }
    }
  `;

  const DELETE_QUEUE = gql`
    mutation DeleteQueue($input: DeleteQueueInput!) {
      DeleteQueue(input: $input) {
        affectedRows
      }
    }
  `;

  const { user } = useUser();
  const { loading, data } = useQuery(GET_QUEUES);
  const [deleteQueue] = useMutation(DELETE_QUEUE);

  const handleDelete = async (queueId: String) => {
    const res = await deleteQueue({
      variables: {
        input: {
          id: queueId,
        },
      },
    });
    return res.data.DeleteQueue.affectedRows;
  };

  if (loading) return <>Loading ...</>;

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box>
          <Heading>Queues</Heading>
        </Box>
        <Spacer />
        {user ? (
          <Button leftIcon={<AddIcon />} size="sm">
            <Link href="/queue/create">Create Queue</Link>
          </Button>
        ) : null}
      </Flex>

      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          <List spacing={5}>
            {data?.queues.map((q: any) => (
              <QueueItem key={q.id} queue={q} onDelete={handleDelete} />
            ))}
          </List>
        </>
      )}
    </>
  );
}
