import '../../Assets/Styles/Input.scss';

const LoginInput = ({ props, msg = [] }) => {
  return (
    <div className="w-[100%]">
      <input
        {...props}
        className={`login-simple-input ${msg.length && '!border-red-500'}`}
      />
      {msg.length > 0 &&
        msg.map((item, index) => (
          <span
            key={index}
            className="block text-sm capitalize text-red-500 font-bold"
          >
            {item}
          </span>
        ))}
    </div>
  );
};

export default LoginInput;
