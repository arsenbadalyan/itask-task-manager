const SelectOption = ({ options = {}, stateOptions = {}, name = '' }) => {
  const list = options.settings.list ?? [];
  if (list.length < 1) return <span>no options</span>;
  const settings = options.settings;
  const title = settings.createEditField.title;
  const generateID = settings.name + Math.floor(Math.random() * 20);
  const makeOption = (options, value) => {
    return <option {...options}>{value}</option>;
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={generateID} className="font-bold text-md">
        {title}:
      </label>
      <select
        id={generateID}
        name={settings.name}
        className="p-2 rounded cursor-pointer"
        {...stateOptions}
      >
        {makeOption(
          { value: 'default_' + settings.name, disabled: true },
          title
        )}
        {list.map((option, index) =>
          makeOption({ key: index, value: option.name }, option.value)
        )}
      </select>
    </div>
  );
};

export default SelectOption;
