import { useEffect, useMemo, useRef, useState } from "react";

import {
  USER_KEY,
  THEME_KEY
} from "./data/constants";

import {
  storageKey,
  readTasks
} from "./utalis/storage";

import { Login } from "./Pages/Login";
import { Register } from "./Pages/Registration";

import { Sidebar } from "./components/Layouts/Sidebar";
import { Topbar } from "./components/Layouts/Topbar";

import { WelcomeSection } from "./components/Deshboard/WelcomeSection";
import { StatsGrid } from "./components/Deshboard/StatsGrid";

import { TaskFilters } from "./components/Tasks/TaskFilter";
import { TaskCard } from "./components/Tasks/TaskCard";
import { EmptyState } from "./components/Tasks/EmptyState";
import { TaskModal } from "./components/Tasks/TaskModel";
import { Calendar } from "./components/Calendar/Calendar";


function Dashboard({ user, onLogout }) {

  // ==============================
  // STATE
  // ==============================

  const [tasks, setTasks] = useState(
    () => readTasks(user.email)
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );

  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Used for drag and drop
  const dragId = useRef(null);


  // ==============================
  // LOCAL STORAGE
  // ==============================

  useEffect(() => {

    localStorage.setItem(
      storageKey(user.email),
      JSON.stringify(tasks)
    );

  }, [tasks, user.email]);


  // ==============================
  // THEME
  // ==============================

  useEffect(() => {

    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
      THEME_KEY,
      theme
    );

  }, [theme]);


  // ==============================
  // REMINDERS
  // ==============================

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

          if (Notification.permission === "granted") {

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
            oldTasks.map((currentTask) =>
              currentTask.id === task.id
                ? {
                    ...currentTask,
                    notified: true
                  }
                : currentTask
            )
          );

        }

      });

    }, 30000);


    return () => clearInterval(timer);

  }, [tasks]);


  // ==============================
  // STATISTICS
  // ==============================

  const stats = useMemo(() => {

    return {

      total: tasks.length,

      completed:
        tasks.filter(
          (task) => task.completed
        ).length,

      pending:
        tasks.filter(
          (task) => !task.completed
        ).length,

      high:
        tasks.filter(
          (task) =>
            !task.completed &&
            task.priority === "High"
        ).length

    };

  }, [tasks]);


  // ==============================
  // FILTER TASKS
  // ==============================

  const formatSelectedDate = (date) => {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  };
  
  const visible = useMemo(() => {

  const selectedDateString = formatSelectedDate(selectedDate);

  const hasSearch = search.trim() !== "";

  return tasks.filter((task) => {

    // ==========================
    // SEARCH
    // ==========================

    const text = `${task.title} ${task.description || ""}`.toLowerCase();

    const searchMatch = text.includes(
      search.trim().toLowerCase()
    );


    // ==========================
    // STATUS
    // ==========================

    const statusMatch =
      status === "All" ||
      (status === "Completed"
        ? task.completed
        : !task.completed);


    // ==========================
    // CATEGORY
    // ==========================

    const categoryMatch =
      category === "All" ||
      task.category === category;


    // ==========================
    // PRIORITY
    // ==========================

    const priorityMatch =
      priority === "All" ||
      task.priority === priority;


    // ==========================
    // CALENDAR DATE
    // ==========================

    const dateMatch =
      task.dueDate === selectedDateString;


    // ==========================
    // FINAL FILTER
    // ==========================

    if (hasSearch) {
      return (
        searchMatch &&
        statusMatch &&
        categoryMatch &&
        priorityMatch
      );
    }

    return (
      statusMatch &&
      categoryMatch &&
      priorityMatch &&
      dateMatch
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


  // ==============================
  // SAVE / ADD / EDIT TASK
  // ==============================

  const saveTask = (data) => {

    setTasks((oldTasks) => {

      // EDIT
      if (data.id) {

        return oldTasks.map((task) =>
          task.id === data.id
            ? {
              ...task,
              ...data,
              createdAt: task.createdAt,
              completedAt: task.completedAt || null
            }
            : task
         );

      }


      // ADD NEW TASK
      const newTask = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: Date.now(),
        completedAt: null,
        notified: false

      };


      return [
        newTask,
        ...oldTasks
      ];

    });


    // Close modal
    setModal(null);

  };


  // ==============================
  // TOGGLE COMPLETE
  // ==============================

  const toggleTask = (id) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const isCompleting = !task.completed;

        return {
          ...task,
          completed: isCompleting,
          completedAt: isCompleting ? Date.now() : null,
        };
      })
    );
  };


  // ==============================
  // DELETE TASK
  // ==============================

  const deleteTask = (id) => {

    setTasks((oldTasks) =>
      oldTasks.filter(
        (task) => task.id !== id
      )
    );

  };


  // ==============================
  // EDIT TASK
  // ==============================

  const editTask = (task) => {

    setModal({
      type: "edit",
      task: task
    });

  };


  // ==============================
  // ADD TASK
  // ==============================

  const addTask = () => {

    setModal({
      type: "add"
    });

  };


  // ==============================
  // NOTIFICATIONS
  // ==============================

  const requestNotifications = async () => {

    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("FocusFlow", {
        body: "Notifications are already enabled!"
      });

      return;
    }

    if (Notification.permission === "denied") {
      alert(
        "Notifications are blocked. Please allow notifications from your browser site settings."
      );

      return;
    }

    const permission =
      await Notification.requestPermission();


    if (permission === "granted") {

      new Notification("FocusFlow", {
        body: "Notifications enabled successfully!"
      });

    } else {

      alert("Notification permission was not granted.");

    }

  };


  // ==============================
  // DRAG AND DROP
  // ==============================

  const drop = (targetId) => {

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

    next.splice(
      to,
      0,
      moved
    );


    setTasks(next);

  };


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="app-shell">


      {/* ==========================
          SIDEBAR
      ========================== */}

      <Sidebar

        user={user}

        stats={stats}

        setStatus={setStatus}

        onLogout={onLogout}

      />


      {/* ==========================
          DASHBOARD
      ========================== */}

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


          {/* Welcome */}

          <WelcomeSection

            user={user}

            onAddTask={addTask}

          />


          {/* Statistics */}

          <StatsGrid
            stats={stats}
          />

          <Calendar tasks={tasks} 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          


          {/* ======================
              TASK SECTION
          ====================== */}

          <section className="tasks-section">


            {/* Filters */}

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


            {/* ====================
                TASK LIST
            ==================== */}

            <div className="task-list">


              {visible.length > 0 ? (

                visible.map((task) => (

                  <TaskCard

                    key={task.id}

                    task={task}

                    onToggle={
                      toggleTask
                    }

                    onEdit={
                      editTask
                    }

                    onDelete={
                      deleteTask
                    }

                    onDragStart={(id) => {
                      dragId.current = id;
                    }}

                    onDrop={
                      drop
                    }

                  />

                ))

              ) : (

                <EmptyState

                  filtered={
                    !!(
                      search ||
                      status !== "All" ||
                      category !== "All" ||
                      priority !== "All"
                    )
                  }

                  onAdd={
                    addTask
                  }

                />

              )}


            </div>


          </section>


        </section>


      </main>


      {/* ==========================
          TASK MODAL
      ========================== */}

      {modal && (

        <TaskModal

          task={
            modal.task
          }

          onClose={() =>
            setModal(null)
          }

          onSave={
            saveTask
          }

        />

      )}


    </div>

  );

}



// ==============================
// APP
// ==============================

export default function App() {

  const handleRegister = () => {
    setShowRegister(false);
  };

  const [user, setUser] = useState(() => {

    try {

      return JSON.parse(
        localStorage.getItem(USER_KEY)
      );

    } catch {

      return null;

    }
    

  });

  const [showRegister, setShowRegister] = useState(false);


  // LOGIN

  const login = (data) => {

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(data)
    );

    setUser(data);

  };


  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      USER_KEY
    );

    setUser(null);

  };


  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={logout}
      />
    );
  }


  if (showRegister) {
    return (
      <Register
        onRegister={handleRegister}
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }


  return (
    <Login
      onLogin={login}
      onRegister={() => setShowRegister(true)}
    />
  )
}

