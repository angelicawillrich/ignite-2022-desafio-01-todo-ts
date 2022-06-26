import clipboard from '../assets/clipboard.svg'
import check from '../assets/check.svg'
import check_done from '../assets/check_done.svg'
import trash from '../assets/trash.svg'

interface Tasks {
    id: string;
    description: string;
    done: boolean;
}

import styles from './Tasks.module.css'

interface Props {
    tasks: Tasks[];
    onChangeTaskStatus: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function Tasks({ tasks, onChangeTaskStatus, onDeleteTask }: Props) {
    
    const totalTasks = tasks.length
    const totalDoneTasks = tasks.reduce((acc, current) => (
        current.done === true ? acc + 1: acc
    ), 0);

    function handleDeleteTask(id: string) {
        onDeleteTask(id)
    }

    function handleChangeTaskStatus(id: string) {
        onChangeTaskStatus(id)
    }

    return(
        <>
            <div className={styles.tasks}>
                <header>
                    <div className={styles.createdTasks}>
                        <p>Tarefas criadas</p>
                        <div className={styles.counter}>
                            <p>{totalTasks}</p>
                        </div>
                    </div>
                    <div className={styles.doneTasks}>
                        <p>Tarefas concluídas</p>
                        <div className={styles.counter}>
                            <p>{totalDoneTasks} de {totalTasks}</p>
                        </div>
                    </div>
                </header>
                <main>
                    {tasks.length === 0
                        ?
                            <div className={styles.empty}>
                                <img src={clipboard} />
                                <div>
                                    <strong>Você ainda nao tem tarefas cadastradas</strong>
                                    <p>Crie tarefas e organize seus itens a fazer</p>
                                </div>
                            </div>
                        :
                            tasks.map(task => {
                                return (
                                    <div className={styles.task} key={task.id}>
                                        <div>
                                            {task.done
                                                ? <button onClick={() => handleChangeTaskStatus(task.id)}>
                                                    <img src={check_done} alt="checkbox done" />
                                                </button>
                                                : <button onClick={() => handleChangeTaskStatus(task.id)}>
                                                    <img src={check} alt="checkbox" />
                                                </button>
                                            }
                                        </div>
                                        <div className={styles.description}>{task.description}</div>
                                        <div className={styles.deleteButton}>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                <img src={trash} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </main>
            </div>
        </>
    )
}