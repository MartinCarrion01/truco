interface Props{
    placeholder: string,
    value: string,
    setValue: (e: any) => void,
    password?: boolean
}
export default function InputText(props: Props) {
  return (
    <div className="mb-5">
      <input
        className="p-3 w-full text-lg text-gray-900 font-semibold bg-gray-100 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type={props.password ? "password" : "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
      />
    </div>
  );
}
