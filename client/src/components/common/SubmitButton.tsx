import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  disabled?: boolean;
}

export default function SubmitButton(props: Props) {
  return (
    <Button type="submit" colorScheme="blue" mt={4} isDisabled={props.disabled ? props.disabled : false}>
      {props.text}
    </Button>
  );
}
