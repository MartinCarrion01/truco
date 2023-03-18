import { Box, Text } from "@chakra-ui/react";

interface Props{
    username: string | undefined
}

export default function Username(props: Props){
    return(
        <Box w="200px" h="50px" border="2px" flexWrap={"wrap"}>
            <Text fontSize="xl" as="i" alignSelf={"center"} noOfLines={2}>{props.username}</Text>
        </Box>
    )
}