import CenteredContainer from "../components/common/CenteredContainer";
import FormContainer from "../components/common/FormContainer";
import FormRedirectPrompt from "../components/common/FormRedirectPrompt";
import Header from "../components/common/Header";
import Subheader from "../components/common/Subheader";
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  return (
    <CenteredContainer>
      <FormContainer>
        <Header text="Truco Online" />
        <Subheader text="Ingresar a Truco Online" />
        <LoginForm />
        <FormRedirectPrompt
          auxiliaryText="¿No ténes cuenta?"
          linkText="Registráte."
          redirectRoute="register"
        />
      </FormContainer>
    </CenteredContainer>
  );
}