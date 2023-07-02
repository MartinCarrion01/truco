import { Box } from "@chakra-ui/react";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function FormContainer(props: Props) {
  return (
    <Box
      w="2xl"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="white"
      my="2"
    >
      {props.children}
    </Box>
  );
}
