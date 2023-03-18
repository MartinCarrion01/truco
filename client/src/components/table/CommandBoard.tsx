import { Button } from "@chakra-ui/react";
import { dealCards } from "../../services/tableService";
import { useCurrentTable } from "../../store/tableStore";
import SidebarContainer from "./SidebarContainer";

export default function CommandBoard(){
    const table = useCurrentTable();
    const handleDealCards = async () => {
        if(table){
            await dealCards(table.table_number)
        }
    }
    return(
        <SidebarContainer>
            <Button onClick={handleDealCards}>Repartir</Button>
        </SidebarContainer>
    )
}