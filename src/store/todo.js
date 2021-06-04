import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'todo',
  initialState: {
    todo: [],
    finished: [],
    now: ''
  },
  reducers: {
    addTodo: (state, action) => {
      state.todo.push(action.payload)
    },
    delTodo: (state, action) => {
      state.todo.splice(action.payload, 1)
    },
    editTodo: (state, action) => {
      state.todo[action.payload.id].name = action.payload.name
    },
    upTodo: (state, action) => {
      state.todo[action.payload] = state.todo.splice(action.payload - 1, 1, state.todo[action.payload])[0]
    },
    downTodo: (state, action) => {
      state.todo[action.payload] = state.todo.splice(action.payload + 1, 1, state.todo[action.payload])[0]
    },
    addFinished: (state, action) => {
      state.finished.push(state.now)
      state.now = ''
    },
    delFinished: (state, action) => {
      state.finished.splice(action.payload, 1)
    },
    start: (state) => {
      if (state.todo.length > 0) {
        state.now = state.todo.shift()
      }
    }
  }
})

export const { addTodo, delTodo, editTodo, upTodo, downTodo, addFinished, delFinished, start } = slice.actions
export const selectTodo = state => state.todo.todo
export const selectFinished = state => state.todo.finished
export const selectNow = state => state.todo.now

export default slice.reducer
