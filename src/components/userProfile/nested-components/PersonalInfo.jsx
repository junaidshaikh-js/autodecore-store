import { useNavigate } from "react-router-dom";

import { useAuth, useToast, useData } from "../../../context";
import { BtnPrimary, BtnSecondary } from "../../buttons";

export const PersonalInfo = () => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const { dispatch: dataDispatch } = useData();

  const { handleLogout } = useAuth();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();

  return (
    <section className="profile-component bg-white m-1 p-1 flex-grow">
      <div className="my-1">
        <span className="txt-bold">Full Name:</span>{" "}
        {`${userData.firstName} ${userData.lastName}`}{" "}
      </div>
      <div className="my-1">
        <span className="txt-bold">Email Address:</span> {userData.email}
      </div>
      <div className="mt-2">
        <BtnPrimary
          onClick={() => handleLogout(dataDispatch, setToastMessage, navigate)}
        >
          Logout
        </BtnPrimary>
      </div>
    </section>
  );
};
