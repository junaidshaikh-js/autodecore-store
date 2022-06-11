export function ShowPasswordVisibility({ onClick, isVisible }) {
  return (
    <>
      <span className="show-password-icon-container" onClick={onClick}>
        {isVisible ? (
          <i className="fas fa-eye"></i>
        ) : (
          <i className="fas fa-eye-slash"></i>
        )}
      </span>
    </>
  );
}
