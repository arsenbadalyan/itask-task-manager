import { createStore, combineReducers } from "redux";
import { initTaskList, taskListReducer } from "../feature/taskListReducer";

const store = createStore(
  combineReducers({
    taskList: taskListReducer,
  }),
  {
    taskList: initTaskList,
  }
);

export default store;
