import { Plus } from "lucide-react";
import React, { useState } from "react";
import Input from "./ui/Input";

const AddTask = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const disable = value.trim()
    ? "bg-primary cursor-pointer hover:bg-primary/80"
    : "bg-primary/50";

  const handleAdd = () => {
    onAdd(value);
    setValue("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Input 
          value={value}
          setValue={(e) => setValue(e.target.value)}
          placeholder="What need to be done?"
          onEnter={handleEnter}
          id={'addTask'}
        />
      </div>
      <button
        type="button"
        className={`${disable}  text-primary-foreground inline-flex justify-center items-center gap-2 py-3 px-8 whitespace-nowrap rounded-2xl transition-colors duration-200`}
        disabled={!value.trim()}
        onClick={handleAdd}
      >
        <Plus className="w-5 h-5" />
        Add Tasks
      </button>
    </div>
  );
};

export default AddTask;
