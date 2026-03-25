// import { useEffect, useState } from "react";
// import API from "../services/api";
// import TaskCard from "../components/TaskCard";
// import TaskForm from "../components/TaskForm";
// import StatsCard from "../components/StatsCard";
// import Charts from "../components/Charts";
// import FilterBar from "../components/FilterBar";

// export default function Home() {
//   const [tasks, setTasks] = useState([]);
//   const [stats, setStats] = useState(null);

//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//     priority: "",
//     sort: "",
//   });

//   const [isFiltering, setIsFiltering] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     priority: "Low",
//   });

//   const fetchTasks = async (useFilter = false) => {
//     const clean = {};

//     if (filters.search) clean.search = filters.search;
//     if (filters.status) clean.status = filters.status;
//     if (filters.priority) clean.priority = filters.priority;
//     if (filters.sort) clean.sort = filters.sort;

//     const res = await API.get("/tasks", { params: clean });
//     setTasks(res.data);

//     setIsFiltering(useFilter && Object.keys(clean).length > 0);
//   };

//   const fetchStats = async () => {
//     const res = await API.get("/tasks/stats");
//     setStats(res.data);
//   };

//   useEffect(() => {
//     fetchTasks();
//     fetchStats();
//   }, []);

//   const applyFilters = () => {
//     fetchTasks(true);
//   };

//   const clearFilters = () => {
//     setFilters({ search: "", status: "", priority: "", sort: "" });
//     fetchTasks(false);
//     setIsFiltering(false);
//   };

//   const createTask = async (e) => {
//     e.preventDefault();
//     await API.post("/tasks", form);

//     setForm({
//       title: "",
//       description: "",
//       dueDate: "",
//       priority: "Low",
//     });

//     fetchTasks();
//     fetchStats();
//   };

//   const deleteTask = async (id) => {
//     await API.delete(`/tasks/${id}`);
//     fetchTasks();
//     fetchStats();
//   };

//   const markDone = async (id) => {
//     await API.put(`/tasks/${id}`, { status: "Done" });
//     fetchTasks();
//     fetchStats();
//   };

//   return (
//     <div className="container">

      
//       <FilterBar
//         filters={filters}
//         setFilters={setFilters}
//         applyFilters={applyFilters}
//         clearFilters={clearFilters}
//       />

 
//       {!isFiltering && (
//         <>
//           {stats && <StatsCard stats={stats} />}
//           {stats && <Charts stats={stats} />}

//           <TaskForm
//             form={form}
//             setForm={setForm}
//             createTask={createTask}
//           />
//         </>
//       )}

    
//       <h3 style={{ marginTop: "10px" }}>
//         {isFiltering ? "Filtered Results" : "All Tasks"} ({tasks.length})
//       </h3>

//       {tasks.length === 0 ? (
//         <p>No tasks found</p>
//       ) : (
//         tasks.map((t) => (
//           <TaskCard
//             key={t._id}
//             task={t}
//             deleteTask={deleteTask}
//             markDone={markDone}
//           />
//         ))
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import StatsCard from "../components/StatsCard";
import Charts from "../components/Charts";
import FilterBar from "../components/FilterBar";
import EditTaskModal from "../components/EditTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sort: "",
  });

  const [isFiltering, setIsFiltering] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });


  const fetchTasks = async (useFilter = false) => {
    try {
      const clean = {};

      if (filters.search) clean.search = filters.search;
      if (filters.status) clean.status = filters.status;
      if (filters.priority) clean.priority = filters.priority;
      if (filters.sort) clean.sort = filters.sort;

      const res = await API.get("/tasks", { params: clean });

      setTasks(res.data);

      setIsFiltering(useFilter && Object.keys(clean).length > 0);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);
R
  const applyFilters = () => {
    fetchTasks(true);
  };


  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      sort: "",
    });
    fetchTasks(false);
    setIsFiltering(false);
  };


  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", form);

      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
      });

      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };


  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };


  const markDone = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "Done" });
      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">


      <FilterBar
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {!isFiltering && (
        <>
          {stats && <StatsCard stats={stats} />}
          {stats && <Charts stats={stats} />}

          <TaskForm
            form={form}
            setForm={setForm}
            createTask={createTask}
          />
        </>
      )}

 
      <h3 style={{ marginTop: "10px" }}>
        {isFiltering ? "Filtered Results" : "All Tasks"} ({tasks.length})
      </h3>


      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <TaskCard
            key={t._id}
            task={t}
            deleteTask={deleteTask}
            markDone={markDone}
            setEditTask={setEditTask} 
          />
        ))
      )}

      
      {editTask && (
        <EditTaskModal
          task={editTask}
          close={() => setEditTask(null)}
          refresh={() => {
            fetchTasks();
            fetchStats();
          }}
        />
      )}
    </div>
  );
}