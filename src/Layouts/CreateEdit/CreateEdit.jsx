import { Navigate, useLocation } from 'react-router-dom';
import LoginInput from '../../components/Input/LoginInput';

const CreateEdit = () => {
  const location = useLocation();
  const { state } = location;
  const pageStateHeaders = {
    edit: 'Editing Task',
    create: 'Create New Task',
  };
  console.log(state);
  if (
    state === null ||
    state.pageState === undefined ||
    pageStateHeaders[state.pageState] === undefined
  )
    return <Navigate to="/" />;

  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl text-center cursor-default bg-primary-color text-white shadow-[0_0_10px_0_black] py-3 mb-3">
        {pageStateHeaders[state.pageState]}
      </h1>
      <div className="form">
        <form action="">
          <LoginInput />
        </form>
      </div>
    </div>
  );
};

export default CreateEdit;
