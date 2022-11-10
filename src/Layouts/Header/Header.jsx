import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSessionState,
  getSessionState,
} from '../../services/actions/userAction';
const Header = () => {
  const isActiveUser = useSelector(getSessionState);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = location;
  const checkPath = () => {
    const path = pathname.split('/');
    if (path[1] !== undefined) return path[1];
    return null;
  };
  console.log(location);
  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(changeSessionState(false));
    navigate('/login');
  };
  return (
    <div className="flex flex-row w-[100%] h-20 bg-custom-white justify-between items-center px-5 shadow-[0_0_10px_0_black]">
      <div className="logo w-20">
        <img src={logo} alt="logo" />
      </div>
      {isActiveUser ? (
        <div className="flex flex-row gap-3 font-bold hover:[&>a]:bg-primary-color hover:[&>a]:text-white hover:[&>a]:shadow-[0_0_5px_0_gray] [&>a]:px-3 cursor-pointer">
          {checkPath() === 'tasks' || (checkPath() === '' && isActiveUser) ? (
            <>
              <NavLink to="/create" state={{ pageState: 'create' }}>
                Create New Task
              </NavLink>
              <span>|</span>
            </>
          ) : checkPath() === 'create' || checkPath() === 'edit' ? (
            <>
              <NavLink to="/tasks">Back</NavLink>
              <span>|</span>
            </>
          ) : null}
          <NavLink onClick={handleLogOut}>Log Out</NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default Header;