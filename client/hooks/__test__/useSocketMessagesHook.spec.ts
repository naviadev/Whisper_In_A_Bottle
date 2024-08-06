import { renderHook, act } from "@testing-library/react-hooks";
import { jwtDecode } from "jwt-decode";
import { useSocket } from "components/socket/SocketContext";
import { getCookie } from "src/getCookie";
import useSocketMessagesHook from "hooks/letterView/useSocketMessagesHook";

jest.mock("jwt-decode");
jest.mock("../../components/SocketContext");
jest.mock("../../src/getCookie");

describe("useSocketMessagesHook", () => {
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  };

  beforeEach(() => {
    (useSocket as jest.Mock).mockReturnValue(mockSocket);
    (getCookie as jest.Mock).mockReturnValue("mockToken");
    (jwtDecode as jest.Mock).mockReturnValue({ id: "mockid" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize and set up socket event listeners", () => {
    const { result } = renderHook(() => useSocketMessagesHook());

    expect(getCookie).toHaveBeenCalledWith("token");
    expect(jwtDecode).toHaveBeenCalledWith("mockToken");
    expect(mockSocket.emit).toHaveBeenCalledWith("initial_Data", "mockid");
    expect(mockSocket.on).toHaveBeenCalledWith("latte", expect.any(Function));
  });

  it("should update receivedMessage when message is received", () => {
    const { result } = renderHook(() => useSocketMessagesHook());

    const messageHandler = mockSocket.on.mock.calls[0][1];
    act(() => {
      messageHandler("testMessage");
    });

    expect(result.current.receivedMessage).toBe("testMessage");
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useSocketMessagesHook());

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith("latte");
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
