import useValidationError from '../../hooks/useValidtionError';

const TaskInput = ({ options, validationErrors }) => {
  const validation = useValidationError(validationErrors);
  return (
    <div className="flex flex-col">
      <label className="font-bold text-md" htmlFor="">
        {options.placeholder}:
      </label>
      <input className="p-2 rounded focus:shadow-primary-custom" {...options} />
      {validation}
    </div>
  );
};

export default TaskInput;
