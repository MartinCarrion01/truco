import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

export default function Header(props: Props) {
  return (
    <Heading size='3xl' m='4' p='5' textAlign={"center"}>
      {props.text}
    </Heading>
  );
}
