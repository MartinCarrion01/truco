import { Box, Text } from "@chakra-ui/react";

export default function Username(){
    return(
        <Box w="200px" h="50px" border="2px" flexWrap={"wrap"}>
            <Text fontSize="xl" as="i" alignSelf={"center"} noOfLines={2}>LuzuStateOfMind</Text>
        </Box>
    )
}