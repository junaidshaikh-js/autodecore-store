export const PersonalInfo = () => {
  const userData = JSON.parse(localStorage.getItem("data"));

  return (
    <section className="profile-component bg-white m-1 p-1 flex-grow">
      <div className="my-1">
        <span className="txt-bold">Full Name:</span>{" "}
        {`${userData.firstName} ${userData.lastName}`}{" "}
      </div>
      <div className="my-1">
        <span className="txt-bold">Email Address:</span> {userData.email}
      </div>
    </section>
  );
};
