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
    <form
      className="bg-gray-200 p-10 rounded-lg shadow-md w-3/4 mb-2"
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  );
}
