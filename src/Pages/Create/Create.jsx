import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInput from '../../components/Input/TaskInput';
import SelectOption from '../../components/Select/SelectOption';
import CreateEdit from '../../layouts/CreateEdit/CreateEdit';
import {
  createListItem,
  taskToDoList,
  taskStateList,
  listItemTypes,
} from '../../services/reducers/taskListReducer';
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
  const page =
    useMemo(() => {
      if (state && state.isValid) {
        return state.page;
      }
      return null;
    }, [state]) ?? '';
  const taskList = useSelector(taskListAction[taskListTypes.READ_ALL_STATE]);
  const dispatch = useDispatch();
  const [uniqueId] = useState(uuid());
  const [values, setValues] = useState(() => {
    const mainTaskInfo = taskList.mainTaskInfo.slice();
    console.log(page && state.task === true);
    const obj = {};
    mainTaskInfo.forEach((el) => {
      obj[el.name] = page && state.task ? state.task[el.name] : el.defValue;
    });
    console.log(obj);
    return obj;
  });
  const [errorList, setErrorList] = useState(() => {
    const mainTaskInfo = taskList.mainTaskInfo.slice();
    const obj = {};
    mainTaskInfo.forEach((el) => {
      obj[el.name + '_error'] = [];
    });
    return obj;
  });
  const task = useMemo(
    () => (page && state.task ? state.task : createListItem(uniqueId)),
    // eslint-disable-next-line
    [uniqueId]
  );
  const mainTaskInfoList = useMemo(
    () => {
      const taskListCopy = Object.assign({}, taskList);
      if (page && state.task) {
        const newTaskInfo = taskListCopy.mainTaskInfo.map((el) => {
          if (el.name === listItemTypes.PLACE) {
            el.defValue = task[listItemTypes.PLACE];
          }
          return el;
        });
        return newTaskInfo;
      }
      console.log('create');
      return taskListCopy.mainTaskInfo;
    },
    // eslint-disable-next-line
    [values]
  );
  if (!page) {
    return <Navigate to="-1" />;
  }
  const handleTextInputChange = (e, name) => {
    task[name] = e.target.value;
    setValues((values) => ({
      ...values,
      [name]: e.target.value,
    }));
  };
  const handleSelectChange = (e, name) => {
    const list = name === listItemTypes.PLACE ? taskToDoList : taskStateList;
    const newSelect = list.find((el) => el.value === e.target.value);
    task[name] = newSelect;
    setValues((values) => ({
      ...values,
      [name]: newSelect.value,
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    let errorCount = 0;
    const keys = Object.keys(values);
    Object.values(values).forEach((value, index) => {
      value = typeof value === 'object' && value !== null ? value.value : value;
      const check = validation(value, false);
      const findErrorText = keys[index] + '_error';
      if (check.type.length > 0) {
        errorCount++;
      }
      setErrorList((errorList) => ({
        ...errorList,
        [Object.keys(errorList).find((el) => el === findErrorText)]: check.type,
      }));
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
    <CreateEdit header={`${page === 'edit' ? 'Edit Task' : 'Create New Task'}`}>
      {mainTaskInfoList.map((info, index) => {
        if (page === 'edit' && !info.edit) {
          return null;
        }
        if (page === 'create' && !info.create) {
          return null;
        }
        if (info.type === 'text-input') {
          return (
            <TaskInput
              key={index}
              options={{
                placeholder: info.plHolder,
                value: values[info.name],
                onChange: (e) => {
                  handleTextInputChange(e, info.name);
                },
              }}
              validationErrors={errorList[info.name + '_error']}
            />
          );
        } else if (info.type === 'select-option') {
          return (
            <SelectOption
              key={index}
              name={info.name}
              options={info.options}
              stateOptions={{
                value: info.defValue.value,
                onChange: (e) => {
                  handleSelectChange(e, info.name);
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
