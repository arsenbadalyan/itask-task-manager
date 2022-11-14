import { taskListHeaders } from '../../config/Constants';
const TaskHeader = () => {
  return (
    <div className=" shadow-2xl tl-table flex flex-row p-3 gap-3 justify-center items-center font-bold text-white bg-primary-color cursor-default">
      {taskListHeaders.map((item, index) => {
        return (
          <div key={index} className="tl-table__item text-center">
            <p>{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskHeader;
