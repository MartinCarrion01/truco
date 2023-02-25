import FormRedirectPrompt from "../components/common/FormRedirectPrompt";
import Header from "../components/common/Header";
import Subheader from "../components/common/Subheader";
import LoginForm from "../components/Login/LoginForm";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 border-4 border-gray-600 rounded-md bg-white">
        <Header text="Truco Online" />
        <Subheader text="Ingresar a Truco Online" />
        <LoginForm />
        <FormRedirectPrompt auxiliaryText="¿No ténes cuenta?" linkText="Registráte." redirectRoute="/login"/>
      </div>
    </div>
  );
}
