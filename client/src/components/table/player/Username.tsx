import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {
  username: string | undefined;
}

export default function Username(props: Props) {
  return (
    <Flex w="100%" h="100%" justifyContent="center">
      <Text fontSize="xl" as="i" alignContent={"center"} noOfLines={2}>
        {props.username}
      </Text>
    </Flex>
  );
}
