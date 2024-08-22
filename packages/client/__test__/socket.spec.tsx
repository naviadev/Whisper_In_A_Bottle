import { io } from "socket.io-client";
import { render, screen, fireEvent, act } from "@testing-library/react";

// eslint-disable-next-line import/no-unresolved
import Socket from "@client/components/socket/socket";
import "@testing-library/jest-dom";

// Define a mock socket interface
interface MockSocket {
  on: jest.Mock;
  emit: jest.Mock;
  off: jest.Mock;
  connect: jest.Mock;
  disconnect: jest.Mock;
}

// Mocking socket.io-client
jest.mock("socket.io-client", () => {
  const mSocket: MockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn()
  };
  return {
    io: jest.fn(() => mSocket)
  };
});

describe("Socket Component", () => {
  let mockSocket: MockSocket;

  beforeEach(() => {
    mockSocket = (io as jest.Mock)() as MockSocket;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Socket />);
    expect(screen.getByText("Chat")).toBeInTheDocument();
  });

  it("sends a message and clears the input", async () => {
    render(<Socket />);

    const input = screen.getByPlaceholderText(
      "Type your message here"
    ) as HTMLInputElement;
    const button = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockSocket.emit).toHaveBeenCalledWith("send-letter", "Hello");
    expect(input.value).toBe("");
  });

  it("receives a message", async () => {
    render(<Socket />);

    await act(async () => {
      const onCall = mockSocket.on.mock.calls.find(
        (call) => call[0] === "send-letter"
      );
      if (onCall && typeof onCall[1] === "function") {
        onCall[1]("Hello");
      }
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("removes event listener on unmount", () => {
    const { unmount } = render(<Socket />);

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith("send-letter");
  });
});
