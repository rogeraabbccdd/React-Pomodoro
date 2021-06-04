import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSound, selectSound } from '../store/sound'
import { withStyles } from '@material-ui/core/styles'

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid
} from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import CheckIcon from '@material-ui/icons/Check'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const sounds = [
  { name: 'Cyka Blyat', src: process.env.PUBLIC_URL + '/sounds/cyka.mp3' },
  { name: 'Deja Vu', src: process.env.PUBLIC_URL + '/sounds/dejavu2018_short.mp3' },
  { name: 'John Cena', src: process.env.PUBLIC_URL + '/sounds/johncena2_short.mp3' }
]

// This is working but ESLint reports an error.
// 'Audio' is not defined.
// const audio = new Audio()
const audio = new window.Audio()

function Settings () {
  const [playing, setPlaying] = useState({ id: -1, play: false })

  const userSound = useSelector(selectSound)
  const dispatch = useDispatch()

  const stopPlaying = () => {
    audio.pause()
    setPlaying({ ...playing, play: false })
  }

  const startPlaying = (i) => {
    if (playing.id !== i) audio.src = sounds[i].src
    audio.play()
    setPlaying({ id: i, play: true })
  }

  return (
    <div id='settings'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' gutterBottom>設定</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='simple table' id='table-ring'>
              <TableHead>
                <TableRow>
                  <TableCell>名稱</TableCell>
                  <TableCell>試聽</TableCell>
                  <TableCell>選擇</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
              sounds.map((sound, i) => (
                <StyledTableRow key={sound.name}>
                  <TableCell component='th' scope='row'>
                    {sound.name}
                  </TableCell>
                  <TableCell>
                    {
                      playing.id !== i || (playing.id === i && !playing.play)
                        ? <IconButton aria-label='play' onClick={() => startPlaying(i)}><PlayArrowIcon /></IconButton>
                        : <IconButton aria-label='play' onClick={() => stopPlaying(i)}><PauseIcon /></IconButton>
                    }
                  </TableCell>
                  <TableCell component='th' scope='row' onClick={() => dispatch(setSound(sound.src))}>
                    {sound.src === userSound ? <CheckIcon /> : null}
                  </TableCell>
                </StyledTableRow>
              ))
            }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Settings
