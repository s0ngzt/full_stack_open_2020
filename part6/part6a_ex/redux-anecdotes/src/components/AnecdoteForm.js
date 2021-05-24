import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(content));
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewAnecdote;
