import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'
import { CreateItemForm } from './CreateItemForm'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],

  })



  // tasks
  // C
  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  // U1
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task) })
  }

  // U2
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, title } : task) })
  }

  // D
  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }


  //todolists
  //C
  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = { id: todolistId, title: title, filter: 'all' }
    setTodolists([...todolists, newTodolist])
    setTasks({ ...tasks, [todolistId]: [] })
  }

  //U1
  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
  }

  //U2
  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
  }

  //D
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }









  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} />
      {todolists.map(todolist => {
        const todolistTasks = tasks[todolist.id]
        let filteredTasks = todolistTasks
        if (todolist.filter === 'active') {
          filteredTasks = todolistTasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTasks.filter(task => task.isDone)
        }

        return (
          <TodolistItem key={todolist.id}
            todolist={todolist}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist} 
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            />
        )
      })}
    </div>
  )
}
