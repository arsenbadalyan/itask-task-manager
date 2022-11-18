import useLabel from '../../hooks/useLabel';

const Filter_ChBx = ({ labelName, value, onClick }) => {
  const [label, labelID] = useLabel(value, labelName, '');
  return (
    <div>
      <input
        type="checkbox"
        id={labelID}
        name={labelID}
        value={value}
        onClick={onClick}
        className="mr-2"
      />
      {label}
    </div>
  );
};

export default Filter_ChBx;
