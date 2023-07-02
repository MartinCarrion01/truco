import { useCurrentTable } from "../../../store/tableStore";
import WaitingPlayer from "./WaitingPlayer";

export default function WaitingPlayers() {
  const table = useCurrentTable();

  return (
    <>
      {table ? (
        table.joined_users
          .filter((user) => user.position === 0)
          .map((user) => (
            <WaitingPlayer
              username={user.username}
              avatar_url={user.avatar_url}
              key={user.id}
            />
          ))
      ) : (
        <></>
      )}
    </>
  );
}
