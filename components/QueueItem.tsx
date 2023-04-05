import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Fade,
  Flex,
  Link,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";

export default function QueueItem(props: any) {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = async () => {
    setIsSubmiting(true);

    const response = await props.onDelete(props.queue.id);

    setTimeout(() => {
      setIsSubmiting(false);
      if (response === 1) {
        setIsVisible(false);
      }
    }, 0.5 * 1000);
  };

  return (
    <>
      <Fade in={isVisible}>
        <ListItem
          key={props.queue.id}
          padding={3}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Flex alignItems="center">
            <Box>
              <Center>
                <Link href={`/queue/${props.queue.id}`}>
                  {props.queue.queue_name}
                </Link>
              </Center>
            </Box>
            <Spacer />
            <ButtonGroup>
              <Button
                as={Link}
                href={`/queue/${props.queue.id}/manage`}
                leftIcon={<EditIcon />}
                size="sm"
              >
                Manage
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                isLoading={isSubmitting}
                onClick={handleDelete}
                colorScheme="red"
              >
                Delete
              </Button>
            </ButtonGroup>
          </Flex>
        </ListItem>
      </Fade>
    </>
  );
}
