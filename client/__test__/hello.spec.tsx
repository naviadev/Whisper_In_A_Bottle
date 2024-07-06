import React from "react";
import { render, screen } from "@testing-library/react";

import Hello from "../pages/components/hello"; // 'Hello' 컴포넌트 경로와 파일명 확인
import "@testing-library/jest-dom";

describe("Hello component", () => {
  it("renders a message", () => {
    render(<Hello />);
    const message = screen.getByText("Hello, world!");

    expect(message).toBeInTheDocument();
  });
});
