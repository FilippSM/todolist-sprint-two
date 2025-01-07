import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'

type Props = {
  todolistId: string
  title: string
  filter: FilterValues
  tasks: Task[]

  deleteTask: (taskId: string, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void

  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
  
}

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    filter,
    tasks,
    deleteTask,
    
    createTask,
    changeTaskStatus,

    changeTodolistFilter,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle
    
  } = props

/*   const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null) */

  const createTaskHandler = (title: string) => {
      createTask(title, todolistId)
      
  }

 /*  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  } */

 /*  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  } */

  const deleteTodoListHandler = () => deleteTodolist
  (todolistId) 

  const ChangeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(todolistId, newTitle)
  }

  return (
      <div>
        <h3>
        <EditableSpan title={title} changeTitle={ChangeTodolistTitleHandler}/>
        <Button title="x" onClick={deleteTodoListHandler}/>
        </h3>
        
        <CreateItemForm createItem={createTaskHandler} />
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }
                const changeTaskTitleHandler = (newTitle: string) => {
                  changeTaskTitle(task.id, newTitle, todolistId)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <input type="checkbox" checked={task.isDone}
                             onChange={changeTaskStatusHandler}/>
                      <Button title={'x'} onClick={deleteTaskHandler}/>
                      <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeTodolistFilter('all', todolistId)}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeTodolistFilter('active', todolistId)}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeTodolistFilter('completed', todolistId)}/>
        </div>
      </div>
  )
}
