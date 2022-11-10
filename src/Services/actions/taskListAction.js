import taskListTypes from '../types/taskListTypes';
export const taskListAction = {
  // All State
  [taskListTypes.READ_ALL_STATE]: ({ taskList }) => {
    return taskList.list;
  },
  [taskListTypes.UPDATE_ALL_STATE]: (newState) => {
    return {
      type: taskListTypes.UPDATE_ALL_STATE,
      payload: newState,
    };
  },
  [taskListTypes.DELETE_ALL_STATE]: () => {
    return {
      type: taskListTypes.DELETE_ALL_STATE,
    };
  },
  // FINISH STATUS
  [taskListTypes.UPDATE_TASK_FINISH_STATUS]: (id, status) => {
    return {
      type: taskListTypes.UPDATE_TASK_FINISH_STATUS,
      payload: {
        id,
        status,
      },
    };
  },
  [taskListTypes.DELETE_TASK_FINISH_STATUS]: (id, status) => {
    return {
      type: taskListTypes.DELETE_TASK_FINISH_STATUS,
      payload: {
        id,
        status,
      },
    };
  },
};
