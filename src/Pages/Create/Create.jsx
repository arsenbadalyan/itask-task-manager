import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInput from '../../components/Input/TaskInput';
import SelectOption from '../../components/Select/SelectOption';
import CreateEdit from '../../layouts/CreateEdit/CreateEdit';
import { createListItem } from '../../services/reducers/taskListReducer';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
import { useState } from 'react';
import TaskSubmit from '../../components/Input/TaskSubmit';
import { v4 as uuid } from 'uuid';
import validation from '../../hooks/validation';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const taskList = useSelector(taskListAction[taskListTypes.READ_ALL_STATE]);
  const dispatch = useDispatch();
  const [uniqueId] = useState(uuid());
  const [values, setValues] = useState(() => {
    const mainTaskInfo = taskList.mainTaskInfo;
    const obj = {};
    mainTaskInfo.forEach((el) => {
      obj[el.name] = state && state.task ? state.task[el.name] : el.defValue;
    });
    return obj;
  });
  const mainTaskInfo = taskList.mainTaskInfo;
  const task = useMemo(
    () => (state && state.task ? state.task : createListItem(uniqueId)),
    // eslint-disable-next-line
    [uniqueId]
  );
  if (state && state.isValid) {
  } else {
    return <Navigate to={-1} />;
  }
  const handleInputSelectChange = (e, name) => {
    task[name] = e.target.value;
    setValues((values) => ({
      ...values,
      [name]: e.target.value,
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    let errorCount = 0;
    Object.values(values).forEach((value) => {
      const check = validation(value, false);
      if (check.type.length > 0) errorCount++;
    });
    if (errorCount === 0) {
      if (id) {
        dispatch(taskListAction[taskListTypes.UPDATE_TASK_LIST_ITEM](task));
      } else {
        dispatch(taskListAction[taskListTypes.CREATE_NEW_TASK](task));
      }
      navigate(-1);
    }
  };

  return (
    <CreateEdit header="Create New Task">
      {mainTaskInfo.map((info, index) => {
        if (info.type === 'text-input') {
          return (
            <TaskInput
              key={index}
              options={{
                placeholder: info.plHolder,
                value: values[info.name],
                onChange: (e) => {
                  handleInputSelectChange(e, info.name);
                },
              }}
            />
          );
        } else if (info.type === 'select-option') {
          return (
            <SelectOption
              key={index}
              name={info.name}
              options={info.options}
              stateOptions={{
                value: values[info.name],
                onChange: (e) => {
                  handleInputSelectChange(e, info.name);
                },
              }}
            />
          );
        }
        return null;
      })}
      <TaskSubmit options={{ value: 'Save', onClick: handleSave }} />
    </CreateEdit>
  );
};

export default Create;
