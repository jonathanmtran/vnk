import { Container, Heading, useToast } from "@chakra-ui/react";
import Head from "next/head";
import QueueCreateForm from "../../components/QueueCreateForm";

export default function QueueCreate() {
  const toast = useToast();

  function handleCreateSuccess() {
    toast({
      title: "Success",
      description: "The queue has been created.",
      status: "success",
      duration: 7 * 1000,
      isClosable: true,
    });
  }

  return (
    <>
      <Head>
        <title>Create Queue</title>
      </Head>

      <main>
        <Container maxW="container.lg">
          <Heading>Create Queue</Heading>
          <QueueCreateForm onCreateSuccess={handleCreateSuccess} />
        </Container>
      </main>
    </>
  );
}
