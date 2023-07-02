import { Button, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  name: string;
  modal?: JSX.Element;
  onOpen: () => void;
  hidden?: boolean
}

export default function NavLink(props: Props) {
  return (
    <>
      <Button
        p="2"
        rounded="md"
        _hover={{
          textDecoration: "none",
          bg: "green",
        }}
        fontSize="lg"
        color="white"
        bg="transparent"
        border="none"
        onClick={props.onOpen}
        hidden={props.hidden}
      >
        {props.name}
      </Button>
      {props.modal ? props.modal : <></>}
    </>
  );
}
