interface Props {
  text: string;
}

export default function SubmitButton(props: Props) {
  return (
    <button className="w-full py-3 px-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">
      {props.text}
    </button>
  );
}
