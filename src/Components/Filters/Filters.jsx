import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filtersLogo from '../../assets/images/actions/filters.png';
import { taskListAction } from '../../services/actions/taskListAction';
import {
  filteringTypes,
  listItemTypes,
} from '../../services/reducers/taskListReducer';
import taskListTypes from '../../services/types/taskListTypes';
import Filter_ChBx from '../Checkbox/Filter_ChBx';

const Filters = () => {
  const filters = useSelector(taskListAction[taskListTypes.READ_FILTER_FIELD]);
  const dispatch = useDispatch();
  const filtersDIV = useRef();
  const detailFilterList = useMemo(() => {
    return Object.values(listItemTypes).filter(
      (el) => el.settings.filters.hasFilters === true
    );
  }, []);
  const handleFiltersOpenClose = () => {
    console.log('clicked');
  };
  const handleCheckBoxClick = (e, name, value) => {
    // console.log(e.target.checked);
    dispatch(
      taskListAction[taskListTypes.UPDATE_FILTER_DETAIL](
        name,
        value,
        e.target.checked
      )
    );
  };
  return (
    <div className="my-2">
      <button
        onClick={handleFiltersOpenClose}
        className="flex items-center justify-between w-[100%] h-[30px] bg-primary-color p-5 rounded-xl hover:shadow-black-custom transition-all hover:bg-white"
      >
        <img
          src={filtersLogo}
          alt="filters"
          className="h-[30px] w-[30px] mr-2"
        />
        <p className="text-lg font-bold">Filters</p>
      </button>
      <div
        // style={{ height: 0, overflow: 'hidden' }}
        className="relative mt-2 w-[100%] bg-custom-white rounded-xl shadow-black-custom transition-all"
        ref={filtersDIV}
      >
        <div className="p-2 flex gap-3">
          {detailFilterList.map((item, index) => {
            const detailFilter = item.settings.filters;
            return (
              <div key={index}>
                <div>
                  <ul>
                    <li>{detailFilter.title}</li>
                    {detailFilter.filterType.name ===
                    filteringTypes.SELECT_LIST.name
                      ? item.list.map((listItem) => {
                          return (
                            <li key={listItem.value}>
                              <Filter_ChBx
                                labelName={listItem.value}
                                value={listItem.name}
                                onClick={(e) =>
                                  handleCheckBoxClick(
                                    e,
                                    item.name,
                                    listItem.value
                                  )
                                }
                              />
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
