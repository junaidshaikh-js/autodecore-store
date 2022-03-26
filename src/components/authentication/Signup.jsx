import { useState } from "react";
import { Link } from "react-router-dom";
import { BtnComplementary } from "../buttons";
import { ShowPasswordVisibility } from "./ShowPasswordVisibility";

export function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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
                    required
                  />
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
                  />
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
                    required
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
                    />

                    <ShowPasswordVisibility
                      isVisible={isPasswordVisible}
                      onClick={() => setIsPasswordVisible((p) => !p)}
                    />
                  </div>
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
                      required
                    />

                    <ShowPasswordVisibility
                      isVisible={isConfirmPasswordVisible}
                      onClick={() => setIsConfirmPasswordVisible((p) => !p)}
                    />
                  </div>
                </div>

                <div className="flex align-center mt-2">
                  <span className="field-required">
                    <input
                      className="mr-sm"
                      type="checkbox"
                      id="remember-me"
                      required
                    />
                    <label htmlFor="remember-me">
                      I accept all the terms and conditions
                    </label>
                  </span>
                </div>

                <BtnComplementary
                  cnames="signup-submit w-100 mt-1"
                  type="submit"
                >
                  Create New Account
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
