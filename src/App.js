import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import Flipmove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setusername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setusername(prompt("enter your name"));
  }, []);

  const inputHandler = (event) => {
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    event.preventDefault();
  };

  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt='messanger'
      />
      <div className='Input_Message'>
        <h1>Messanger</h1>
        <h1>Will store the username and the data you typed here</h1>
        <h2>welcome {username} to the Chat</h2>
        <form className='App_form'>
          <FormControl className='app_formControl'>
            <Input
              className='app_input'
              placeholder='Ente a message...'
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder='enter your message'
            />

            <IconButton
              className='app_iconButton'
              disabled={!input}
              variant='contained'
              color='primary'
              type='submit'
              onClick={inputHandler}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
        <Flipmove>
          {messages.map(({ id, message }) => {
            return <Message key={id} username={username} message={message} />;
          })}
        </Flipmove>
      </div>
    </div>
  );
}

export default App;
