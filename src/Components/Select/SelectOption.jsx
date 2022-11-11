const SelectOption = ({ options = {}, stateOptions = {}, name = '' }) => {
  const list = options.list ?? [];
  if (list.length < 1) return null;
  const makeOption = (options, name) => {
    return <option {...options}>{name}</option>;
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="font-bold text-md">
        {options.defaultValue.name}:
      </label>
      <select
        name={name}
        className="p-2 rounded cursor-pointer"
        {...stateOptions}
      >
        {makeOption(
          { value: options.defaultValue.value, disabled: true },
          options.defaultValue.name
        )}
        {list.map((option, index) =>
          makeOption({ key: index, value: option.value }, option.name)
        )}
      </select>
    </div>
  );
};

export default SelectOption;
