import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface Props {
    username: string,
    avatar_url: string,
}
export default function WaitingPlayer(props: Props) {
  return (
    <Flex border="2px" w="100%" h="70px" alignItems="center" p="2">
      <Avatar size="sm" name="avatar" src={props.avatar_url} />
      <Text ml="2" size="sm">{props.username}</Text>
    </Flex>
  );
}
