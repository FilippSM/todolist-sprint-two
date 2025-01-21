import { Todolist } from "../App";

type ActionType = DeleteTodolistActionType | createTodolistActionType | ChangeTodolistTitleActionType

// Reducer
export const todolistsReducer = (todolists: Todolist[], action: ActionType): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      const { id } = action.payload
      return todolists.filter(todolist => todolist.id === id)
    }
    case "create_todolist": {
      const { id, title } = action.payload
      return [...todolists, { id, title, filter: 'all' }]
    }
    case "change_todolist_title": {
      const { id, title } = action.payload
      return todolists.map(todolist => todolist.id === id ? { ...todolist, title } : todolist)
    }
    default:
      return todolists;
  }
};

// Action Creator
export const DeleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const; // Добавлен return
};

// Action Type
export type DeleteTodolistActionType = ReturnType<typeof DeleteTodolistAC>;


export const CreateTodolistAC = (title: string, id: string) => (
  { type: "create_todolist", payload: { title, id } } as const
)

export type createTodolistActionType = ReturnType<typeof CreateTodolistAC>

export const ChangeTodolistTitleAC = (payload: { id: string, title: string }) => (
  { type: "change_todolist_title", payload } as const
)
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>