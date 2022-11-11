import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteImage from '../../assets/images/actions/delete.png';
import editImage from '../../assets/images/actions/edit.png';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
const Task = ({ taskInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDate = (date) => {
    const checkZero = (num) => {
      return num < 10 ? '0' + num : num;
    };
    const time =
      checkZero(date.getHours()) + ':' + checkZero(date.getMinutes());
    const today =
      checkZero(date.getDay()) +
      '.' +
      checkZero(date.getMonth()) +
      '\n' +
      date.getFullYear();
    return `${today} \n ${time}`;
  };
  const handleTaskEdit = () => {
    navigate('/edit/' + taskInfo.id, {
      state: { task: taskInfo, isValid: true },
    });
  };
  const handleTaskDelete = () => {
    dispatch(
      taskListAction[taskListTypes.DELETE_TASK_FINISH_STATUS](
        taskInfo.id,
        !taskInfo.finishStatus
      )
    );
  };
  return (
    <div className="flex flex-row w-[100%] bg-custom-white justify-between items-center p-3 gap-3 break-words">
      <div className={`w-[15%] text-center`}>
        <p>{taskInfo.name}</p>
      </div>
      <div className={`w-[53%]`}>
        <p>{taskInfo.desc}</p>
      </div>
      <div className={`w-[10%] text-center`}>
        <p>{taskInfo.place}</p>
      </div>
      <div className={`w-[5%] text-center`}>
        <p></p>
      </div>
      <div className={`w-[10%]`}>
        <p className="whitespace-pre-line text-center">
          {getDate(taskInfo.finishDate)}
        </p>
      </div>
      <div
        className={`flex flex-row gap-1 w-[7%] [&>img]:w-[50%] [&>img]:cursor-pointer hover-animate-action`}
      >
        <img src={editImage} alt="edit" onClick={handleTaskEdit} />
        <img src={deleteImage} alt="delete" onClick={handleTaskDelete} />
      </div>
    </div>
  );
};

export default Task;
