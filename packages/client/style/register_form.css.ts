import { style } from "@vanilla-extract/css";

export const registerForm = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const input = style({
  padding: "10px",
  margin: "5px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
});

export const button = style({
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#28a745",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
});
