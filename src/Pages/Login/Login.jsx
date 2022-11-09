import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../../Components/Input/LoginInput';
import LoginSubmit from '../../Components/Submit/LoginSubmit';
import {
  changeEmail,
  changePassword,
  changeUsername,
  getEmail,
  getPassword,
  getUsername,
} from '../../Services/actions/userAction';
import Validation from '../../utils/Validation';
const Login = () => {
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { username, email, password } = {
    username: useSelector(getUsername),
    email: useSelector(getEmail),
    password: useSelector(getPassword),
  };
  const handleInputFieldsCheck = (inputType) => {
    const input = new Validation();
    let validate = {};
    if (inputType === 'username') {
      validate = input.validateSimpleInput(username, true);
    } else if (inputType === 'password') {
      validate = input.validatePassword(password);
    } else if (inputType === 'email') {
      validate = input.validateEmail(email);
    }
    console.log(validate);
    if (validate.type.length > 0) {
      setValidationErrors({
        ...validationErrors,
        [inputType]: validate.type[0],
      });
      return false;
    } else {
      setValidationErrors({
        ...validationErrors,
        [inputType]: '',
      });
      return true;
    }
  };
  const handleSignInClick = () => {
    handleInputFieldsCheck('email');
    handleInputFieldsCheck('username');
    handleInputFieldsCheck('password');
    console.log(validationErrors);
  };
  return (
    <div className="w-[90%] sm:w-[50%] h-[100%] m-auto flex flex-col justify-center items-center transition-all">
      <div className="w-[100%] flex flex-col items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg shadow-sec-color">
        <div>
          <p className="text-2xl text-center font-bold font-mono">Sign In</p>
        </div>
        <LoginInput
          props={{
            type: 'text',
            placeholder: 'Username',
            onChange: (e) => {
              dispatch(changeUsername(e.target.value));
              if (validationErrors.username.length > 0)
                handleInputFieldsCheck('username');
            },
            onBlur: (e) => handleInputFieldsCheck('username'),
          }}
          msg={validationErrors.username}
        />
        <LoginInput
          props={{
            type: 'text',
            placeholder: 'Email',
            onChange: (e) => {
              dispatch(changeEmail(e.target.value));
              if (validationErrors.email.length > 0)
                handleInputFieldsCheck('email');
            },
            onBlur: (e) => handleInputFieldsCheck('email'),
          }}
          msg={validationErrors.email}
        />
        <LoginInput
          props={{
            type: 'password',
            placeholder: 'Password',
            onChange: (e) => {
              dispatch(changePassword(e.target.value));
              if (validationErrors.password.length > 0)
                handleInputFieldsCheck('password');
            },
            onBlur: (e) => handleInputFieldsCheck('password'),
          }}
          msg={validationErrors.password}
        />
        <LoginSubmit handleClick={handleSignInClick} />
      </div>
    </div>
  );
};

export default Login;
