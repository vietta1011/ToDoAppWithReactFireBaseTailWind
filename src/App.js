import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow xl p-4`,
  heading: `text-2xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
  footer: `flex justify-center items-center text-[#e6f4f1] italic text-[25px] mt-7`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Nhập việc đã nàng");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
    toast.success("Làm sớm xong sớm nha");
    inputRef.current.focus();
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // UPdate todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    toast.success("Xong việc rồi giỏi quá");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createTodo(event);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Đống việc dang dở của Mai Linh</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Thêm việc cần làm vào đây i"
            onKeyDown={handleKeyDown}
          ></input>
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.filter((todo) => !todo.completed).length === 0 ? (
          <p className={style.count}>Hiện tại không có việc gì nè</p>
        ) : (
          <p className={style.count}>{`Bé còn ${
            todos.filter((todo) => !todo.completed).length
          } việc nữa á`}</p>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={style.footer}>
        <h1>Sản phẩm này thuộc về Việt nhưng Việt thuộc về Linh rồi</h1>
      </div>
    </div>
  );
}

export default App;
