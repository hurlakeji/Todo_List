import React, { useState, handleClose} from 'react';
import './Todo.css';
import './App.css';
import db from './firebase';
import { ListItem, List, ListItemText, Modal, Button, ListItemAvatar} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);


function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = ()=> {
        setOpen(true);
    };

    const updateTodo = () => {
        //update the todo with the new set input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
            
        },{ merge: true })
        setOpen(false);

    }

    return (
        
        <>
        <Modal open={open} 
        onClose={e => setOpen(false)}
        >

        <div className = {classes.paper}>
            <h1>I am a modal</h1>
            <input placeholder= {props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
            <Button onClick={updateTodo}>Update Todo</Button>       
        </div>
        </Modal> 

        <List component="nav" className={classes.root} aria-label="mailbox folders"> 
            <ListItem>
            <ListItemAvatar>
                
            </ListItemAvatar>
            <ListItemText primary = {props.todo.todo} />
           
           
            </ListItem>
            <li>
            <ColoredLine color="black" />
            </li>
            
            <button className='Todo_button' onClick={e => setOpen(true)}>Edit</button>
             <DeleteForeverIcon className='Todo_DeleteForeverIcon' onClick={event => 
                db.collection('todos').doc(props.todo.id).delete()
             }></DeleteForeverIcon>
            
        </List>
        </>
          
    );
}

export default Todo

//rfce: React functional component with an export
//i is actually very cool to split your code into component based in react
