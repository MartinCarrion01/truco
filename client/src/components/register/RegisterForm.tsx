import { useState } from "react";
import { register, User } from "../../services/userService";
import AlertMessage from "../common/AlertMessage";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";

interface Props {
  setSuccess: (value: boolean) => void;
}

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const newUser: User = {
        username,
        password,
        password_confirmation: passwordConfirmation,
      };
      await register(newUser);
      setLoading(false);
      props.setSuccess(true);
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
      setLoading(false);
    }
  };

  return (
    <Form submitHandler={handleRegister}>
      {errorMessage ? (
        <AlertMessage status="error" description={errorMessage} />
      ) : (
        <></>
      )}
      <InputText
        value={username}
        setValue={setUsername}
        label="Nombre de usuario"
        name="username"
      />
      <InputText
        value={password}
        setValue={setPassword}
        password={true}
        label="Contraseña"
        name="password"
      />
      <InputText
        label={"Confirmar contraseña"}
        name="passwordConfirmation"
        value={passwordConfirmation}
        setValue={setPasswordConfirmation}
        password={true}
      />
      <SubmitButton
        text="Crear cuenta"
        disabled={
          [username, password, passwordConfirmation].includes("") || loading
        }
      />
    </Form>
  );
}
