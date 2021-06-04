import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'sound',
  initialState: {
    value: process.env.PUBLIC_URL + '/sounds/cyka.mp3'
  },
  reducers: {
    setSound: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setSound } = slice.actions
export const selectSound = state => state.sound.value

export default slice.reducer
