const TaskListTable = ({ children }) => {
  return (
    <table className="w-[100%] [&>*>tr]:h-[40px] [&>*>*>td]:h-[40px]">
      {children}
    </table>
  );
};

export default TaskListTable;
