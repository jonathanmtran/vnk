import { Container } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Queue from "../../../components/Queue"

export default function QueuePage() {
  const router = useRouter()
  const queueId = router.query.queueId as string

  return (
    <Container maxW='container.md'>
      <Queue id={queueId} />
    </Container>
  )
}
