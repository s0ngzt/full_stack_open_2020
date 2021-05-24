export const notify = notification => {
  return {
    type: "notification",
    notification,
  };
};

const notificationReducer = (state = "Notifications will be shown here...", action) => {
  switch (action.type) {
    case "notification":
      return action.notification;
    default:
      return state;
  }
};

export default notificationReducer;
