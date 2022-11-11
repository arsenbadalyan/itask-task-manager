const TaskInput = ({ options }) => {
  return (
    <div className="flex flex-col">
      <label className="font-bold text-md" htmlFor="">
        {options.placeholder}:
      </label>
      <input className="p-2 rounded focus:shadow-primary-custom" {...options} />
    </div>
  );
};

export default TaskInput;
