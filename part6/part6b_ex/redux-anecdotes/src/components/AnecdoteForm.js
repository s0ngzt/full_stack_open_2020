import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(content));
    dispatch(notify("new anecdote added!"));
    setTimeout(() => dispatch(notify("")), 5000);
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewAnecdote;
