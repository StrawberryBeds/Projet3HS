import { reactive } from 'vue'

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Task {
  taskId: string
  ownerId: string
  title: string
  description: string
  isDone: boolean
  date: string 
}

interface State {
  currentUser: User | null
  users: User[]
  tasks: Task[]
}

export const state: State = reactive({
  currentUser: null,
  users: [],
  tasks: []
})

export function registerUser(firstName: string, lastName: string, email: string, password: string): boolean {
  const exists = state.users.find(u => u.email === email)
  if (exists) return false

  const newUser: User = {
    userId: Date.now().toString(),
    firstName,
    lastName,
    email,
    password
  }

  state.users.push(newUser)
  state.currentUser = newUser
  return true
}

export function loginUser(email: string, password: string): boolean {
  const user = state.users.find(u => u.email === email && u.password === password)
  if (user) {
    state.currentUser = user
    return true
  }
  return false
}

export function logoutUser(): void {
  state.currentUser = null
}

export function createTask(title: string, description: string): void {
  if (!state.currentUser) return

  const newTask: Task = {
    taskId: Date.now().toString(),
    ownerId: state.currentUser.userId,
    title,
    description,
    isDone: false,
    date: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  state.tasks.push(newTask)
}

export function updateTask(taskId: string, updates: Partial<Pick<Task, 'title' | 'description' | 'isDone'>>): void {
  const task = state.tasks.find(t => t.taskId === taskId && t.ownerId === state.currentUser?.userId)
  if (task) {
    if (updates.title !== undefined) task.title = updates.title
    if (updates.description !== undefined) task.description = updates.description
    if (updates.isDone !== undefined) task.isDone = updates.isDone
  }
}

export function deleteTask(taskId: string): void {
  const index = state.tasks.findIndex(t => t.taskId === taskId && t.ownerId === state.currentUser?.userId)
  if (index !== -1) {
    state.tasks.splice(index, 1)
  }
}
