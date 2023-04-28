import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const Notification = createSlice({
  name: "Notification",
  initialState: {
    Notification: {
      success: "",
      message: "",
    },
  },
  reducers: {
    setNotification: (state, payload) => {
      state.Notification.success = payload.payload.success;
      state.Notification.message = payload.payload.message;
    },
    SendNotification: (state, payload) => {
      if (state.Notification.success == "true") {
        toast.success(state.Notification.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "green",
            background: "#0a092b",
            zIndex:"9999999999999999999999909999999999999999999999999999999999999999999999999999"
          },
          iconTheme: {
            primary: "green",
          },
        });
      } else {
        toast.error(`${state.Notification.message}`, {
          style: {
            border: "1px solid lightgray",
            padding: "16px",
            color: "red",
            background: "#0a092b",
            zIndex:"9999999999999999999999999999999999999999999999999999999999999999999999999"
          },
          iconTheme: {
            primary: "red",
          },
        });
      }
    },
  },
});

export const { setNotification ,SendNotification } = Notification.actions;
export default Notification.reducer;
