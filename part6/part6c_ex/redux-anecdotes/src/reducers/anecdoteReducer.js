// const getId = () => (100000 * Math.random()).toFixed(0);
import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE": {
      const id = action.data.id;
      return state.map(anecdote => (anecdote.id !== id ? anecdote : action.data));
    }
    default:
      return state;
  }
};

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const vote = id => {
  return async dispatch => {
    const voteToAdd = await anecdoteService.getOne(id)
    const changedAnecdote = {
      ...voteToAdd,
      votes: voteToAdd.votes + 1,
    };
    const response = await anecdoteService.voteOne(changedAnecdote);
    dispatch({
      type: "VOTE",
      data: response,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

export default anecdoteReducer;
