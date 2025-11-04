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
background
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
      <>
       <section
      style={{
        background
      }} 
      className={styles.box}
      >
        <article className={styles.wrapper}>
          <h3>{task.body}</h3>
            {/* <p>Deadline: {new Date(task.deadline).toLocaleString()}</p> */}
            {task.status === 'active' && <button className={styles.buttonGr} onClick={() => taskDone(task.id)}>Done</button>}
            {task.status !== 'active' && <button className={styles.buttonGr} onClick={() => removeTask(task.id)}>Delete</button>}
        </article>
       <Timer task={task}/>
    </section>
        </>
    );
}

export default TaskDisplay;
