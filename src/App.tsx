import { ChangeEvent, FormEvent, useState } from 'react';

import { Header } from './Components/Header'
import { Task } from './Components/Task';

import styles from './App.module.css';

import './global.css'

interface Tasks {
  id: string;
  title: string;
  isComplete: boolean;
}

// const tasks = [
//   {
//     id: '1',
//     title: "Estudar JavaScript",
//     isComplete: true
//   },
//   {
//     id: '2',
//     title: "Ir para a academia",
//     isComplete: false
//   }, 
//   {
//     id: '3',
//     title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
//     isComplete: false
//   }
// ];

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTaskText, setNewTaskText] = useState<Tasks>({ id:'', title:'', isComplete:false });

  const amountOfCompletedTasks = tasks.filter(task => task.isComplete === true).length;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTasks = [...tasks, newTaskText];

    setTasks(newTasks);

    setNewTaskText({id:'', title:'', isComplete:false });
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');

    setNewTaskText({
      id: crypto.randomUUID(),
      title: event.target.value,
      isComplete: false
    });
  }

  function deleteTask(taskIdToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== taskIdToDelete);

    setTasks(tasksWithoutDeletedOne);
  }

  function completeTask(taskId:string,  isComplete:boolean) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return Object.assign({}, task, {isComplete: isComplete})
      }

      return task;
    });

    setTasks(newTasks);
  }


  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.form}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            value={newTaskText.title}
            onChange={handleNewTaskTextChange} 
            required
          />
          <button type="submit">Criar</button>
        </form>

        <main className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>

            <div className={styles.done}>
              <strong>Concluídas</strong>
              <span>{amountOfCompletedTasks} de {tasks.length}</span>
            </div>
          </div>

          <div className={styles.list}>
            {
              tasks.map(taks => (
                <Task 
                  key={taks.id}
                  id={taks.id} 
                  title={taks.title} 
                  onDeleteTask={deleteTask}
                  onCompleteTask={completeTask}
                />
              ))
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
