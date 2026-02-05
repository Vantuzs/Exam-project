import React, {useEffect,useState} from 'react';
import Timer from './Timer';
import styles from './TaskDisplay.module.scss'
import Modal from 'react-modal'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { createTaskValidateSchema } from '../InputeField/ValidateSchemas';



const TaskDisplay = ({task,taskDone,removeTask,updateTask}) => {
  const [progress, setProgress] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const iso = d.toISOString();
  return iso.slice(0, 16);
};

  const initialValues = {
      body: task.body,
      deadline: formatDateForInput(task.deadline),
      triger: formatDateForInput(task.triger),
      status: 'active'
  }
    
     const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column'
      },
  };

  const HandleSubmit = (values) => {
  updateTask(task.id, {
    body: values.body,
    deadline: new Date(values.deadline).toISOString(),
    triger: new Date(values.triger).toISOString(),
  });

  closeModal();
};

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    console.log(task.deadline);
  }

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
            {task.status === 'active' && <>
              <button className={styles.buttonGr} onClick={() => taskDone(task.id)}>Done</button> 
              <button className={styles.buttonGr} onClick={()=>openModal()}>Change</button>
            </>}
            {task.status !== 'active' && <button className={styles.buttonGr} onClick={() => removeTask(task.id)}>Delete</button>}
        </article>
       <Timer task={task}/>
    </section>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.formStyle}
        contentLabel="Example Modal"
        overlayClassName={styles.overlay}
        style={{ content: {} }}
      >
        <button className={styles.closeBtn} onClick={closeModal}></button>
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
                                        <button type='submit' className={styles.subBtn}>Change</button>
                                    </Form>
                                )}
                            </Formik>
      </Modal>
        </>
    );
}

export default TaskDisplay;
