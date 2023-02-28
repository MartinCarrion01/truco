import { useState } from "react";

interface Props {
  avatar: File | null;
  setAvatar: (e: any) => void;
}

export default function UploadAvatarPrompt(props: Props) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="mb-5">
      <label className="relative rounded-full bg-gray-400 hover:bg-gray-300 py-2 px-4 cursor-pointer">
        <span className="text-gray-700">Seleccione una imagen de perfil</span>
        <input
          type="file"
          name="file"
          className="absolute inset-0 opacity-0 z-50"
          onChange={(e) => {
            props.setAvatar(e.target.files ? e.target.files[0] : null)
          }}
        />
      </label>
      {props.avatar && <p className="my-2 p-3 text-gray-700">Archivo seleccionado: {props.avatar.name}</p>}
    </div>
  );
}

