import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import TaskList from '../Pages/TaskList/TaskList';
import { getSessionState } from '../Services/actions/userAction';
import { ProtectSignInRoute } from './protectedRoute';
export const AllRoutes = () => {
  const isActiveUser = useSelector(getSessionState);
  return (
    <Routes>
      <Route path="/" element={!isActiveUser ? <Login /> : <TaskList />} />
      <Route element={<ProtectSignInRoute isActive={isActiveUser} />}>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<TaskList />} />
        <Route path="/edit/:id" element={<TaskList />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
