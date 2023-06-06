import { gql, useLazyQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaQrcode } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import RegistrationComponent from '../../../components/Registration';
import { config } from '../../../config';

const QUEUE_QUERY = gql`
  query Queue($queueId: ID) {
    queue(id: $queueId) {
      id
      name
      created
    }
  }
`;

export default function QueueIndex() {
  const { user } = useUser();
  const router = useRouter();
  const toast = useToast();
  const queueId = router.query.queueId as string;
  const [title, setTitle] = useState(config.title);
  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);
  const [getQueue, { called, loading, data }] = useLazyQuery(QUEUE_QUERY);

  function handleRegisterSuccess() {
    toast({
      title: 'Success',
      description: 'You have been added to the queue.',
      status: 'success',
      duration: 7 * 1000,
      isClosable: true,
    });
  }

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
      setTitle((t) => res.data.queue.name + ' | ' + t);
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
          <Flex minWidth="max-content" alignItems="center">
            <Box>
              <Heading>{data.queue.name}</Heading>
            </Box>
            <Spacer />
            <ButtonGroup>
              {user ? (
                <Button
                  as={Link}
                  leftIcon={<EditIcon />}
                  href={`/queue/${data.queue.id}/manage`}
                  size="sm"
                >
                  Manage
                </Button>
              ) : null}
              <Button
                leftIcon={<Icon as={FaQrcode} />}
                onClick={() => setQRCodeModalOpen(true)}
                size="sm"
              >
                Show QR Code
              </Button>
            </ButtonGroup>
          </Flex>

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
                  {typeof window !== 'undefined' ? (
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
      </main>
    </>
  );
}
