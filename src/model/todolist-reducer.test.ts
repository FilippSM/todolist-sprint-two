import { v1 } from 'uuid'
import { expect, test, beforeEach } from 'vitest'
import type { Todolist } from '../App'
import { ChangeTodolistTitleAC, CreateTodolistAC, DeleteTodolistAC, todolistsReducer } from './todolists-reducer'

let startState: Todolist[]; // Объявляем переменную на уровне модуля

beforeEach(() => {
    const todolistId1 = v1(); // Инициализируем переменные
    const todolistId2 = v1();
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];
});

test('correct todolist should be deleted', () => {

    // 1. Стартовый state
    

    // 2. Действие
    /*    const action: DeleteTodolistActionType = {
           type: 'delete_todolist',
           payload: {
               id: todolistId1,
           },
       }
       const endState = todolistsReducer(startState, action) */
    /* const action = {
        type: 'delete_todolist',
        payload: {
            id: todolistId1,
        },
    } as const */

    //через экспорт
    const endState = todolistsReducer(startState, DeleteTodolistAC(startState[0].id))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(startState[0].id)
})

test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const id = v1()
    const title = 'New todolist'
    const endState = todolistsReducer(startState, CreateTodolistAC(title, id))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC({id: startState[1].id, title}))
   
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
  })