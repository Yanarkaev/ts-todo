import React, { useEffect } from "react";
import { completeTodo, deleteTodo } from "../features/todoSlice";
import useWindowDimensions, { useAppDispatch } from "./../hook";
import { motion } from "framer-motion";
import s from "./todo.module.scss";
import { ReactComponent as CheckIcon } from "../assets/approve.svg";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0, translateX: 400 };
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0,
    },
  },
};

const Todo: React.FC<TodoItemProps> = React.memo(({ id, text, completed }) => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const handleComplete = () => {
    dispatch(completeTodo(id));
  };

  const handleDelete = (info: any) => {
    if (width > 1000 && info.point.x > 600) {
      console.log(info);
      dispatch(deleteTodo(id));
    }

    if (width < 1000 && info.point.x > 200) {
      console.log(info);
      dispatch(deleteTodo(id));
    }
  };

  useEffect(() => () => console.log("unmounted"))

 return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={MESSAGE_DELETE_ANIMATION}
      transition={MESSAGE_DELETE_TRANSITION}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => handleDelete(info)}
        className={`${s.todoItem} ${completed ? s.completed : ""}`}
      >
        <CheckIcon
          className={`${s.checkIcon} ${completed ? s.checked : ""}`}
          onClick={handleComplete}
        />

        <p className={`${s.text} ${completed ? s.completedText : ""}`}>
          {text}
        </p>

        <div className={s.menu}>
          <div className={s.edit}></div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default Todo;
