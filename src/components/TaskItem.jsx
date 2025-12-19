import { Check, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Input from "./ui/Input";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState({ value: task.title, isEdit: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const completed = task.completed
    ? "bg-success border-success"
    : "border-muted-foreground/30 hover:border-primary";

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onEdit(task, editing.value);
      setEditing({ value: task.title, isEdit: false });
    }
  };

  const handleEdit = () => {
    setEditing((prevIsEdit) => ({
      ...prevIsEdit,
      isEdit: !prevIsEdit.isEdit,
    }));
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <li
      className={`${
        isDeleting && "scale-50 opacity-0"
      } group flex gap-4 justify-between items-center bg-card border border-border/50 p-5 mb-4 rounded-xl hover:shadow-soft animate-fade-in-up transition duration-300`}
    >
      {editing.isEdit ? (
        <div className="flex-1">
            <Input
              value={editing.value}
              setValue={(e) => setEditing({ value: e.target.value, isEdit: true })}
              onEnter={handleEnter}
              id={"editTask"}
            />
        </div>
      ) : (
        <div
          className={`flex gap-4 ${task.completed && "opacity-50"}`}
          onClick={() => onToggle(task)}
        >
          <button
            type="radio"
            className={`${completed} shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center border-muted-foreground/30 hover:border-primary`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>

          <p
            className={`${
              task.completed && "line-through text-muted-foreground"
            } flex-1  transition-all duration-200 `}
          >
            {task.title}
          </p>
        </div>
      )}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 text-muted-foreground cursor-pointer transition-all duration-300">
        <div
          className="hover:bg-primary/50 hover:text-primary p-2 rounded-lg"
          onClick={handleEdit}
        >
          <SquarePen className="w-5 h-5" />
        </div>
        <div
          className="hover:bg-primary/50 hover:text-primary p-2 rounded-lg"
          onClick={handleDelete}
        >
          <Trash2 className="w-5 h-5" />
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
