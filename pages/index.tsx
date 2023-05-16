import { Container } from "@chakra-ui/react";
import Head from "next/head";
import Queues from "../components/Queues";
import { config } from "../config";

export default function Home() {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
      </Head>

      <main>
        <Container maxW="container.lg">
          <Queues />
        </Container>
      </main>
    </>
  );
}
