import React, { useState, useEffect} from 'react'; //useState is the conevention we create for our hooks
import Todo from './Todo';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import { Divider } from '@material-ui/core';


function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    

      //When the app loads, we need to listen to the database and fetch new todos as they are added/removed
      useEffect(() => { //this is also a hook;
       //this code here fires up when the app.js loads
       db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
        //  console.log(snapshot.docs.map(doc => doc.data()));
         setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
       });
        }, []);
      

    const addTodo = (event) => {
      //this will stop REFRESH after each submit
      event.preventDefault();

      //this will fireup when we click the button and add the input to the database
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })


        setTodos([...todos, input]);
        setInput (''); //it clears up the input after hitting the submit button;

    };
   
  return (
    <div className="App">
     <h1>Create a To_do List</h1>
     <form>

      <FormControl>
        <InputLabel>Write a todo</InputLabel>
        <Input value = {input} onChange={event => setInput(event.target.value)} /> 
        <br />
      
      </FormControl>
     <Button disabled={!input} type="submit" onClick = {addTodo} variant="contained" color="primary">Add Todo</Button>
   

     </form>
    
     <Divider />
     <ul>
       {todos.map(todo => (
         <Todo todo = {todo} />
        //<li>{todo}</li>
       ))}
       
      

     </ul>
    </div>
  );
}

export default App;
