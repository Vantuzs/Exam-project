import React, {useState,useRef,useEffect} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { createTaskValidateSchema } from './ValidateSchemas';
import { ToastContainer,toast } from 'react-toastify';
import CONSTANTS from '../../../constants'

import styles from './InputeField.module.scss'
import TaskDisplay from '../TaskDisplay/TaskDisplay'

const STORAGE_KEY = "tasksWithReminders";

const initialValues = {
    body: '',
    deadline: '',
    triger: '',
    status: 'active'
}

const InputeField = () => {
  const [stateTasks,setStateTasks] = useState(getTasks())
  
  const Timers = useRef(new Map())

  useEffect(() => {
  initAllReminders();
}, []);

  
function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function deleteTimers(id){
  const timers = Timers.current.get(id)
  if(timers){
    clearTimeout(timers.warningTimer)
    clearTimeout(timers.deadlineTimer);
    Timers.current.delete(id)
  }
}

function addTask(id, deadline, triger,body,status,createdAt) {
  const tasks = getTasks();
  
  if (tasks.some(task => task.id === id)) {
    console.warn(`Напоминание для задачи ${id} уже установлено!`);
    return;
  }

  tasks.push({
    id,
    deadline: new Date(deadline).toISOString(),
    triger: new Date(triger).toISOString(),
    body,
    status,
    createdAt: createdAt.toISOString(),
  });

  setStateTasks((state)=> [...state,{id,
    deadline: new Date(deadline).toISOString(),
    triger: new Date(triger).toISOString(),
    body,
    status,
    createdAt: new Date(createdAt).toISOString()
  }]);

  saveTasks(tasks);
  scheduleTaskReminder({ id, deadline, triger, body, status });
}

function scheduleTaskReminder(task) {
  const now = Date.now();
  const deadlineTime = new Date(task.deadline).getTime();
  const reminderTime = new Date(task.triger).getTime();

  if (task.status !== 'active') return;

  deleteTimers(task.id)

  const timers = {}
  
  if (reminderTime > now) {
    timers.warningTimer = setTimeout(() => {
      toast.warning(`Напоминание по задаче ${task.body}`,{
      position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light", 
  })
    }, reminderTime - now);
  } else if (reminderTime <= now && reminderTime > now - 60000) {
    toast.warning(`Напоминание (пропущенное) по задаче ${task.body}`,{
      position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light", 
  })
  }
  
  if (deadlineTime > now) {
    timers.deadlineTimer = setTimeout(() => {
      toast.error(`Дедлайн по задаче ${task.body} наступил!`,{
      position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light", 
  })
      markTaskExpired(task.id)
    }, deadlineTime - now);
  } else if (deadlineTime <= now && deadlineTime > now - 60000) {
    console.log(`Дедлайн (пропущенный) по задаче ${task.body}`);
     toast.error(`Дедлайн (пропущенный) по задаче ${task.body} наступил!`,{
      position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light", 
  })
  }
  
  Timers.current.set(task.id,timers)
}

function initAllReminders() {
  const tasks = getTasks();
  tasks.forEach(scheduleTaskReminder);
}

function removeTask(id) {
  let tasks = getTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.warn(`Задача с id=${id} не найдена`);
    return;
  }
  
  deleteTimers(id)
  
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);

  setStateTasks((state)=> state.filter(t => t.id !==id))

  console.log(`Задача ${task.body} удалена`);
  console.log(task);
  toast.info(`Задача ${task.body} удалена`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
})
}

function updateTask(id, newData) {
  let tasks = getTasks();
  const updated = tasks.map(t =>
    t.id === id ? { ...t, ...newData } : t
  );

  saveTasks(updated);
  setStateTasks(updated);
  scheduleTaskReminder(updated.find(t => t.id === id));
}


function markTaskExpired(id) {
  const tasks = getTasks();
  const updated = tasks.map(t =>
    t.id === id ? { ...t, status: "expired" } : t
);
deleteTimers(id)
setStateTasks(()=> updated)
  saveTasks(updated);
}

function markTaskDone(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  const updated = tasks.map(t =>
    t.id === id ? {...t, status: "done"}: t
);
deleteTimers(id)
toast.success(`Задача ${task.body} Выполнена!!`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
})
setStateTasks(()=> updated)
  saveTasks(updated);
}

const sortedTasks = [...stateTasks].sort((a, b) => {
  if (a.status === 'done' && b.status !== 'done' || a.status === 'expired' && b.state !== 'expired') return 1;
  if (b.status === 'done' && a.status !== 'done' || b.status === 'expired' && a.state !== 'expired') return -1;
  
  return new Date(a.deadline) - new Date(b.deadline);
});

function checkTimers() {
    let count = 0
    stateTasks.forEach(t => {if(t.status==='expired') count+=1;return count})


    return (
        <>
        <section className={styles.sec}>
          <header className={styles.divchik}>
            <div>Live upcomming checks</div>
            <div>Remaining time <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/eventsClock`} alt="clock" /></div>
          </header>
            {count > 0 && <div className={styles.flag}>{count}</div>}
            {sortedTasks.length > 0 && <div className={styles.container}>
            {sortedTasks.map(task=>(<TaskDisplay key={task.id} task={task} taskDone={markTaskDone} removeTask={removeTask} updateTask={updateTask}/>))}
            </div>}
        </section>
        </>
    )
}


    const HandleSubmit = (values,{resetForm})=>{
      const id = Date.now().toString();
      const createdAt = new Date();
        addTask(id,values.deadline,values.triger,values.body,values.status,createdAt)
        resetForm()
    }

    return (
        <section className={styles['i-field']}>
            <div className={styles.conteiner}>
                <div className={styles.wrapper}>

                    <div className={styles['head']}>
                        <h4>Create you Event</h4>
                    </div>

                    <Formik
                    validationSchema={createTaskValidateSchema}
                    initialValues={initialValues}
                    onSubmit={HandleSubmit}
                    >
                        {(formikProps)=>(
                            <Form>
                                <label>
                                    <span>Body</span>
                                    <Field name='body'/>
                                    <ErrorMessage name='body'/>
                                </label>
                                <label>
                                    <span>Deadline</span>
                                    <Field name='deadline' type='datetime-local'/>
                                    <ErrorMessage name='deadline'/>
                                </label>
                                <label>
                                    <span>Triger</span>
                                    <Field name='triger' type='datetime-local'/>
                                    <ErrorMessage name='triger'/>
                                </label>
                                <button type='submit' className={styles.subBtn}>Create</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            {checkTimers()}
        </section>
    );
}

export default InputeField;
