import { Box } from "@chakra-ui/react";

interface Props {
    children: JSX.Element | JSX.Element[];
  }

export default function SidebarContainer(props: Props) {
  return <Box h="100%" w="200px" border="4px" rounded="md" p="3">
    {props.children}
  </Box>;
}
