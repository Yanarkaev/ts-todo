import React, { useState, useEffect, useRef } from "react";
import { addTodo } from "../features/todoSlice";
import { useAppSelector, useAppDispatch } from "../hook";
import uniqid from "uniqid";
import { AnimatePresence, MotionConfig } from "framer-motion";
import s from "./todoList.module.scss";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const filtres = [
    { name: "все", id: 1 },
    { name: "выполненные", id: 2 },
    { name: "в процессе", id: 3 },
  ];
  const [todoText, setTodoText] = useState<string>("");
  const [filterTodos, setFilterTodos] = useState<string>("все");

  const allTodos = useAppSelector((state) => state.todos.todos);
  const [todos, setTodos] = useState(allTodos);
  const [filterVisible, setFilterVisible] = useState(false);
  const dispatch = useAppDispatch();

  const btnRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleCloseFilter = (e: any) => {
      if (e.path[0] !== btnRef.current) {
        setFilterVisible(false);
      }
    };

    document.body.addEventListener("click", handleCloseFilter);
    return () => document.body.removeEventListener("click", handleCloseFilter);
  }, []);

  useEffect(() => {
    if (filterTodos === "все") {
      setTodos(allTodos);
    }

    if (filterTodos === "выполненные") {
      setTodos(allTodos.filter((el) => el.completed === true));
    }

    if (filterTodos === "в процессе") {
      setTodos(allTodos.filter((el) => el.completed === false));
    }
  }, [filterTodos, allTodos]);

  const handleFilter = (e: any, el: string) => {
    setFilterTodos(el);
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: uniqid(),
        text: todoText,
        completed: false,
        date: Date.now(),
      })
    );
    setTodoText("");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button disabled={todoText.trim() === ""} className={s.addBtn}>
            +
          </button>
        </form>
      </div>
      <div className={s.filterWrapper}>
        <span
          className={s.filter}
          onClick={() => setFilterVisible(!filterVisible)}
          ref={btnRef}
        >
          {filterTodos}
        </span>

        {filterVisible && (
          <ul className={s.filterList}>
            {filtres.map((el) => (
              <li
                key={el.id}
                className={`${s.filterItem} ${
                  filterTodos === el.name ? s.selected : ""
                }`}
                onClick={(e) => handleFilter(e, el.name)}
              >
                {el.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MotionConfig transition={{ duration: 0.3 }}>
        <AnimatePresence>
          {todos.length ? (
            todos.map((item: any) => <Todo key={item.id} {...item} />)
          ) : (
            <div className={s.empty}>Пусто</div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default TodoList;
