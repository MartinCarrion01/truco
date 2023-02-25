import { Link } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  auxiliaryText: string;
  linkText: string;
  redirectRoute: string;
}

export default function FormRedirectPrompt(props: Props) {
  return (
    <p className="text-gray-500 text-2xl my-2">
      {props.auxiliaryText + " "}
      <Link
        to={props.redirectRoute}
        className="text-blue-500 hover:text-blue-600"
      >
        {props.linkText}
      </Link>
    </p>
  );
}
