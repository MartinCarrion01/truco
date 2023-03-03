import { Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  name: string;
  route: string;
}

export default function NavLink(props: Props) {
  return (
    <Link
      p="2"
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: 'green'
      }}
      as={ReactRouterLink}
      to={props.route}
      fontSize={"lg"}
      color='white'
    >
      {props.name}
    </Link>
  );
}
