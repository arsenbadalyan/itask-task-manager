import '../../Assets/Styles/Submit.scss';

const LoginSubmit = ({ handleClick }) => {
  return (
    <>
      <button className="login-submit" onClick={handleClick}>
        Sign In
      </button>
    </>
  );
};

export default LoginSubmit;
