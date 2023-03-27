import { Button } from "@chakra-ui/react";
import { dealCards, forfeit, showHand } from "../../services/tableService";
import { useCurrentTable } from "../../store/tableStore";
import SidebarContainer from "./SidebarContainer";

export default function CommandBoard(){
    const table = useCurrentTable();
    
    const handleDealCards = async () => {
        if(table){
            await dealCards(table.table_number)
        }
    }

    const handleForfeit = async () => {
        if(table){
            await forfeit(table.table_number)
        }
    }
    
    const handleShowHand = async () => {
        if(table){
            await showHand(table.table_number)
        }
    }
 
    return(
        <SidebarContainer>
            <Button onClick={handleDealCards}>Repartir</Button>
            <Button onClick={handleForfeit}>Irse al mazo</Button>
            <Button onClick={handleShowHand}>Mostrar la mano</Button>
        </SidebarContainer>
    )
}