import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteImage from '../../assets/images/actions/delete.png';
import editImage from '../../assets/images/actions/edit.png';
import { getDate } from '../../utils/dateTime';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
import { listItemTypes } from '../../services/reducers/taskListReducer';

const Task = ({ taskInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTaskEdit = () => {
    navigate('/edit/' + taskInfo.id, {
      state: { task: taskInfo, isValid: true, page: 'edit' },
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
    <div className="tl-table flex flex-row w-[100%] bg-white justify-between items-center p-3 gap-3 break-words shadow-2xl hover:bg-custom-white hover:cursor-default">
      <div className={`tl-table__item text-center`}>
        <p>{taskInfo[listItemTypes.NAME]}</p>
      </div>
      <div className={`tl-table__item`}>
        <p>{taskInfo[listItemTypes.DESC]}</p>
      </div>
      <div className={`tl-table__item text-center`}>
        <p>{taskInfo[listItemTypes.PLACE].name}</p>
      </div>
      <div className={`tl-table__item text-center`}>
        <p
          style={{
            color: taskInfo[listItemTypes.FINISH_STATUS].color,
            fontWeight: 'bold',
          }}
        >
          {taskInfo[listItemTypes.FINISH_STATUS].name}
        </p>
      </div>
      <div className={`tl-table__item`}>
        <p className="whitespace-pre-line text-center">
          {getDate(taskInfo[listItemTypes.FINISH_DATE])}
        </p>
      </div>
      <div
        className={`flex flex-row gap-1 tl-table__item [&>img]:w-[50%] [&>img]:cursor-pointer hover-animate-action`}
      >
        <img src={editImage} alt="edit" onClick={handleTaskEdit} />
        <img src={deleteImage} alt="delete" onClick={handleTaskDelete} />
      </div>
    </div>
  );
};

export default Task;
