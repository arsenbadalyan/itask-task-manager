import { NavLink } from 'react-router-dom';
import logo from '../../Assets/Images/logo.svg';
import { useSelector } from 'react-redux';
import { getSessionState } from '../../Services/actions/userAction';
const Header = () => {
  const isActiveUser = useSelector(getSessionState);
  return (
    <div className="flex flex-row w-[100%] h-20 bg-custom-white justify-between items-center px-5 shadow-[0_0_10px_0_black]">
      <div className="logo w-20">
        <img src={logo} alt="logo" />
      </div>
      {isActiveUser && (
        <div className="flex flex-row gap-3 font-bold hover:[&>a]:bg-primary-color hover:[&>a]:text-white hover:[&>a]:shadow-[0_0_5px_0_gray] [&>a]:px-3 cursor-pointer">
          <NavLink>Back</NavLink>
          <span>|</span>
          <NavLink>Log Out</NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
