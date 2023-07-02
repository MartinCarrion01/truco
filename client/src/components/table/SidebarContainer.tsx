import { Box, Flex, Stack } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function SidebarContainer(props: Props) {
  return (
    <Stack
      h="100%"
      w="200px"
      rounded="md"
      p="3"
      bg={"gray.100"}
      boxShadow="md"
    >
      {props.children}
    </Stack>
  );
}
