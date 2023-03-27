import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CommandBoard from "../components/table/CommandBoard";
import GameTable from "../components/table/GameTable";
import PlayerContainer from "../components/table/PlayerContainer";
import ScoreContainer from "../components/table/score/ScoreContainer";
import WaitingPlayers from "../components/table/WaitingPlayers";
import useActionCable from "../hooks/useActionCable";
import useChannel from "../hooks/useConsumer";
import { Table as TableType } from "../services/tableService";
import { setCurrentTable, useCurrentTable } from "../store/tableStore";
import { environment } from "../utils/environment";

type Message = {
  type: string;
  message?: string;
  table: TableType;
};

export default function Table() {
  const table = useCurrentTable();
  const { actionCable } = useActionCable(environment.ws_url);
  const { subscribe, unsubscribe } = useChannel<Message>(actionCable);

  useEffect(() => {
    if (table) {
      subscribe(
        { channel: "TableChannel", table_number: table.table_number },
        {
          received: (data) => {
            console.log(data, "data");
            setCurrentTable(data.table);
          },
        }
      );
    }
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe, table]);

  return (
    <>
      {table ? (
        <Flex justifyContent={"center"} alignItems="center" flexDir="column">
          <PlayerContainer position={1} />
          <Grid
            templateColumns="1fr 4fr 1fr"
            templateRows="1fr"
            columnGap="22px"
          >
            <GridItem gridArea="1 / 1 / 2 / 2">
              <ScoreContainer/>
            </GridItem>
            <GridItem gridArea="1 / 2 / 2 / 3">
              <GameTable />
            </GridItem>
            <GridItem gridArea="1 / 3 / 2 / 4">
              {table.joined_users.some((user) => user.position === 0) ? (
                <WaitingPlayers />
              ) : (
                <CommandBoard />
              )}
            </GridItem>
          </Grid>
          <PlayerContainer position={2} />
        </Flex>
      ) : (
        "Cargando"
      )}
    </>
  );
}
