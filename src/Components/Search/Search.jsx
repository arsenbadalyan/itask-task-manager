import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';

const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  // const filter = useSelector();
  const handleSearchBarChange = (e) => {
    setSearch(e.target.value);
    dispatch(
      taskListAction[taskListTypes.UPDATE_FILTER_SEARCH](e.target.value)
    );
  };
  return (
    <div className="w-[100%] mb-2 flex justify-end">
      <input
        type="text"
        className="p-2 shadow-black-custom rounded-xl font-bold"
        value={search}
        onChange={handleSearchBarChange}
        placeholder="Search Task..."
      />
    </div>
  );
};

export default Search;
