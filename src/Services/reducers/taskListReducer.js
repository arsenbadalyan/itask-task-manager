import { tempList } from '../../config/Constants';
import taskListTypes from '../types/taskListTypes';
import { v4 as uuid } from 'uuid';
// Work With Data
const inputTypes = {
  TEXT: 'text-input',
  SELECT: 'select-option',
};
export const taskPlaceList = [
  { value: 'Work', name: 'work' },
  { value: 'Home', name: 'home' },
  { value: 'In Street', name: 'street' },
];
export const taskStateList = [
  { value: 'Create', name: 'created', color: 'rgb(84,84,232)' },
  { value: 'In Progress', name: 'progress', color: 'rgb(255,132,1)' },
  { value: 'Finished', name: 'finished', color: 'rgb(50,174,14)' },
];
// export const listItemTypes = {
//   ID: 'id',
//   NAME: 'name',
//   DESC: 'desc',
//   PLACE: 'place',
//   FINISH_STATUS: 'finishStatus',
//   FINISH_DATE: 'finishDate',
// };

const createListItemType = (
  name,
  create = false,
  edit = false,
  createEditField = {},
  defValue = '',
  list = null
) => ({ name, create, edit, defValue, createEditField, list });

export const listItemTypes = {
  ID: createListItemType('id'),
  NAME: createListItemType('name', true, true, {
    type: 'text',
    title: 'Enter Name',
    plHolder: 'Name',
  }),
  DESC: createListItemType('desc', true, true, {
    type: 'text-area',
    title: 'Enter Description',
    plHolder: 'Description',
  }),
  PLACE: createListItemType(
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
    'finishDate',
    true,
    false,
    {
      type: 'date',
      title: 'Choose finish date',
      plHolder: '',
    },
    new Date()
  ),
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
      taskPlaceList,
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
