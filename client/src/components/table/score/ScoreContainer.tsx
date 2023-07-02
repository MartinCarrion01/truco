import { useMemo } from "react";
import { useCurrentTable } from "../../../store/tableStore";
import SidebarContainer from "../SidebarContainer";
import PlayerScore from "./PlayerScore";

export default function ScoreContainer() {
  const table = useCurrentTable();

  return (
    <SidebarContainer>
      {table?.status === "waiting_players" ? (
        <></>
      ) : (
        <>
          <PlayerScore kind_team="diagonal" />
          <PlayerScore kind_team="anti_diagonal" />
        </>
      )}
    </SidebarContainer>
  );
}
