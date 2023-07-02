import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { playCard } from "../../../services/tableService";
import { useCurrentTable } from "../../../store/tableStore";
import Card from "./Card";

interface Props {
  card_name: string;
}
export default function PlayableCard(props: Props) {
  const table = useCurrentTable();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const playCardHandler = async () => {
    setIsLoading(true);
    try {
      await playCard(table!.table_number, props.card_name);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <button onClick={playCardHandler} disabled={isLoading || table?.status !== "playing"}>
      <Card card_name={props.card_name}/>
    </button>
  );
}
