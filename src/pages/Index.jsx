import React, { useEffect, useState } from "react";
import { Sprout, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import Wrapper from "../components/Wrapper";
import TaskStats from "../components/TaskStats";
import AddTask from "../components/AddTask";
import TaskItem from "../components/TaskItem";
import { toast } from "sonner";
import EmptyTasks from "../components/EmptyTasks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authStore";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const Index = () => {
  const [tasks, setTasks] = useState([
    // {
    //   id: "1",
    //   title: "Plan the week ahead",
    //   completed: true,
    //   createdAt: new Date(),
    // },
    // {
    //   id: "2",
    //   title: "Review project goals",
    //   completed: false,
    //   createdAt: new Date(),
    // },
    // {
    //   id: "3",
    //   title: "Water the plants 🌱",
    //   completed: false,
    //   createdAt: new Date(),
    // },
  ]);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return; // Nếu chưa login thì không query

    const q = query(
      collection(db, "todos"),
      where("uid", "==", user.uid), // Chỉ lấy task của user hiện tại
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleAdd = async (value) => {
    if (value === "" || !user) return;
    await addDoc(collection(db, "todos"), {
      title: value,
      completed: false,
      timestamp: new Date(),
      uid: user.uid,
    });

    toast.success("Your task add successfull");
  };

  const handleEdit = async (task, value) => {
    await updateDoc(doc(db, 'todos', task.id), { title: value})
    toast.success("Your task edit successfull");
  };

  const handleToggle = async (task) => {
    await updateDoc(doc(db, "todos", task.id), { completed: !task.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
    toast.info("Your task edit successfull");
  };

  const handleLogOut = async (isLogin) => {
    if (isLogin) {
      await signOut(auth);
      dispatch(logout());
      toast.info("You log out success");
    }
  };
  return (
    <Wrapper>
      <header className="sticky top-0 z-10 backdrop-blur-sm ">
        <div className="max-w-4xl mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="size-12  rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
              <Sprout className="size-6 text-primary-foreground" />
            </div>
            <h1 className="font-display font-semibold text-xl">CatTasks</h1>
          </div>

          <Link
            to="/login"
            className="rounded-3xl border-2 py-2 px-6  hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-200"
            onClick={() => handleLogOut(user !== null)}
          >
            <Button className="flex items-center gap-2">
              {user ? (
                <>
                  <LogOut className="size-4" />
                  Log out
                </>
              ) : (
                <>
                  <LogIn className="size-4" />
                  Login
                </>
              )}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6">
        <section className="text-center">
          <p className="font-bold font-display text-foreground text-5xl mb-4">
            Cultivate your <span className="text-primary">productivity</span>
          </p>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A warm, friendly space to nurture your tasks and watch your
            accomplishments grow.
          </p>
        </section>

        <section
          className="my-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <TaskStats tasks={tasks} />
        </section>

        <section className="my-8 animate-fade-in">
          <AddTask onAdd={handleAdd} />
        </section>

        <section>
          <div>
            <div className="flex justify-between mb-4">
              <p className="font-display font-bold text-xl">Your Tasks</p>
              {tasks.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {tasks.filter((t) => !t.completed).length} remaining
                </span>
              )}
            </div>
            {tasks.length === 0 ? (
              <EmptyTasks />
            ) : (
              <ul className="">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default Index;
