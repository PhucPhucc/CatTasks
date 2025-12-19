import { CheckCircle2, Circle, CloudCog, ListTodo } from "lucide-react";
import ProgressBar from "./ui/ProgressBar";

const TaskStats = ({ tasks }) => {
  const tasksLength = tasks.length;
  const completedTask = tasks.filter((task) => task.completed).length;
  const uncompletedTask = tasksLength - completedTask;
  const progress = tasksLength > 0 ? completedTask / tasksLength * 100 : 0
  return (
    <>
      <ul className="flex justify-center items-center gap-4">
        <StartCard
          value={tasksLength}
          label="Total"
          icon={<ListTodo className="w-5 h-5" />}
          color={"primary"}
        />

        <StartCard
          value={completedTask}
          label="Done"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color={"success"}
        />

        <StartCard
          value={uncompletedTask}
          label="Pending"
          icon={<Circle className="w-5 h-5" />}
          color={"accent"}
        />
      </ul>

      <ProgressBar progress={progress} />
    </>
  );
};

function StartCard({ value, icon, label, color }) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    accent: "text-accent-foreground bg-accent/30",
  };

  return (
    <li className="flex-1 p-4 flex items-center gap-4 bg-card rounded-xl border border-border">
      <div className={`p-2 rounded-xl ${colorClasses[color]}`}>{icon}</div>
      <div>
        <p className="font-display font-semibold text-2xl text-foreground">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </li>
  );
}

export default TaskStats;
