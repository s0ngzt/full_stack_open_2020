import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotifacation } from "../reducers/notificationReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //const newAnec = await anecdoteService.createNew(content);
    dispatch(newAnecdote(content));
    dispatch(setNotifacation("new anecdote added!", 5000));
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewAnecdote;
