import { Flex, Box } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function CenteredContainer(props: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="green.500"
      minH="100vh"
      flexWrap='wrap'
    >
      {props.children}
    </Flex>
  );
}
