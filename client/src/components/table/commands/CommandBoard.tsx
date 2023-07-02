import { Button } from "@chakra-ui/react";
import { useMemo } from "react";
import { dealCards, forfeit, showHand } from "../../../services/tableService";
import { useCurrentTable } from "../../../store/tableStore";
import { useSessionUser } from "../../../store/userStore";

export default function CommandBoard() {
  const table = useCurrentTable();
  const user = useSessionUser();

  const handleDealCards = async () => {
    if (table) {
      await dealCards(table.table_number);
    }
  };

  const handleForfeit = async () => {
    if (table) {
      await forfeit(table.table_number);
    }
  };

  const handleShowHand = async () => {
    if (table) {
      await showHand(table.table_number);
    }
  };

  const canDeal = useMemo(() => {
    const joined_user = table?.joined_users.find(
      (joined_user) => joined_user.username === user?.username
    );
    return (
      joined_user?.position === table?.dealer &&
      ["waiting", "finished"].includes(table!.status)
    );
  }, [table, user?.username]);

  return (
    <>
      {table && user && canDeal ? (
        <Button colorScheme="green" onClick={handleDealCards}>
          Repartir
        </Button>
      ) : (
        <></>
      )}
      {table && table.status === "playing" ? (
        <>
          <Button colorScheme="green" onClick={handleForfeit}>
            Irse al mazo
          </Button>
          <Button colorScheme="green" onClick={handleShowHand}>
            Mostrar la mano
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
