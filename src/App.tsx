import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'
import { CreateItemForm } from './CreateItemForm'


/*
  выносим логику создания для создания тудулистов/тасок в отдельную компоненту addItemForm
  из addItemForm убираем id и делаем функцию оьертку в todolistitem и там передвем id
  добавляем в app функцию добавления тудулистов createTodolist и туда добавить добавления массива тасок

  создаем функцию EditableSpan - и выносим в отдельную компоненту
  функцонал - при двойном нажатии открывается инпут и вводятся данные для редактирования
  при двойном клике дложен спан превратиться в инпут

  создаем стейт в котором хранится состояние true/false для отображения span или строки
  контроль логику удвойного клика, привязываем к двойному клику функцию
  добавление режима деативации при потере фокуса при двойном клике - исп. onblure + автофокус

  как сделать чтобы введенное м  инпут сохранллось
  ичпользуем value и onchange и функцию привязываем

  добавляем локальный стейт для тайтла

  мы можем значение только прочитать
  надо его отрисовать
  -отдать данные наверх родителю
  прокидываем колбэк функцию
  добавляем функцию onchabgeTitleHandler


  добавляем логику ри двойном нажатии открывается инпут и вводятся данные для редактирования
  при двойном клике дложен спан превратиться в инпут
  для названия тудулиста

  
  пишем логику для отрисовки тудулиста измененного - 
  и прокидываем данные в родительскую компоненту чтобы отрисовать данные которые изменились
  в родительском компоненте прописываем функцию
 */

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksStateType = {
  [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  //BLL

  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Whiskey', isDone: true },
      { id: v1(), title: 'Cola', isDone: true },
      { id: v1(), title: 'Ice', isDone: false },
    ],

  })




  //task
  const deleteTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    })
  }

  const createTask = (title: string, todolistId: string) => {
    const newTask: Task = { id: v1(), title, isDone: false }
    setTasks({
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    })
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, isDone } : t)
    })
  }

  /* update title status */
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, title } : t)
    })
  }
  
  //todolist
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
    setTodolists([...todolists, newTodolist])
    setTasks({...tasks, [todolistId]: []})
  }

   //U1
   const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }
 //U2
  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl))
  }


  // UI


  const todolistsComponents = todolists.map(tl => {

    let filteredTasks = tasks[tl.id]
    if (tl.filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (tl.filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <TodolistItem
        key={tl.id}
        todolistId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}

        deleteTask={deleteTask}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}

        changeTodolistFilter={changeTodolistFilter}
        deleteTodolist={deleteTodolist}
        changeTaskTitle ={changeTaskTitle}
        changeTodolistTitle={changeTodolistTitle}
      />
    )
  })

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist}/>
      {todolistsComponents}
    </div>
  )
}
