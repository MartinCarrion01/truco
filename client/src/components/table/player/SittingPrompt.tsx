import { Button, Text } from "@chakra-ui/react";
import { sit } from "../../../services/tableService";
import { useCurrentTable } from "../../../store/tableStore";

interface Props{
    position: number,
}
export default function SittingPrompt(props: Props){
    const table = useCurrentTable();
    const handleSit = async () => {
        if(table){
            await sit(table.table_number, props.position)
        }
    }
    return(
        <>
            <Button onClick={handleSit}>Sentarse</Button>
        </>
    )
}