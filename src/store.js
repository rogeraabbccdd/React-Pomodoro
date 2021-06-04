import { configureStore } from '@reduxjs/toolkit'
import soundReducer from './store/sound'
import todoReducer from './store/todo'

export default configureStore({
  reducer: {
    sound: soundReducer,
    todo: todoReducer
  }
})
