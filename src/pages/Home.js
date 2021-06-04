import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Grid,
  LinearProgress,
  IconButton,
  Snackbar
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

import { selectTodo, selectNow, start, addFinished } from '../store/todo'
import { selectSound } from '../store/sound'
import useInterval from '../useInterval'

// This is working but ESLint reports an error.
// 'Audio' is not defined.
// const audio = new Audio()
const audio = new window.Audio()

function Home () {
  const [counter, setCounter] = useState(10)
  const [counting, setCounting] = useState(false)
  const [open, setOpen] = useState()

  const userNow = useSelector(selectNow)
  const userTodo = useSelector(selectTodo)
  const dispatch = useDispatch()

  const userSound = useSelector(selectSound)

  useInterval(async () => {
    if (counting) {
      setCounter(counter => counter - 1)
      if (counter <= 0) {
        setCounter(0)
        stopTimer()
        dispatch(addFinished(userNow))
        audio.src = userSound
        audio.play()
        if (userTodo.length > 0) {
          dispatch(start())
          startTimer()
        }
      }
    }
  }, 1000)

  const startTimer = () => {
    if (userNow.length === 0 && userTodo.length === 0) {
      setOpen(true)
      return
    }
    if (counter <= 0) {
      setCounter(10)
    }
    if (userNow.length === 0 && userTodo.length > 0) {
      dispatch(start())
    }
    setCounting(true)
  }

  const stopTimer = () => {
    setCounting(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div id='home'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' gutterBottom>番茄鐘</Typography>
        </Grid>
        <Grid item xs={12}>
          {
            !counting && userTodo.length === 0 && userNow.length === 0
              ? <Typography variant='h6' align='center' gutterBottom>沒有事項</Typography>
              : !counting && userTodo.length > 0 && userNow.length === 0
                  ? <Typography variant='h4' align='center' gutterBottom>點按鈕開始</Typography>
                  : !counting && userTodo.length > 0 && userNow.length > 0 ? <Typography variant='h4' align='center' gutterBottom>{userNow}</Typography> : null
          }
        </Grid>
        <Grid item xs={12}>
          {
            counting ? <Typography variant='h4' align='center' gutterBottom>{userNow}</Typography> : null
          }
        </Grid>
        <Grid item xs={6}>
          {
            !counting
              ? <IconButton aria-label='play' onClick={() => startTimer()}><PlayArrowIcon /></IconButton>
              : <IconButton aria-label='play' onClick={() => stopTimer()}><PauseIcon /></IconButton>
          }
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' align='right' gutterBottom> 剩餘 {counter <= 0 ? 0 : counter} 秒</Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress variant='determinate' color='secondary' value={100 - counter * 10} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message='沒有事項'
      />
    </div>
  )
}

export default Home
