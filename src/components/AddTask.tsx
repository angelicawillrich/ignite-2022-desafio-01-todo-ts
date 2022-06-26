
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './AddTask.module.css'

import plus from '../assets/plus.svg'

interface Props {
  onAddTask: (task: string) => void;
}

export function AddTask({ onAddTask }: Props) {
  const [newTask, setNewTask] = useState('');

  const isNewTaskEmpty = newTask.length === 0

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    onAddTask(newTask)
    setNewTask('')
  }

  return (
    <form 
      onSubmit={handleCreateTask}
      className={styles.addTodoContainer}
    >
      <input
        type="text"
        value={newTask}
        placeholder="Adicione uma nova tarefa"
        onChange={handleNewTaskChange}
        onInvalid={handleNewCommentInvalid}
        required
      />
      <button
        type="submit"
        disabled={isNewTaskEmpty}
      >
        Criar
        <img src={plus} />
      </button>
    </form>
  )
}
