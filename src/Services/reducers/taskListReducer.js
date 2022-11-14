import { tempList } from '../../config/Constants';
import taskListTypes from '../types/taskListTypes';

// Work With Data
const inputTypes = {
  TEXT: 'text-input',
  SELECT: 'select-option',
};
export const taskToDoList = [
  { value: 'work', name: 'Work' },
  { value: 'home', name: 'Home' },
  { value: 'street', name: 'In Street' },
];
export const taskStateList = [
  { value: 'create', name: 'Created', color: 'rgb(84,84,232)' },
  { value: 'progress', name: 'In Progress', color: 'rgb(255,132,1)' },
  { value: 'finish', name: 'Finished', color: 'rgb(50,174,14)' },
];
export const listItemTypes = {
  ID: 'id',
  NAME: 'name',
  DESC: 'desc',
  PLACE: 'place',
  FINISH_STATUS: 'finishStatus',
  FINISH_DATE: 'finishDate',
};

// Creating Data
const createSelectOptionData = (
  name,
  selectHeaderName,
  list,
  { edit, create }
) => ({
  name,
  type: inputTypes.SELECT,
  defValue: list[0],
  options: {
    defaultValue: {
      value: 'default',
      name: selectHeaderName,
    },
    list,
  },
  edit,
  create,
});
export const createListItem = (id) => {
  return {
    [listItemTypes.ID]: id,
    [listItemTypes.NAME]: '',
    [listItemTypes.DESC]: '',
    [listItemTypes.PLACE]: taskToDoList[0],
    [listItemTypes.FINISH_STATUS]: taskStateList[0],
    [listItemTypes.FINISH_DATE]: new Date(),
  };
};

// Initialize Data
const initialTaskListState = {
  mainTaskInfo: [
    {
      name: listItemTypes.NAME,
      type: inputTypes.TEXT,
      plHolder: 'Name',
      defValue: '',
      edit: true,
      create: true,
    },
    {
      name: listItemTypes.DESC,
      type: inputTypes.TEXT,
      plHolder: 'Description',
      defValue: '',
      edit: true,
      create: true,
    },
    createSelectOptionData(
      listItemTypes.PLACE,
      'Select where you would do Task',
      taskToDoList,
      { edit: true, create: true }
    ),
    createSelectOptionData(
      listItemTypes.FINISH_STATUS,
      'Please select state of this task',
      taskStateList,
      { edit: true, create: false }
    ),
  ],
  list: tempList,
};

// Reducers
export const taskListReducer = (state = initialTaskListState, action) => {
  const type = action.type ?? '';
  let list = state.list;
  const actionTypes = {
    [taskListTypes.UPDATE_ALL_STATE]: () => {
      console.log('UPDATING');
      return state;
    },
    [taskListTypes.DELETE_ALL_STATE]: () => {
      console.log('DELETING...');
      return state;
    },
    [taskListTypes.UPDATE_TASK_FINISH_STATUS]: () => {
      let list = state.list;
      list = list.map((listItem) => {
        if (listItem.id === action.payload.id) {
          listItem.finishStatus = action.payload.status;
          listItem.finishDate = new Date();
        }
        return listItem;
      });
      return {
        ...state,
        list,
      };
    },
    [taskListTypes.DELETE_TASK_FINISH_STATUS]: () => {
      let list = state.list;
      list = list.filter((listItem) => listItem.id !== action.payload.id);
      return {
        ...state,
        list,
      };
    },
    // Adding New Task
    [taskListTypes.CREATE_NEW_TASK]: () => {
      let list = state.list;
      list.push(action.payload);
      return {
        ...state,
        list,
      };
    },
    // Update Task
    [taskListTypes.UPDATE_TASK_LIST_ITEM]: () => {
      const index = list.findIndex((item) => item.id === action.payload.id);
      list[index] = action.payload;
      return {
        ...state,
        list,
      };
    },
  };
  return actionTypes[type] ? actionTypes[type]() : state;
};
