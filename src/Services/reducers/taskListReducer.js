import taskListTypes from '../types/taskListTypes';
import { v4 as uuid } from 'uuid';
import { getDate, getDateTimeLocal } from '../../utils/dateTime';

// Work With Data
export const taskPlaceList = [
  { value: 'Work', name: 'work' },
  { value: 'Home', name: 'home' },
  { value: 'In Street', name: 'street' },
];
export const taskStateList = [
  { value: 'Created', name: 'created', color: 'rgb(84,84,232)' },
  { value: 'In Progress', name: 'progress', color: 'rgb(255,132,1)' },
  { value: 'Finished', name: 'finished', color: 'rgb(50,174,14)' },
];

const createListItemType = (
  settings,
  name,
  create = false,
  edit = false,
  createEditField = {},
  defValue = '',
  list = null
) => ({
  settings,
  name,
  create,
  edit,
  defValue,
  createEditField,
  list,
});

export const listItemTypes = {
  ID: createListItemType(
    {
      showInTable: false,
      title: 'ID',
      asc: false,
      search: false,
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'id'
  ),
  NAME: createListItemType(
    {
      showInTable: true,
      title: 'Name',
      asc: true,
      search: true,
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'name',
    true,
    true,
    {
      type: 'text',
      title: 'Enter Name',
      plHolder: 'Name',
    }
  ),
  DESC: createListItemType(
    {
      showInTable: true,
      title: 'Description',
      asc: false,
      search: true,
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'desc',
    true,
    true,
    {
      type: 'text-area',
      title: 'Enter Description',
      plHolder: 'Description',
    }
  ),
  PLACE: createListItemType(
    {
      showInTable: true,
      title: 'Place To Do',
      asc: false,
      search: true,
      style: {
        classes: 'text-center',
        hasColor: false,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return data.value;
        },
      },
    },
    'place',
    true,
    true,
    {
      type: 'select',
      title: 'Select Place To Do That Task',
      plHolder: '',
    },
    taskPlaceList[0],
    taskPlaceList
  ),
  FINISH_STATUS: createListItemType(
    {
      showInTable: true,
      title: 'Status',
      asc: false,
      search: true,
      style: {
        classes: 'text-center text-white font-bold',
        hasColor: true,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return data.value;
        },
      },
    },
    'finishStatus',
    false,
    true,
    {
      type: 'select',
      title: 'Select Task Status',
      plHolder: '',
    },
    taskStateList[0],
    taskStateList
  ),
  FINISH_DATE: createListItemType(
    {
      showInTable: true,
      title: 'Finish Date',
      asc: false,
      search: true,
      style: {
        classes: 'text-center',
        hasColor: false,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return getDate(data);
        },
      },
    },
    'finishDate',
    true,
    true,
    {
      type: 'date-time',
      title: 'Choose finish date',
      plHolder: '',
    },
    getDateTimeLocal(new Date())
  ),
};

const taskListInitialState = {
  filters: {
    search: '',
  },
  list: [],
};

export const createListItem = () => {
  const newItem = Object.fromEntries(
    Object.keys(listItemTypes)
      .slice()
      .map((type) => [listItemTypes[type].name, listItemTypes[type].defValue])
  );
  newItem[listItemTypes.ID.name] = uuid();
  return newItem;
};

// Initialize Data
const initialTaskListState = () => {
  let list = { filters: [], list: [] };
  if (localStorage.getItem('taskList')) {
    list = JSON.parse(localStorage.getItem('taskList'));
  }
  return list;
};

// Reducers
export const taskListReducer = (state = initialTaskListState(), action) => {
  const type = action.type ?? '';
  let list = state.list;
  let filters = state.filters;
  const actionTypes = {
    // Adding New Task
    [taskListTypes.CREATE_NEW_TASK]: () => {
      let list = state.list;
      list.push(action.payload);
      localStorage.setItem('taskList', JSON.stringify(state));
      return {
        ...state,
        list,
      };
    },
    // Update Task
    [taskListTypes.UPDATE_TASK_LIST_ITEM]: () => {
      const index = list.findIndex((item) => item.id === action.payload.id);
      list[index] = action.payload;
      localStorage.setItem('taskList', JSON.stringify(state));
      return {
        ...state,
        list,
      };
    },
    // Reset Task List
    [taskListTypes.DELETE_ALL_STATE]: () => {
      state = taskListInitialState;
      return state;
    },
    // Delete Task
    [taskListTypes.DELETE_TASK]: () => {
      let list = state.list;
      list = list.filter((listItem) => listItem.id !== action.payload.id);
      localStorage.setItem('taskList', JSON.stringify({ ...state, list }));
      return {
        ...state,
        list,
      };
    },
    // Search Change
    [taskListTypes.UPDATE_FILTER_SEARCH]: () => {
      let newFilters = Object.assign({}, filters);
      newFilters.search = action.payload;
      return {
        ...state,
        filters: newFilters,
      };
    },
  };
  return actionTypes[type] ? actionTypes[type]() : state;
};
