interface Props {
    text: string;
  }
  
  export default function Subheader(props: Props) {
    return (
      <h1 className="m-3 p-3 text-3xl font-bold text-gray-800 text-center">
        {props.text}
      </h1>
    );
  }
  