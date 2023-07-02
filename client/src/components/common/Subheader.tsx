import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

export default function Subheader(props: Props) {
  return (
    <Heading size="xl" m="2" p="3" textAlign="center">
      {props.text}
    </Heading>
  );
}
