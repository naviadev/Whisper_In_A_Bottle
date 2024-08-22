import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "600px",
  margin: "auto",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
});

export const textarea = style({
  width: "100%",
  height: "400px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontSize: "16px",
  resize: "vertical",
  marginBottom: "10px"
});

export const buttonContainer = style({
  width: "200px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

export const button = style({
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  margin: "0px 10px 0px 10px",
  ":hover": {
    backgroundColor: "#0056b3"
  },
  ":focus": {
    outline: "none"
  }
});

export const contentContainer = style({
  width: "600px",
  height: "400px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontSize: "16px",
  resize: "vertical",
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center"
});

export const Content = style({
  width: "90%",
  height: "20px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  margin: "10px",
  textAlign: "center"
});
