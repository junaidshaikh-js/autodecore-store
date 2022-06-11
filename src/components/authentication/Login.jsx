import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useToast } from "../../context";
import { BtnComplementary, BtnPrimary } from "../buttons";
import { login } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loader/loader";
import { getValidated } from "./utils/getValidated";
import "./authentication.css";
import { ErrorMessage } from "./sub-components/ErrorMessage";

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [logging, setIsLogging] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginFormErrors, setLoginFormErrors] = useState({});

  const { dispatch } = useAuth();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.location?.pathname || "/";

  const handleFormLogin = (e) => {
    const { value, id: key } = e.target;

    setLoginData((l) => ({ ...l, [key]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const errors = getValidated(loginData.email, loginData.password);

    setLoginFormErrors(errors);

    if (!Object.keys(errors).length) {
      login(
        dispatch,
        loginData.email,
        loginData.password,
        setIsLogging,
        navigate,
        setToastMessage,
        from
      );
    }
  };

  const testData = {
    email: "sj.shaikhjunaid@gmail.com",
    password: "junaidshaikh",
  };

  return (
    <div className="main-wrapper">
      <main>
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

                  {loginFormErrors.email && (
                    <ErrorMessage text={loginFormErrors.email} />
                  )}
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

                  {loginFormErrors.password && (
                    <ErrorMessage text={loginFormErrors.password} />
                  )}
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
                    setToastMessage,
                    from
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
