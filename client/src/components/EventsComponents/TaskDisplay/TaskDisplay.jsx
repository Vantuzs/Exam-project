import React, {useEffect,useState} from 'react';
import Timer from './Timer';
import styles from './TaskDisplay.module.scss'


const TaskDisplay = ({task,taskDone,removeTask}) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
    if (task.status === "done") {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const startTime = new Date(task.createdAt).getTime();
      const deadline = new Date(task.deadline).getTime();

      if (now >= deadline && task.status !== "done") {
        setProgress(100);
        clearInterval(interval);
      } else {
        const percent = Math.min(
          ((now - startTime) / (deadline - startTime)) * 100,
          100
        );
        setProgress(percent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task]);

   let background = "";

  if (task.status === "done") {
    background = "green";
  } else if (progress >= 100) {
    background = "red";
  } else {
    background = `linear-gradient(to right, lightgreen ${progress}%, white 0)`;
  }

    return (
       <div
      style={{
        background
      }} 
      className={styles.box}
    >
      <h3>{task.body}</h3>
      <p>Deadline: {task.deadline}</p>
      {task.status === 'active' && <button onClick={() => taskDone(task.id)}>Закрыть</button>}
      <button onClick={() => removeTask(task.id)}>Delete</button>
      <Timer task={task}/>
    </div>
    );
}

export default TaskDisplay;
