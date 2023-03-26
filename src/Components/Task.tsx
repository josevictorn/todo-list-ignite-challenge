import { ChangeEvent, useState } from 'react';

import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  id: string;
  title: string;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (taskId: string, isComplete: boolean) => void;
}

export function Task({ id, title, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckIfTaskIsCompleted(event: ChangeEvent<HTMLInputElement>) {
    onCompleteTask(id, event.target.checked);
  }

  return(
    <div className={styles.task}>
      <div className={styles.taskDescription}>
        <input type="checkbox" id={id} onChange={handleCheckIfTaskIsCompleted} />
        <label htmlFor={id}>{title}</label>
      </div>
      <button onClick={handleDeleteTask}>
        <Trash />
      </button>
    </div>
  );
}