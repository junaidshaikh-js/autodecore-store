import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BtnComplementary } from "../buttons";
import { ErrorMessage } from "./sub-components/ErrorMessage";
import { ShowPasswordVisibility } from "./sub-components/ShowPasswordVisibility";
import { handleSignupSubmit } from "./utils/handle-signup-submit";
import { InlineLoader } from "../loader/InlineLoader";
import { useAuth, useToast } from "../../context";

export function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [loading, setIsLoading] = useState(false);

  const { dispatch } = useAuth();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [singupValues, setSignupValues] = useState(initialValues);

  const [signupErrors, setSignupErrors] = useState(initialValues);

  const handleSingupValues = (e) => {
    const { name: key, value } = e.target;

    setSignupValues((s) => ({ ...s, [key]: value }));
  };

  return (
    <div className="main-wrapper">
      <main>
        <div className="signup-form-wrapper flex flex-center">
          <article className="signup flex  mx-1 w-100 ">
            <div className="signup__message p-1 flex-grow">
              <h2>Looks like you are new here!</h2>
              <p>Sign up with your email address to get started.</p>
            </div>
            <div className="signup__form mt-1 p-1 flex-grow">
              <form>
                <div>
                  <label
                    htmlFor="first-name"
                    className="form-label  field-required"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-field my-sm p-sm border-sm w-100"
                    placeholder="John"
                    id="first-name"
                    name="firstName"
                    required
                    onChange={(e) => handleSingupValues(e)}
                  />

                  {signupErrors.firstName && (
                    <ErrorMessage text={signupErrors.firstName} />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="form-label  field-required"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-field my-sm p-sm border-sm w-100"
                    placeholder="Doe"
                    id="last-name"
                    required
                    name="lastName"
                    onChange={(e) => handleSingupValues(e)}
                  />

                  {signupErrors.lastName && (
                    <ErrorMessage text={signupErrors.lastName} />
                  )}
                </div>

                <div>
                  <label htmlFor="input" className="form-label  field-required">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-field my-sm p-sm border-sm w-100"
                    placeholder="johndoe@example.com"
                    id="input"
                    name="email"
                    onChange={(e) => handleSingupValues(e)}
                    required
                  />

                  {signupErrors.email && (
                    <ErrorMessage text={signupErrors.email} />
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
                      name="password"
                      onChange={(e) => handleSingupValues(e)}
                      required
                    />

                    <ShowPasswordVisibility
                      isVisible={isPasswordVisible}
                      onClick={() => setIsPasswordVisible((p) => !p)}
                    />
                  </div>

                  {signupErrors.password && (
                    <ErrorMessage text={signupErrors.password} />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="form-label  field-required"
                  >
                    Confirm Password
                  </label>

                  <div className="input-icon">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      className="form-field my-sm p-sm border-sm w-100"
                      placeholder="*********"
                      id="confirm-password"
                      name="confirmPassword"
                      onChange={(e) => handleSingupValues(e)}
                      required
                    />

                    <ShowPasswordVisibility
                      isVisible={isConfirmPasswordVisible}
                      onClick={() => setIsConfirmPasswordVisible((p) => !p)}
                    />
                  </div>

                  {signupErrors.confirmPassword && (
                    <ErrorMessage text={signupErrors.confirmPassword} />
                  )}
                </div>

                <BtnComplementary
                  cnames="signup-submit w-100 mt-1"
                  type="submit"
                  onClick={(e) =>
                    handleSignupSubmit(
                      e,
                      singupValues,
                      setSignupErrors,
                      setIsLoading,
                      dispatch,
                      navigate,
                      setToastMessage
                    )
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <InlineLoader /> Please Wait
                    </span>
                  ) : (
                    "Create New Account"
                  )}
                </BtnComplementary>
              </form>

              <div className="txt-center my-1 primary-link">
                <Link to="/login">
                  Already have an account
                  <i className="fas fa-chevron-circle-right ml-sm"></i>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
