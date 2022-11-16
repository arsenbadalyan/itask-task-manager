import useInput from '../../hooks/useInput';

const Search = () => {
  const [search, searchChange] = useInput();
  return (
    <div className="w-[100%] mb-2 flex justify-end">
      <input
        type="text"
        className="p-2 shadow-black-custom rounded-xl font-bold"
        value={search}
        onChange={searchChange}
        placeholder="Search Task..."
      />
    </div>
  );
};

export default Search;
