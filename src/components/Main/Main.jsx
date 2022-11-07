import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { taskList_GET, taskList_SET } from "../../feature/taskListReducer";
import { useEffect } from "react";
import { getAllList } from "../../request";
export const Main = () => {
  const dispatch = useDispatch();
  let list = useSelector(taskList_GET);
  useEffect(() => {
    getAllList().then((res) => dispatch(taskList_SET(res)));
  }, []);
  return (
    <div>
      <div className="w-full text-2xl font-bold py-[5px] px-[10px] mb-4 bg-gray-400 rounded-2xl shadow-[0_0_10px_0_black] shadow-black cursor-pointer">
        <h1>Task List</h1>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {list.length ? (
          list.map((el) => {
            return (
              <div
                className="bg-gray-800 text-white rounded-xl py-2 px-2 font-bold flex justify-between hover:shadow-md hover:shadow-black cursor-pointer transition duration-500"
                key={el.id}
              >
                <div>
                  <p>{`${el.id}: ${el.name}`}</p>
                </div>
                <div className="flex flex-row items-center gap-2 transition duration-500">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer transition duration-500 hover:text-green-500"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="transition duration-500 cursor-pointer hover:text-red-600"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-2xl text-center">... Ohh Empty</div>
        )}
      </div>
      <div className="flex flex-row font-bold">
        <NavLink to="add">
          <FontAwesomeIcon icon={faPlus} /> Add Item
        </NavLink>
      </div>
    </div>
  );
};
