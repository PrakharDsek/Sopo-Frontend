import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";


const SettingsEdit = ({ Key, Value, Update, placeValue, options }) => {
  const [inputStatus, setInputStatus] = useState(false);
  const [inputPassStatus, setInputPassStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [NewVal, setNewVal] = useState("");


  const handleSave = (e) => {
    Update(NewVal, password);
    setInputStatus(!inputPassStatus);
    setInputPassStatus(!inputPassStatus);
  };
;
  return (
    <>
 
        {inputPassStatus ? (
          <motion.div
            className="settingContent"
            initial={{ top: 0 }}
            animate={{ top: "30%" }}
            onEnded={{ top: "30%" }}
            style={{
              width: "40%;",
              position: "absolute",
              backgroundColor: "white",
              top: "50%",
              left: "40%",
              zIndex: "9999999999999999999999",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
            calssName="settingContent"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              {options ? (
                <>
                  <p style={{ color: "black" }}>
                    <input
                      type="radio"
                      id="public"
                      value={"Public"}
                      onChange={() => setNewVal("public")}
                    />
                    Public
                  </p>
                  <p style={{ color: "black" }}>
                    <input
                      type="radio"
                      id="private"
                      value={"private"}
                      onChange={() => setNewVal("private")}
                    />
                    Private
                  </p>
                </>
              ) : (
                <input
                  onChange={(e) => setNewVal(e.target.value)}
                  style={{
                    background: "#FFFF",
                    color: "black",
                    border: "1px solid black !important",
                    borderRadius: "8px",
                    margin: "12px",
                    padding: "12px",
                    outline: "none",
                  }}
                  placeholder={`New ${placeValue} for the account`}
                />
              )}
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                style={{
                  background: "#FFFF",
                  color: "black",
                  borde: "1px solid black !important",
                  borderRadius: "8px",
                  padding: "12px",
                  margin: "12px",
                  outline: "none",
                }}
                placeholder="Enter your password"
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  width: "40%",
                  padding: "12px",
                  backgroundColor: "blue",
                  color: "#FFF",
                  textAlign: "center",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleSave}
              >
                Save
              </p>
              <p
                style={{
                  width: "40%",
                  padding: "12px",
                  backgroundColor: "red",
                  color: "#FFF",
                  textAlign: "center",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setInputPassStatus(!inputPassStatus)}
              >
                Cancel
              </p>
            </div>
          </motion.div>
        ) : (
          ""
        )}     <motion.div
        initial={{ position: "relative", left: 0 }}
        animate={{ left: "0px" }}
        exit={{ left: "0px" }}
      >
        <p style={{ width: "100%" }}>
          <label>{Key}:</label>
          <p> {Value}</p>
        </p>
        <motion.p  whileHover={{ scale: 1.1, cursor: "pointer" }}>
          <EditIcon onClick={() => setInputPassStatus(!inputStatus)} />
        </motion.p>
      </motion.div>
    </>
  );
};

export default SettingsEdit;


