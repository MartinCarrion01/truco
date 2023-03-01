import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
}

export default function SubmitButton(props: Props) {
  return (
    <Button type="submit" colorScheme="blue" mt={4}>
      {props.text}
    </Button>
  );
}
