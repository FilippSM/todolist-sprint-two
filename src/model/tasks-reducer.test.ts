import { beforeEach, expect, test } from 'vitest'
import type { TasksState } from '../App'
import { CreateTodolistAC, DeleteTododlistAC } from './todolists-reducer'
import { ChangeTaskStatusAC, ChangeTaskTitleAC, CreateTaskAC, DeleteTaskAC, tasksReducer } from './tasks-reducer'

let startState: TasksState = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, CreateTodolistAC('New todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, DeleteTododlistAC('todolistId2'))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
  const endState = tasksReducer(startState, DeleteTaskAC({ todolistId: "todolistId2", taskId: "2" }))
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'][2]).toBeUndefined()
})

test('correct task should be created', () => {
  const endState = tasksReducer(startState, CreateTaskAC({ todolistId: "todolistId2", title: "New title" }))
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].title).toBe("New title")
})

test('correct title should change its status', () => {
  const endState = tasksReducer(startState, ChangeTaskStatusAC({ todolistId: "todolistId2", taskId: "3", isDone: true }))
  expect(endState['todolistId2'][2].isDone).toBe(true)

  // Проверка, что другие задачи не изменились
  expect(endState['todolistId2'][0].isDone).toBe(false);
  expect(endState['todolistId2'][1].isDone).toBe(true);

  // Проверка, что состояние других todolist не изменилось
  expect(endState['todolistId1']).toEqual(startState['todolistId1']);
})

test('correct title should change its title', () => {
  const endState = tasksReducer(startState, ChangeTaskTitleAC({ todolistId: "todolistId2", taskId: "3", title: "Change title" }))
  expect(endState['todolistId2'][2].title).toBe("Change title")

   // Проверка, что другие задачи не изменились
   expect(endState['todolistId2'][0].title).toBe('bread');
   expect(endState['todolistId2'][1].title).toBe('milk');
 
   // Проверка, что состояние других todolist не изменилось
   expect(endState['todolistId1']).toEqual(startState['todolistId1']);
})