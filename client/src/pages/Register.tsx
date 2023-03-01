import CenteredContainer from "../components/common/CenteredContainer";
import FormContainer from "../components/common/FormContainer";
import FormRedirectPrompt from "../components/common/FormRedirectPrompt";
import Header from "../components/common/Header";
import Subheader from "../components/common/Subheader";
import RegisterForm from "../components/register/RegisterForm";

export default function Register() {
  return (
    <CenteredContainer>
      <FormContainer>
        <Header text="Truco Online" />
        <Subheader text="Crear cuenta para jugar" />
        <RegisterForm />
        <FormRedirectPrompt
          auxiliaryText="¿Ya ténes cuenta?"
          linkText="Ingresá."
          redirectRoute="login"
        />
      </FormContainer>
    </CenteredContainer>
  );
}
