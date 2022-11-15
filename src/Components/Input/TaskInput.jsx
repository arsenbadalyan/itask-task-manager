import useValidationError from '../../hooks/useValidtionError';

const TaskInput = ({ settings, options, validationErrors }) => {
  const validation = useValidationError(validationErrors);
  return (
    <div className="flex flex-col">
      <label className="font-bold text-md" htmlFor="">
        {settings.createEditField.title}:
      </label>
      {settings.createEditField.type === 'text' ? (
        <input
          className="p-2 rounded focus:shadow-primary-custom"
          {...options}
        />
      ) : (
        <textarea
          className="p-2 rounded focus:shadow-primary-custom"
          {...options}
        ></textarea>
      )}

      {validation}
    </div>
  );
};

export default TaskInput;
