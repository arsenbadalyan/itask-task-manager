import taskListTypes from '../types/taskListTypes';
const initialTaskListState = {
  mainNames: [
    { name: 'name', type: 'text-input', plHolder: 'Name' },
    { name: 'Description', type: 'text-input', plHolder: 'Description' },
    {
      name: 'place-to-do',
      type: 'select-option',
      plHolder: 'Place To Do This Task',
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
      place: 'in street',
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
  };
  return actionTypes[type] ? actionTypes[type]() : state;
};