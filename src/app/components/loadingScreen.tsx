import { Center, Spinner } from "@chakra-ui/react";

export default function LoadingScreen() {
  return (
    <Center alignItems="center" justifyContent="center" h={"90vh"}>
      <Spinner size={"lg"} />
    </Center>
  );
}
