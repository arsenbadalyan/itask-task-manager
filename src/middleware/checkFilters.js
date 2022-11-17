import { listItemTypes } from '../services/reducers/taskListReducer';

const getItemValue = (item) => {
  return typeof item === 'object' && item !== null ? item.value : item;
};

export const searchText = (list, searchTxt = '') => {
  searchTxt = searchTxt.toLowerCase();
  const searchAccessArr = Object.values(listItemTypes).filter(
    (el) => el.settings.search
  );
  console.log(list);
  list = list.filter((item) => {
    console.log(searchAccessArr);
    let check = false;
    for (let i = 0; i < searchAccessArr.length; i++) {
      const value = getItemValue(item[searchAccessArr[i].name]).toLowerCase();
      if (value.search(searchTxt) !== -1) {
        check = true;
        break;
      }
    }
    if (check) return item;
  });
  return list;
};

export const ascDesc = (list, asc) => {
  const { isAsc, field } = asc;
  let sortStyle = -1;
  if (!isAsc) sortStyle = 1;
  list = list.sort((a, b) => {
    a = getItemValue(a[field]);
    b = getItemValue(b[field]);
    return a > b ? sortStyle : a < b ? sortStyle * -1 : 0;
  });
  return list;
};

export const checkFilters = (taskList) => {
  // console.log('checking filters');
  const list = taskList.list;
  const filters = taskList.filters;
  let revList = list.slice().reverse();
  if (filters.search !== '') revList = searchText(revList, filters.search);
  if (typeof filters.asc.isAsc === 'boolean')
    revList = ascDesc(revList, filters.asc);
  // console.log(taskList);
  return revList;
};
