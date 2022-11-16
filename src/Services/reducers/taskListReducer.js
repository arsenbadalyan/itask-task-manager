import taskListTypes from '../types/taskListTypes';
import { v4 as uuid } from 'uuid';
import { getDateTimeLocal } from '../../utils/dateTime';

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
  name,
  create = false,
  edit = false,
  { asc = false, search = false },
  createEditField = {},
  defValue = '',
  list = null
) => ({ name, create, edit, asc, search, defValue, createEditField, list });

export const listItemTypes = {
  ID: createListItemType('id', false, false, { asc: false, search: false }),
  NAME: createListItemType(
    'name',
    true,
    true,
    { asc: true, search: true },
    {
      type: 'text',
      title: 'Enter Name',
      plHolder: 'Name',
    }
  ),
  DESC: createListItemType(
    'desc',
    true,
    true,
    { asc: false, search: true },
    {
      type: 'text-area',
      title: 'Enter Description',
      plHolder: 'Description',
    }
  ),
  PLACE: createListItemType(
    'place',
    true,
    true,
    { asc: false, search: true },
    {
      type: 'select',
      title: 'Select Place To Do That Task',
      plHolder: '',
    },
    taskPlaceList[0],
    taskPlaceList
  ),
  FINISH_STATUS: createListItemType(
    'finishStatus',
    false,
    true,
    { asc: false, search: true },
    {
      type: 'select',
      title: 'Select Task Status',
      plHolder: '',
    },
    taskStateList[0],
    taskStateList
  ),
  FINISH_DATE: createListItemType(
    'finishDate',
    true,
    true,
    { asc: false, search: false },
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
    ID: { asc: false, search: false },
    NAME: { asc: true, search: true },
    PLACE: { asc: false, search: true },
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
  };
  return actionTypes[type] ? actionTypes[type]() : state;
};
