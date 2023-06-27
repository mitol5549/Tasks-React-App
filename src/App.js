import { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = tasksObj => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    { url: 'https://tasks-react-app-a3407-default-rtdb.europe-west1.firebasedatabase.app/tasks.json' },
    transformTasks,
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </>
  );
}

export default App;
