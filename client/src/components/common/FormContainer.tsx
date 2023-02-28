interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function FormContainer(props: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 border-4 border-gray-600 rounded-md bg-white">
        {props.children}
      </div>
    </div>
  );
}
