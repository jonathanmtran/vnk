import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import QRCode from "react-qr-code";
import RegistrationComponent from "../../../components/Registration";
import { config } from "../../../config";

interface QueueObject {
  id: string;
  name: string;
  queue: Array<any>;
}

export default function QueueIndex() {
  const router = useRouter();
  const toast = useToast();
  const queueId = router.query.queueId as string;
  const [title, setTitle] = useState(config.title);
  const [queue, setQueue] = useState({});
  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);

  useEffect(() => {
    if (typeof queueId === "undefined") return;

    fetch(`/api/queue/${queueId}`)
      .then((response) => response.json())
      .then((jsonObject) => setQueue(jsonObject));
  }, [queueId]);

  useEffect(() => {
    const q = queue as QueueObject;

    if (q.name) {
      setTitle((t) => q.name + " | " + t);
    }
  }, [queue]);

  function handleRegisterSuccess() {
    toast({
      title: "Success",
      description: "You have been added to the queue.",
      status: "success",
      duration: 7 * 1000,
      isClosable: true,
    });
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container maxW="container.md">
        <Heading mt={3}>{(queue as QueueObject).name}</Heading>
        <Button
          leftIcon={<Icon as={FaQrcode} />}
          onClick={() => setQRCodeModalOpen(true)}
          width="full"
        >
          Show QR Code
        </Button>

        <Heading as="h3" mt={3}>
          Đăng Ký
        </Heading>
        <RegistrationComponent
          queueId={queueId}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </Container>

      <Modal
        isOpen={isQRCodeModalOpen}
        onClose={() => setQRCodeModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Center>
                {typeof window !== "undefined" ? (
                  <QRCode value={window.location.href} />
                ) : null}
              </Center>
            </>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setQRCodeModalOpen(false)}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
