import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'
import { toast } from "react-toastify";

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
}

const Todo = ({todo, toggleComplete, deleteTodo}) => {
    return(
        <li className={todo.completed ? style.liComplete : style.li}>
            <div className={style.row}>
            <input
            onChange={() => {
                toggleComplete(todo);
                if (todo.completed) {
                toast.info("Quay lại tiếp tục làm rồi hở?");
                } else {
                toast.info("Chắc là xong thật chưa?");
                }
            }}
            type="checkbox"
            checked={todo.completed ? 'checked' : ''}
            />
            <p onClick={() => {toggleComplete(todo); 
                if (todo.completed) {
                    toast.info("Quay lại tiếp tục làm rồi hở?");
                } else {
                    toast.info("Chắc là xong thật chưa?");
                }}} 
            className={todo.completed ? style.textComplete : style.text}>
                {todo.text}
            </p>
            </div>
            <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
        </li>
    )
}

export default Todo