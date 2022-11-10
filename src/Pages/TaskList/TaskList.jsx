import { useSelector } from 'react-redux';
import Task from '../../components/Task/Task';
import TaskHeader from '../../components/TaskHeader/TaskHeader';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
const TaskList = () => {
  const taskList = useSelector(taskListAction[taskListTypes.READ_ALL_STATE]);
  console.log(taskList);
  return (
    <div className="mx-5 my-5 shadow-[0_0_10px_0_black]">
      <TaskHeader />
      {taskList.map((task) => {
        return <Task key={task.id} taskInfo={task} />;
      })}
    </div>
  );
};

export default TaskList;
