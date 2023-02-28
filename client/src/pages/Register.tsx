import FormContainer from "../components/common/FormContainer";
import FormRedirectPrompt from "../components/common/FormRedirectPrompt";
import Header from "../components/common/Header";
import Subheader from "../components/common/Subheader";
import RegisterForm from "../components/Register/RegisterForm";

export default function Register() {
  return (
    <FormContainer>
      <Header text="Truco Online" />
      <Subheader text="Crear cuenta de jugador de Truco Online" />
      <RegisterForm />
      <FormRedirectPrompt
        auxiliaryText="¿Ya ténes cuenta?"
        linkText="Ingresá."
        redirectRoute="/login"
      />
    </FormContainer>
  );
}
