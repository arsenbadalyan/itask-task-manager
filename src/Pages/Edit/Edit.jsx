// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { taskListAction } from '../../services/actions/taskListAction';
// import { createListItem } from '../../services/reducers/taskListReducer';
// import taskListTypes from '../../services/types/taskListTypes';
// import TaskInput from '../../components/Input/TaskInput';
// import SelectOption from '../../components/Select/SelectOption';

// const Edit = () => {
//   const taskList = useSelector(taskListAction[taskListTypes.READ_ALL_STATE]);
//   const mainTaskInfo = taskList.mainTaskInfo;
//   let task = {};

//   if (state.pageState === 'edit') {
//     task = state.task;
//     console.log(task);
//   } else {
//     task = createListItem();
//   }
//   const handleSaveChanges = (e) => {
//     e.preventDefault();
//     console.log('Changes are saved');
//   };
//   const handleSave = (e) => {
//     e.preventDefault();
//     console.log('Create');
//   };
//   return (
//     <div className="p-10">
//       <h1 className="font-bold text-2xl text-center cursor-default bg-sec-color text-white shadow-[0_0_10px_0_black] py-1 mb-3">
//         {pageStateHeaders[state.pageState]}
//       </h1>
//       <div className="form">
//         <form action="" className="flex flex-col gap-3">
//           {mainTaskInfo.map((info, index) => {
//             if (info.type === 'text-input') {
//               return (
//                 <TaskInput
//                   key={index}
//                   info={{
//                     value: task[info.name],
//                     type: 'text',
//                   }}
//                   options={{ placeholder: info.plHolder }}
//                 />
//               );
//             } else if (info.type === 'select-option') {
//               return (
//                 <SelectOption
//                   key={index}
//                   name={info.name}
//                   list={info.options.list}
//                   allOptions={info.options}
//                 />
//               );
//             }
//             return null;
//           })}
//           <input
//             type="submit"
//             className="m-auto bg-primary-color text-xl font-bold text-white rounded-xl py-2 px-4 shadow-[0_0_10px_0_black] cursor-pointer hover:bg-white hover:text-primary-color"
//             value={state.pageState === 'edit' ? 'Save Changes' : 'Save'}
//             onClick={
//               state.pageState === 'edit' ? handleSaveChanges : handleSave
//             }
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Edit;
