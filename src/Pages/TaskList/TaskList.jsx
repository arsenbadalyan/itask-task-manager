import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from '../../components/Task/Task';
import TaskHeader from '../../components/TaskHeader/TaskHeader';
import { pageMaxLimit } from '../../config/Constants';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
const TaskList = () => {
  const taskList = useSelector(taskListAction[taskListTypes.READ_ALL_STATE]);
  const [page, setPage] = useState(0);
  const reverseList = useMemo(() => {
    const revList = taskList.list.slice().reverse();
    const newList = [];
    for (
      let j = 0, i = page * pageMaxLimit + j;
      j < pageMaxLimit;
      j++, i = page * pageMaxLimit + j
    ) {
      revList[i] ? newList.push(revList[i]) : (j = pageMaxLimit);
    }
    return newList;
  }, [page, taskList.list]);
  console.log(reverseList);
  const pageCount = Math.ceil(taskList.list.length / pageMaxLimit);
  const pageArr = new Array(pageCount).fill(0);
  const handlePageChange = (pg) => {
    if (pg !== page) setPage(pg);
  };
  return (
    <div className="mx-5 my-5">
      <TaskHeader />
      {reverseList.map((task) => {
        return <Task key={task.id} taskInfo={task} />;
      })}
      <div className="flex justify-center gap-2 w-[100%] mt-3">
        {pageArr.map((_, index) => (
          <div
            onClick={() => handlePageChange(index)}
            key={index}
            className={`px-2 py-1 cursor-pointer rounded border font-bold text-white bg-primary-color transition-all shadow-lg ${
              page === index
                ? 'text-white bg-sec-color'
                : 'hover:bg-white hover:text-black'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
