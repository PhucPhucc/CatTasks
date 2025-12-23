import React, { useMemo, useState } from "react";
import EmptyTasks from "./EmptyTasks";
import TaskItem from "./TaskItem";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const TasksList = ({ tasks }) => {
  const [tagFilter, setTagFilter] = useState("all");

  const cssButtonActive = "bg-card shadow-soft";

  const switchFilter = useMemo(() => {
    // tag: all, completed, pending
    if (tagFilter === "all") {
      return tasks;
    }

    if (tagFilter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    if (tagFilter === "completed") {
      return tasks.filter((task) => task.completed);
    }
  }, [tasks, tagFilter]);

  const filterCounts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  return (
    <>
      <div className="flex justify-between mb-4">
        <p className="font-display text-foreground font-bold text-xl">
          Your Tasks
        </p>
        <div className="flex items-center gap-1 p-2 bg-muted rounded-lg text-sm">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setTagFilter(filter.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md 
                transition-all duration-200 text-foreground
                ${tagFilter === filter.value && cssButtonActive}`}
            >
              {filter.label} <span>({filterCounts[filter.value]})</span>
            </button>
          ))}
        </div>
      </div>
      {tasks.length === 0 ? (
        <EmptyTasks />
      ) : (
        <ul>
          {switchFilter.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TasksList;
