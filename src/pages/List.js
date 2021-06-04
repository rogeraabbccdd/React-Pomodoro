import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  TextField,
  Grid,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

import { addTodo, selectTodo, delTodo, upTodo, downTodo, selectFinished, delFinished } from '../store/todo'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

function List () {
  const userTodo = useSelector(selectTodo)
  const userFinished = useSelector(selectFinished)
  const dispatch = useDispatch()

  const [newtodo, setNewTodo] = useState('')

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      if (newtodo.length >= 2) {
        dispatch(addTodo(newtodo))
        setNewTodo('')
      }
    }
  }

  const handleSend = (event) => {
    if (newtodo.length >= 2) {
      dispatch(addTodo(newtodo))
      setNewTodo('')
    }
  }

  const handleChange = (event) => {
    setNewTodo(event.target.value)
  }

  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton
        aria-label='add new item'
        onClick={handleSend}
        onMouseDown={handleSend}
      >
        <SendIcon />
      </IconButton>
    </InputAdornment>
  )
  return (
    <div id='list'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' gutterBottom>待辦事項</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='standard-required'
            label='新增'
            fullWidth
            onKeyDown={handleEnter}
            error={newtodo.length > 0 && newtodo.length < 2}
            value={newtodo}
            onChange={handleChange}
            InputProps={{ endAdornment }}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='simple table' id='table-ring'>
              <TableHead>
                <TableRow>
                  <TableCell>名稱</TableCell>
                  <TableCell>動作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  userTodo.length > 0
                    ? userTodo.map((item, i) => (
                      <StyledTableRow key={i}>
                        <TableCell component='th' scope='row'>
                          {item}
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => { dispatch(delTodo(i)) }}>
                            <DeleteIcon />
                          </IconButton>
                          {i !== 0 ? <IconButton onClick={() => { dispatch(upTodo(i)) }}><ArrowUpwardIcon /></IconButton> : null}
                          {i !== userTodo.length - 1 ? <IconButton onClick={() => { dispatch(downTodo(i)) }}><ArrowDownwardIcon /></IconButton> : null}
                        </TableCell>
                      </StyledTableRow>
                    ))
                    : <StyledTableRow><TableCell colSpan={2}>無資料</TableCell></StyledTableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' gutterBottom>已完成</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='simple table' id='table-ring'>
              <TableHead>
                <TableRow>
                  <TableCell>名稱</TableCell>
                  <TableCell>動作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  userFinished.length > 0
                    ? userFinished.map((item, i) => (
                      <StyledTableRow key={i}>
                        <TableCell component='th' scope='row'>
                          {item}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => { dispatch(delFinished(i)) }}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))
                    : <StyledTableRow><TableCell colSpan={2}>無資料</TableCell></StyledTableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default List
