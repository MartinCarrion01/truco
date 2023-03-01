import { useState } from "react";
import CenteredContainer from "../components/common/CenteredContainer";
import FormContainer from "../components/common/FormContainer";
import FormRedirectPrompt from "../components/common/FormRedirectPrompt";
import Header from "../components/common/Header";
import Subheader from "../components/common/Subheader";
import RegisterForm from "../components/register/RegisterForm";
import RegisterSuccess from "../components/register/RegisterSuccess";

export default function Register() {
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  return (
    <CenteredContainer>
      <FormContainer>
        {registerSuccess ? (
          <RegisterSuccess />
        ) : (
          <RegisterFormElement setSuccess={setRegisterSuccess} />
        )}
      </FormContainer>
    </CenteredContainer>
  );
}

const RegisterFormElement = (props: any) => {
  return (
    <>
      <Header text="Truco Online" />
      <Subheader text="Crear cuenta para jugar" />
      <RegisterForm setSuccess={props.setSuccess} />
      <FormRedirectPrompt
        auxiliaryText="¿Ya ténes cuenta?"
        linkText="Ingresá."
        redirectRoute="login"
      />
    </>
  );
};
