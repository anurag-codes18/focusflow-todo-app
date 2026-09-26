import {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";

import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { StatsGrid } from "../components/dashboard/StatsGrid";

import { TaskFilters } from "../components/tasks/TaskFilters";
import { TaskList } from "../components/tasks/TaskList";
import { TaskModal } from "../components/tasks/TaskModal";
import { Calendar } from "./components/Calendar/Calendar";

import {
  THEME_KEY
} from "../data/constants";

import {
  readTasks,
  storageKey
} from "../utils/storage";

export function Dashboard({ user, onLogout }) {


  const [selectedDate, setSelectedDate] = useState(new Date());

    

  const [tasks, setTasks] = useState(
    () => readTasks(user.email)
  );

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem(THEME_KEY) ||
      "light"
  );

  const [modal, setModal] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");

  const dragId = useRef(null);


  // ============================
  // LOCAL STORAGE
  // ============================

  useEffect(() => {

    localStorage.setItem(
      storageKey(user.email),
      JSON.stringify(tasks)
    );

  }, [tasks, user.email]);


  // ============================
  // THEME
  // ============================

  useEffect(() => {

    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      THEME_KEY,
      theme
    );

  }, [theme]);


  // ============================
  // NOTIFICATIONS
  // ============================

  useEffect(() => {

    const timer = setInterval(() => {

      const now = Date.now();

      tasks.forEach((task) => {

        if (
          task.reminderAt &&
          !task.notified &&
          !task.completed &&
          new Date(task.reminderAt).getTime() <= now
        ) {

          if (
            Notification.permission === "granted"
          ) {

            new Notification(
              `FocusFlow: ${task.title}`,
              {
                body:
                  task.description ||
                  "Your task reminder is due."
              }
            );

          }

          setTasks((oldTasks) =>
            oldTasks.map((item) =>
              item.id === task.id
                ? {
                    ...item,
                    notified: true
                  }
                : item
            )
          );
        }

      });

    }, 30000);

    return () => clearInterval(timer);

  }, [tasks]);


  // ============================
  // STATISTICS
  // ============================

  const stats = useMemo(() => {

    return {

      total: tasks.length,

      completed: tasks.filter(
        (task) => task.completed
      ).length,

      pending: tasks.filter(
        (task) => !task.completed
      ).length,

      high: tasks.filter(
        (task) =>
          !task.completed &&
          task.priority === "High"
      ).length

    };

  }, [tasks]);

    const formatSelectedDate = (date) => {

        const year = date.getFullYear();

        const month = String(
           date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


  // ============================
  // FILTER TASKS
  // ============================
const visible = useMemo(() => {

  const selectedDateString =
    formatSelectedDate(selectedDate);

  const searchText =
    search.trim().toLowerCase();

  const hasSearch =
    searchText !== "";

  return tasks.filter((task) => {

    // SEARCH
    const text =
      `${task.title} ${task.description || ""}`
        .toLowerCase();

    const searchMatch =
      text.includes(searchText);


    // STATUS
    const statusMatch =
      status === "All" ||
      (
        status === "Completed"
          ? task.completed
          : !task.completed
      );


    // CATEGORY
    const categoryMatch =
      category === "All" ||
      task.category === category;


    // PRIORITY
    const priorityMatch =
      priority === "All" ||
      task.priority === priority;


    // CALENDAR DATE
    const dateMatch =
      task.dueDate === selectedDateString;


    // FINAL FILTER
    return (
      searchMatch &&
      statusMatch &&
      categoryMatch &&
      priorityMatch &&
      (hasSearch || dateMatch)
    );

  });

}, [
  tasks,
  search,
  status,
  category,
  priority,
  selectedDate
]);

  // ============================
  // ADD / EDIT TASK
  // ============================

  const saveTask = (data) => {

    setTasks((oldTasks) => {

      if (data.id) {

        return oldTasks.map((task) =>
          task.id === data.id
            ? data
            : task
        );

      }

      const newTask = {
        ...data,

        id: crypto.randomUUID(),

        completed: false,

        createdAt: Date.now(),

        notified: false
      };

      return [
        newTask,
        ...oldTasks
      ];

    });

    setModal(null);
  };


  // ============================
  // COMPLETE TASK
  // ============================

  const toggleTask = (id) => {

    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );

  };


  // ============================
  // DELETE TASK
  // ============================

  const deleteTask = (id) => {

    setTasks((oldTasks) =>
      oldTasks.filter(
        (task) => task.id !== id
      )
    );

  };


  // ============================
  // NOTIFICATION PERMISSION
  // ============================

  const requestNotifications = async () => {

    if ("Notification" in window) {
      await Notification.requestPermission();
    }

  };


  // ============================
  // DRAG AND DROP
  // ============================

  const dropTask = (targetId) => {

    const from = tasks.findIndex(
      (task) =>
        task.id === dragId.current
    );

    const to = tasks.findIndex(
      (task) =>
        task.id === targetId
    );

    if (from < 0 || to < 0) {
      return;
    }

    const next = [...tasks];

    const [moved] =
      next.splice(from, 1);

    next.splice(to, 0, moved);

    setTasks(next);
  };


  const isFiltered =
    !!(
      search ||
      status !== "All" ||
      category !== "All" ||
      priority !== "All"
  );

  return (

    <div className="app-shell">

      <h1 style={{ color: "red", fontSize: "40px" }}>
        TEST DASHBOARD
      </h1>

      <Sidebar
        user={user}
        stats={stats}
        setStatus={setStatus}
        onLogout={onLogout}
      />


      <main className="dashboard">

        <Topbar
          user={user}
          theme={theme}
          setTheme={setTheme}
          requestNotifications={
            requestNotifications
          }
        />


        <section className="content">

          <WelcomeSection
            user={user}
            onAddTask={() =>
              setModal({
                type: "add"
              })
            }
          />


          <StatsGrid
            stats={stats}
          />

          <Calendar
            tasks={tasks}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <section className="tasks-section">

            <div className="section-head">

              <div>
                <h2>My tasks</h2>

                <p>
                  {visible.length} task
                  {visible.length !== 1
                    ? "s"
                    : ""}{" "}
                  shown · drag cards to reorder
                </p>
              </div>

            </div>


            <TaskFilters
              search={search}
              setSearch={setSearch}

              status={status}
              setStatus={setStatus}

              category={category}
              setCategory={setCategory}

              priority={priority}
              setPriority={setPriority}
            />


            <TaskList
              tasks={visible}

              filtered={isFiltered}

              onToggle={toggleTask}

              onEdit={(task) =>
                setModal({
                  type: "edit",
                  task
                })
              }

              onDelete={deleteTask}

              onDragStart={(id) =>
                dragId.current = id
              }

              onDrop={dropTask}

              onAdd={() =>
                setModal({
                  type: "add"
                })
              }
            />

          </section>

        </section>

      </main>


      {modal && (

        <TaskModal

          task={modal.task}

          onClose={() =>
            setModal(null)
          }

          onSave={saveTask}

        />

      )}

    </div>
  );
}