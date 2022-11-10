import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteImage from '../../assets/images/actions/delete.png';
import editImage from '../../assets/images/actions/edit.png';
import { taskListWidth } from '../../config/Constants';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
const Task = ({ taskInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(taskInfo);
  const getDate = (taskInfo) => {
    const date = taskInfo.finishDate;
    const time =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const today =
      date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();
    return `${time} ${today}`;
  };
  const handleTaskEdit = () => {
    navigate('/edit/' + taskInfo.id, { state: { pageState: 'edit' } });
  };
  const handleTaskDelete = () => {
    dispatch(
      taskListAction[taskListTypes.DELETE_TASK_FINISH_STATUS](
        taskInfo.id,
        !taskInfo.finishStatus
      )
    );
  };
  const handleTaskFinishStatusChange = () => {
    dispatch(
      taskListAction[taskListTypes.UPDATE_TASK_FINISH_STATUS](
        taskInfo.id,
        !taskInfo.finishStatus
      )
    );
  };
  return (
    <div className="flex flex-row w-[100%] bg-custom-white justify-between items-center p-3 gap-3 break-words">
      <div className={`w-[${taskListWidth[0]}%] text-center`}>
        <input
          type="checkbox"
          onChange={handleTaskFinishStatusChange}
          checked={taskInfo.finishStatus}
        />
      </div>
      <div className={`w-[${taskListWidth[1]}%] text-center`}>
        <p>{taskInfo.name}</p>
      </div>
      <div className={`w-[${taskListWidth[2]}%]`}>
        <p>{taskInfo.desc}</p>
      </div>
      <div className={`w-[${taskListWidth[3]}%] text-center`}>
        <p>{taskInfo.place}</p>
      </div>
      <div className={`w-[${taskListWidth[4]}%]`}>
        <p>
          {taskInfo.finishStatus ? `${getDate(taskInfo)}` : 'Not Finished Yet'}
        </p>
      </div>
      <div
        className={`flex flex-row gap-1 w-[${taskListWidth[5]}%] [&>img]:w-[50%] [&>img]:cursor-pointer hover-animate-action`}
      >
        <img src={editImage} alt="edit" onClick={handleTaskEdit} />
        <img src={deleteImage} alt="delete" onClick={handleTaskDelete} />
      </div>
    </div>
  );
};

export default Task;
