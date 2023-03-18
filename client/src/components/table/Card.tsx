import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { playCard } from "../../services/tableService";
import { useCurrentTable } from "../../store/tableStore";

interface Props {
  card_name: string;
}
export default function Card(props: Props) {
  const table = useCurrentTable();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const playCardHandler = async () => {
    setIsLoading(true);
    try {
      await playCard(table!.table_number, props.card_name)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Box h="90px" w="60px">
      <button onClick={playCardHandler} disabled={isLoading}>
        <Image
          src={
            props.card_name
              ? `/cartas/${props.card_name}.png`
              : "/cartas/r0.png"
          }
          fit="fill"
        />
      </button>
    </Box>
  );
}
