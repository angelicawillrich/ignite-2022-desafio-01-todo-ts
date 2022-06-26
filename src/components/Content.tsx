import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddTask } from './AddTask'
import { Tasks } from './Tasks'


interface Tasks {
    id: string;
    description: string;
    done: boolean;
}

export function Content() {
    const [tasks, setTasks] = useState<Tasks[]>([{
        id: uuidv4(),
        description: "Estudar typescript",
        done: true
    }])

    function handleAddTask(newTaskDescription: string) {
        const newTask = {
            id: uuidv4(),
            description: newTaskDescription,
            done: false
        }
        setTasks([...tasks, newTask])
    }

    function handleChangeStatus(id: string) {
        const updatedTasksList = tasks.map(task => {
            if (task.id === id) {
                return {
                    done: !task.done,
                    id: task.id,
                    description: task.description
                }
            } else {
                return task
            }
        })
        setTasks(updatedTasksList)
    }

    function handleDeleteTask(id: string) {
        const newTaskLIst = tasks.filter(task => task.id !== id)
        setTasks(newTaskLIst)
    }

    return (
        <>
            <AddTask onAddTask={handleAddTask} />
            <Tasks tasks={tasks} onChangeTaskStatus={handleChangeStatus} onDeleteTask={handleDeleteTask} />
        </>
    )
}