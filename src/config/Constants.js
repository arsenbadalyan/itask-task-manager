import {
  taskStateList,
  taskToDoList,
} from '../services/reducers/taskListReducer';

export const passwordCorrectLength = 3;
export const taskListHeaders = [
  'Name',
  'Description',
  'Place To Do',
  'Status',
  'Deadline',
  'Actions',
];
export const taskListWidth = [15, 33, 10, 5, 10, 7];
export const pageMaxLimit = 2;
export const tempList = [
  {
    id: 1,
    name: 'Test Task',
    desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. Then we check, if such a key exists - we execute the function, else - we just return the initial state. I personally like this approach. It looks elegant and easy to read.',
    place: { value: 'work', name: 'Work' },
    finishStatus: {
      value: 'progress',
      name: 'In Progress',
      color: 'rgb(255,132,1)',
    },
    finishDate: new Date(),
  },
  {
    id: 2,
    name: 'Test Task',
    desc: 'We’ve created actionTypes object, where a key is our action type and value is a function. ',
    finishStatus: {
      value: 'finish',
      name: 'Finished',
      color: 'rgb(50,174,14)',
    },
    place: { value: 'street', name: 'In Street' },
    finishDate: new Date(),
  },
  {
    id: 3,
    name: 'This is very long name for task',
    desc: 'Short desc',
    finishStatus: { value: 'create', name: 'Created', color: 'rgb(84,84,232)' },
    place: { value: 'home', name: 'Home' },
    finishDate: new Date(),
  },
];
