interface Props {
  text: string;
}

export default function Header(props: Props) {
  return (
    <h1 className="m-4 p-5 text-6xl font-bold text-gray-800 text-center">
      {props.text}
    </h1>
  );
}
