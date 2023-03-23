import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export default function QueueCreateForm(props: any) {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [queueName, setQueueName] = useState("");

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    setIsSubmiting(true);

    event.preventDefault();

    const payload = {
      name: event.target.queueName.value.trim(),
    };

    const endpoint = "/api/queues";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetch(endpoint, options).then((response) => {
      if (response.ok) {
        setQueueName("");

        setTimeout(() => {
          setIsSubmiting(false);
        }, 1 * 1000);

        props.onCreateSuccess();
      }
    });
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
          disabled={isSubmitting}
        />
      </FormControl>

      <Button mt={4} isLoading={isSubmitting} type="submit">
        Create Queue
      </Button>
    </form>
  );
}
