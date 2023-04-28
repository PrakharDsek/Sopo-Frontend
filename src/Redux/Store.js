import { configureStore } from "@reduxjs/toolkit";
import Users from "./Users.";
import Notifications from "./Notifications";

const store = configureStore({
  reducer: {
    Users: Users,
    Notification: Notifications,
  },
});

export default store;
