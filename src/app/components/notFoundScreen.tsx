import { Center, Heading, Stack, Text } from "@chakra-ui/react";

export default function NotFoundScreen() {
  return (
    <Center alignItems="center" justifyContent="center" h={"90vh"}>
      <Stack textAlign="center">
        <Heading as="h1" size="4xl">
          404
        </Heading>
        <Text fontSize="md">Page Not Found</Text>
      </Stack>
    </Center>
  );
}
