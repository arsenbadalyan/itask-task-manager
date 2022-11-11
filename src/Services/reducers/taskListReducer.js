import taskListTypes from '../types/taskListTypes';
const selectPlaceDefValue = {
  value: 'work',
  name: 'Work',
};
export const createListItem = (id) => {
  return {
    id,
    name: '',
    desc: '',
    finishStatus: new Date(),
    place: selectPlaceDefValue.value,
    finishDate: new Date(),
  };
};
const initialTaskListState = {
  mainTaskInfo: [
    { name: 'name', type: 'text-input', plHolder: 'Name', defValue: '' },
    { name: 'desc', type: 'text-input', plHolder: 'Description', defValue: '' },
    {
      name: 'place',
      type: 'select-option',
      plHolder: 'Place To Do This Task',
      defValue: selectPlaceDefValue.value,
      options: {
        selectedItem: {
          value: selectPlaceDefValue.value,
          name: selectPlaceDefValue.name,
        },
        defaultValue: {
          value: 'default',
          name: 'Select where you would do Task',
        },
        list: [
          selectPlaceDefValue,
          { value: 'home', name: 'Home' },
          { value: 'street', name: 'In Street' },
        ],
      },
    },
  ],
  list: [
    {
      id: 1,
      name: 'Test Task',
      desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. Then we check, if such a key exists - we execute the function, else - we just return the initial state. I personally like this approach. It looks elegant and easy to read.',
      finishStatus: false,
      place: 'work',
      finishDate: new Date(),
    },
    {
      id: 2,
      name: 'Test Task',
      desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. ',
      finishStatus: false,
      place: 'street',
      finishDate: new Date(),
    },
    {
      id: 3,
      name: 'This is very long name for task',
      desc: 'Short desc',
      finishStatus: true,
      place: 'home',
      finishDate: new Date(),
    },
  ],
};
export const taskListReducer = (state = initialTaskListState, action) => {
  const type = action.type ?? '';
  let list = state.list;
  // console.log(state);
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
