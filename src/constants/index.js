import { Login, SignUp } from "../routes";
import ErrorPage from "../screens/error/error-page";

export const ROUTES_ARRAY = [
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
];
export const ERROR_MESSAGES = {
  // email errors
  provideEmail: "Please provide email",
  validEmail: "Please enter a valid email",
  //   password errors
  providePassword: "Please provide password",
  maxPassword: "Password length should not exceed eight characters",
  // general errors
  minLength: "Please enter atleast three characters",
  requiredField: "This field is required",
};
