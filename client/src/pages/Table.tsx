import { Button, Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommandBoard from "../components/table/commands/CommandBoard";
import GameTable from "../components/table/game_table/GameTable";
import PlayerContainer from "../components/table/player/PlayerContainer";
import PlayersContainer from "../components/table/player/PlayersContainer";
import WaitingPlayers from "../components/table/player/WaitingPlayers";
import ScoreContainer from "../components/table/score/ScoreContainer";
import SidebarContainer from "../components/table/SidebarContainer";
import useActionCable from "../hooks/useActionCable";
import useChannel from "../hooks/useConsumer";
import {
  closeTable,
  leaveTable,
  Table as TableType,
} from "../services/tableService";
import { setUser } from "../services/userService";
import { setCurrentTable, useCurrentTable } from "../store/tableStore";
import { useSessionUser } from "../store/userStore";
import { environment } from "../utils/environment";

type Message = {
  type: string;
  message?: string;
  table: TableType;
};

export default function Table() {
  const table = useCurrentTable();
  const user = useSessionUser();
  const toast = useToast();
  const { actionCable } = useActionCable(environment.ws_url);
  const { subscribe, unsubscribe } = useChannel<Message>(actionCable);
  const navigate = useNavigate();

  useEffect(() => {
    if (table) {
      subscribe(
        { channel: "TableChannel", table_number: table.table_number },
        {
          received: (data) => {
            if (
              ["user_join", "forfeit", "show_hand", "user_left"].includes(
                data.type
              )
            ) {
              toast({ title: data.message, duration: 3000, isClosable: true });
            }
            if (data.type === "table_closed") {
              setCurrentTable(data.table);
              navigate("/");
              setUser().then();
            } else {
              setCurrentTable(data.table);
            }
          },
        }
      );
    }
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe, table, toast, navigate]);

  const isAdmin = () => {
    const admin_player = table?.joined_users.find(
      (user) => user.role === "admin"
    );
    return admin_player!.username === user?.username;
  };

  const handleLeaveTable = async () => {
    try {
      await leaveTable(table!.table_number);
      navigate("/");
      await setUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseTable = async () => {
    try {
      await closeTable(table!.table_number);
      navigate("/");
      await setUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {table ? (
        <Flex justifyContent={"center"} alignItems="center" flexDir="column">
          {table.game_type === "doubles" ? (
            <PlayersContainer positions={[1, 2]} />
          ) : (
            <PlayerContainer position={1} />
          )}
          <Grid
            templateColumns="1fr 4fr 1fr"
            templateRows="1fr"
            columnGap="22px"
          >
            <GridItem gridArea="1 / 1 / 2 / 2">
              <ScoreContainer />
            </GridItem>
            <GridItem gridArea="1 / 2 / 2 / 3">
              <GameTable />
            </GridItem>
            <GridItem gridArea="1 / 3 / 2 / 4">
              <SidebarContainer>
                {table.joined_users.some((user) => user.position === 0) ? (
                  <WaitingPlayers />
                ) : (
                  <CommandBoard />
                )}
                <Button colorScheme="green" onClick={handleLeaveTable}>
                  Abandonar mesa
                </Button>
                {user && isAdmin() ? (
                  <Button colorScheme="green" onClick={handleCloseTable}>
                    Cerrar mesa
                  </Button>
                ) : (
                  <></>
                )}
              </SidebarContainer>
            </GridItem>
          </Grid>
          {table.game_type === "doubles" ? (
            <PlayersContainer positions={[3, 4]} />
          ) : (
            <PlayerContainer position={2} />
          )}
        </Flex>
      ) : (
        "Cargando"
      )}
    </>
  );
}
