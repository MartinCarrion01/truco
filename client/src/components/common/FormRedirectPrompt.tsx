import { Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  auxiliaryText: string;
  linkText: string;
  redirectRoute: string;
}

export default function FormRedirectPrompt(props: Props) {
  return (
    <Text fontSize="md" color="gray.500" mt="2">
      {props.auxiliaryText + " "}
      <Link
        color="teal.500"
        as={ReactRouterLink}
        to={`/${props.redirectRoute}`}
      >
        {props.linkText}
      </Link>
    </Text>
  );
}
