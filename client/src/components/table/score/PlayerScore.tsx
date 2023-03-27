import {
  AddIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { addPoint, removePoint } from "../../../services/tableService";
import { useCurrentTable } from "../../../store/tableStore";
import { useSessionUser } from "../../../store/userStore";
import ScoreDisplay from "./ScoreDisplay";

interface Props {
  username: string;
}

export default function PlayerScore(props: Props) {
  const table = useCurrentTable();
  const currentUser = useSessionUser();
  const [isLoading, setIsLoading] = useState(false);

  const addPointHandler = async () => {
    setIsLoading(true);
    try {
      await addPoint(table!.table_number, props.username);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removePointHandler = async () => {
    setIsLoading(true);
    try {
      await removePoint(table!.table_number, props.username);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = useMemo(() => {
    return table?.joined_users.find(user => user.is_admin)?.username === currentUser?.username
  }, [])

  return (
    <Flex w="100%" flexDir="column" alignItems="center" p="2" my="2">
      <HStack>
        <Text ml="2" size="sm">
          {props.username}
        </Text>
        <HStack>
          <IconButton
            variant="outline"
            size="xs"
            aria-label="Add point"
            icon={<AddIcon />}
            onClick={addPointHandler}
            hidden={!isAdmin}
            isDisabled={isLoading}
          />
          <IconButton
            variant="outline"
            size="xs"
            aria-label="Remove point"
            icon={<MinusIcon />}
            onClick={removePointHandler}
            hidden={!isAdmin}
            isDisabled={isLoading}
          />
        </HStack>
      </HStack>
      <ScoreDisplay
        score={
          table!.joined_users.find((user) => user.username === props.username)!
            .points
        }
      />
    </Flex>
  );
}
