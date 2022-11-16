import { data } from 'autoprefixer';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import Task from '../../components/Task/Task';
import TaskHeader from '../../components/TaskHeader/TaskHeader';
import { pageMaxLimit } from '../../config/Constants';
import TaskListTable from '../../layouts/TaskListTable/TaskListTable';
import { taskListAction } from '../../services/actions/taskListAction';
import { listItemTypes } from '../../services/reducers/taskListReducer';
import taskListTypes from '../../services/types/taskListTypes';
import deleteImage from '../../assets/images/actions/delete.png';
import editImage from '../../assets/images/actions/edit.png';
import { useNavigate } from 'react-router-dom';
import { searchText } from '../../middleware/checkFilters';
const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskList = useSelector(taskListAction[taskListTypes.READ_TASK_LIST]);
  // const filters = useSelector()
  const showInTableTaskTypes = useMemo(() => {
    return Object.values(listItemTypes).filter(
      (item) => item.settings.showInTable
    );
  }, []);
  // const [page, setPage] = useState(0);
  // const reverseList = useMemo(() => {
  //   const revList = taskList.list.slice().reverse();
  //   const newList = [];
  //   for (
  //     let j = 0, i = page * pageMaxLimit + j;
  //     j < pageMaxLimit;
  //     j++, i = page * pageMaxLimit + j
  //   ) {
  //     revList[i] ? newList.push(revList[i]) : (j = pageMaxLimit);
  //   }
  //   return newList;
  // }, [page, taskList.list]);
  // const pageCount = Math.ceil(taskList.list.length / pageMaxLimit);
  // const pageArr = new Array(pageCount).fill(0);
  // const handlePageChange = (pg) => {
  //   if (pg !== page) setPage(pg);
  // };
  const getTableRow = (task, item, index) => {
    const settings = item.settings;
    let data = task[item.name];
    if (settings.changeData.change) {
      data = settings.changeData.mutateData(data);
    }
    return (
      <td
        key={index + index * 3}
        className={`${settings.style.classes}`}
        style={
          settings.style.hasColor
            ? { backgroundColor: task[item.name].color }
            : {}
        }
      >
        {data}
      </td>
    );
  };

  const handleTaskEdit = (taskInfo) => {
    navigate('/edit/' + taskInfo.id, {
      state: { task: taskInfo, isValid: true, page: 'edit' },
    });
  };
  const handleTaskDelete = (taskInfo) => {
    dispatch(
      taskListAction[taskListTypes.DELETE_TASK](
        taskInfo.id,
        !taskInfo.finishStatus
      )
    );
  };
  const handleAscBtn = (typeInfo) => {
    console.log(typeInfo);
    // dispatch();
  };

  return (
    <div className="mx-5 my-5">
      <div className="flex justify-between">
        {/* <div>
          <p>Filter</p>
        </div>
        <div>
          <p>Search</p>
        </div> */}
        <Search />
      </div>

      <TaskListTable>
        <thead className="text-center bg-primary-color text-white font-bold">
          <tr>
            <th className="py-2 cursor-default">№</th>
            {showInTableTaskTypes.map((item, index) => {
              const isAvailableAsc = item.settings.asc;
              return (
                <th
                  className={`py-2 cursor-default ${
                    isAvailableAsc
                      ? 'hover:bg-blue-800 hover:cursor-pointer'
                      : ''
                  }`}
                  onClick={isAvailableAsc ? () => handleAscBtn(item) : null}
                  key={index}
                >
                  {item.settings.title}
                  {isAvailableAsc ? <span> &#8593;&#8595;</span> : null}
                </th>
              );
            })}
            <th className="py-2 cursor-default">Actions</th>
          </tr>
        </thead>
        <tbody className="cursor-default bg-white [&>*>td]:py-2 [&>*>td]:px-3">
          {taskList.map((task, index) => {
            return (
              <tr key={index} className="hover:bg-custom-white cursor-pointer">
                <td className="font-bold">{index + 1}</td>
                {showInTableTaskTypes.map((item, index) => {
                  return getTableRow(task, item, index);
                })}
                <td className="flex justify-center items-center gap-2 [&>img]:h-[100%] [&>img]:cursor-pointer hover-animate-action">
                  <img
                    src={editImage}
                    alt="edit"
                    onClick={() => handleTaskEdit(task)}
                  />
                  <img
                    src={deleteImage}
                    alt="delete"
                    onClick={() => handleTaskDelete(task)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </TaskListTable>
      {/* <div className="flex justify-center gap-2 w-[100%] mt-3">
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
      </div> */}
    </div>
  );
};

export default TaskList;
