import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { BtnComplementary, BtnPrimary } from "../buttons";
import { login } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loader";
import { getValidated } from "./utils/getValidated";
import "./authentication.css";

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [logging, setIsLogging] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleFormLogin = (e) => {
    const { value, id: key } = e.target;

    setLoginData((l) => ({ ...l, [key]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const isValidated = getValidated(loginData.email, loginData.password);

    console.log("isvalidated before if", isValidated);
    if (!isValidated) {
      console.log("running if");
      setLoginError("Invalid email or password");

      return;
    }

    console.log("running after if");

    login(
      dispatch,
      loginData.email,
      loginData.password,
      setIsLogging,
      navigate,
      setLoginError
    );
  };

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const testData = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  return (
    <div className="main-wrapper">
      <main>
        {/* TODO: handle with toast  */}
        <span className="login-error">{loginError}</span>

        <div className="login-form-wrapper flex flex-center">
          <article className="login flex mx-1">
            <div className="login__message p-1 flex-grow">
              <h2>Login</h2>
              <p>Get access to your orders, Wishlist and Recommendations</p>
            </div>
            <div className="login__form mt-1 p-1 flex-grow">
              <form>
                <div>
                  <label htmlFor="email" className="form-label field-required">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-field my-sm p-sm border-sm w-100"
                    placeholder="johndoe@example.com"
                    id="email"
                    required
                    value={loginData.email}
                    onChange={handleFormLogin}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="form-label  field-required"
                  >
                    Password
                  </label>

                  <div className="input-icon">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="form-field my-sm p-sm border-sm w-100"
                      placeholder="*********"
                      id="password"
                      required
                      value={loginData.password}
                      onChange={handleFormLogin}
                    />

                    <span
                      className="show-password-icon-container"
                      onClick={() => setIsPasswordVisible((i) => !i)}
                    >
                      {isPasswordVisible ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="fas fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                </div>

                <BtnComplementary
                  cnames="w-100 mt-1"
                  type="submit"
                  onClick={handleLoginSubmit}
                  disabled={logging}
                >
                  Login
                </BtnComplementary>
              </form>

              <BtnPrimary
                cnames="w-100 mt-1"
                type="submit"
                onClick={() =>
                  login(
                    dispatch,
                    testData.email,
                    testData.password,
                    setIsLogging,
                    navigate,
                    setLoginError
                  )
                }
                disabled={logging}
              >
                Login as Guest
              </BtnPrimary>

              <div className="txt-center mt-1 primary-link">
                <Link to="/signup">
                  Create new account{" "}
                  <i className="fas fa-chevron-circle-right"></i>
                </Link>
              </div>
            </div>
          </article>
        </div>

        {logging && <Loader />}
      </main>
    </div>
  );
}
