import { VStack } from "@chakra-ui/react";

interface Props {
  children?: JSX.Element | JSX.Element[];
  disableAutoComplete?: boolean;
  submitHandler: () => void;
}

export default function Form(props: Props) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.submitHandler();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="4" align="stretch">
        {props.children}
      </VStack>
    </form>
  );
}
