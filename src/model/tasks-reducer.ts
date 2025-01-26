import { v1 } from 'uuid'
import type { TasksState } from '../App'
/* import { CreateTodolistActionType, DeleteTododlistActionType } from './todolists-reducer' */
import { DeleteTododlistActionType } from './todolists-reducer'

const initialState: TasksState = {}

type Actions = CreateTodolistActionsType | DeleteTododlistActionType | DeleteTaskActionType | CreateTaskActionType | CreateTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (tasks: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            const { id } = action.payload
            return { ...tasks, [id]: [] }
        }
        case "delete_todolist": {
            const { id } = action.payload
            delete tasks[id]
            return tasks
        }
        case "delete_task": {
            const { todolistId, taskId } = action.payload     
            return { ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) }
        }
        case "create_task": {
            const { todolistId, title } = action.payload     
            const newTask = { id: v1(), title, isDone: false }
            return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        }
        case "change_task_status": {
            const { todolistId, taskId, isDone } = action.payload     
            return { ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task) }
        }
        case "change_task_title": {
            const { todolistId, taskId, title } = action.payload     
            return { ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, title } : task) }
        }
        default:
            return tasks
    }
}

//create task todolist
export const CreateTodolistTaskAC = (id: string) => (
    { type: "create_todolist", payload: { id }} as const
)

export type CreateTodolistActionsType = ReturnType<typeof CreateTodolistTaskAC>

// delete
export const DeleteTaskAC = (payload: { todolistId: string, taskId: string}) => (
    { type: "delete_task", payload} as const
)
export type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>

//create
export const CreateTaskAC = (payload: { todolistId: string, title: string}) => (
    { type: "create_task", payload} as const
)
export type CreateTaskActionType = ReturnType<typeof CreateTaskAC>

//update-1
export const ChangeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean}) => (
    { type: "change_task_status", payload} as const
)
export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>

//update-2
export const ChangeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string}) => (
    { type: "change_task_title", payload} as const
)
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
