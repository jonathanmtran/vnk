import {
  Button,
  Container,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import QueueCreateForm from "../../components/QueueCreateForm";
import { config } from "../../config";

interface handleCreateSuccessParams {
  id: string;
}

export default function QueueCreate() {
  const toast = useToast();
  const [queueId, setQueueId] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);

  function handleCreateSuccess(callback: handleCreateSuccessParams) {
    setQueueId(callback.id);

    toast({
      title: "Success",
      description: "The queue has been created.",
      status: "success",
      duration: 7 * 1000,
      isClosable: true,
    });

    setModalOpen(true);
  }

  return (
    <>
      <Head>
        <title>Create Queue | {config.title}</title>
      </Head>

      <main>
        <Container maxW="container.lg">
          <Heading>Create Queue</Heading>
          <QueueCreateForm onCreateSuccess={handleCreateSuccess} />
        </Container>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Queue Created</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Link href={`/queue/${queueId}`}>
              <Button colorScheme="blue" mr={3}>
                Go to Queue
              </Button>
            </Link>

            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
