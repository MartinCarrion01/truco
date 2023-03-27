import { useMemo } from "react";
import { useCurrentTable } from "../../../store/tableStore";
import SidebarContainer from "../SidebarContainer";
import PlayerScore from "./PlayerScore";

export default function ScoreContainer() {
  const table = useCurrentTable();

  const sortedPlayersByPosition = useMemo(() => {
    return table?.joined_users.sort((a, b) => a.position - b.position);
  }, [table?.joined_users]);

  console.log(sortedPlayersByPosition);

  return (
    <SidebarContainer>
      {sortedPlayersByPosition!.map((user) => (
        <PlayerScore key={user.position} username={user.username} />
      ))}
    </SidebarContainer>
  );
}
