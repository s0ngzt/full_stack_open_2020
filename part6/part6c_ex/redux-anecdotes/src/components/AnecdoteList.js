import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotifacation } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  return (
    <ul>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            //dispatch(newAnecdote(content));
            dispatch(vote(anecdote.id));
            dispatch(setNotifacation(`votes anecdote ${anecdote.id}`, 5000))
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
