import type { TasksState } from '../App'
import { CreateTodolistActionType, DeleteTododlistActionType } from './todolists-reducer'

const initialState: TasksState = {}

type Actions = DeleteTododlistActionType | CreateTodolistActionType | DeleteTaskActionType

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
        default:
            return tasks
    }
}

// delete
export const DeleteTaskAC = (payload: { todolistId: string, taskId: string}) => (
    { type: "delete_task", payload} as const
)
export type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>