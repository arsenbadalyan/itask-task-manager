export const initTaskList = {};

export function taskListReducer(state = {}, action) {
  if (action.type === "new-list") {
    return action.payload;
  }
  return state;
}

export const taskList_GET = (state) => {
  return state.taskList;
};

export const taskList_SET = (newList) => {
  return {
    type: "new-list",
    payload: newList,
  };
};
