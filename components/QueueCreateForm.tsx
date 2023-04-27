import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const CREATE_QUEUE = gql`
  mutation CreateQueue($input: CreateQueueInput!) {
    CreateQueue(input: $input) {
      id
      name
      created
    }
  }
`;

export default function QueueCreateForm(props: any) {
  const [createQueue, { loading, error }] = useMutation(CREATE_QUEUE);
  const [queueName, setQueueName] = useState("");

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await createQueue({
      variables: {
        input: {
          name: event.target.queueName.value.trim(),
        },
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    setQueueName("");

    props.onCreateSuccess({ id: res.data.CreateQueue.id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          id="queueName"
          name="queueName"
          placeholder="Name"
          isRequired={true}
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          disabled={loading}
        />
      </FormControl>

      <Button mt={4} isLoading={loading} type="submit">
        Create Queue
      </Button>
    </form>
  );
}
