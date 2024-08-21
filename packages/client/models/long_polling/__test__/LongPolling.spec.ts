import { LongPolling } from "../long_polling";

describe("LongPolling", () => {
  let longPolling: LongPolling;
  let mockFunc: jest.Mock;

  //* useFakeTimers: 가상타이머 사용
  beforeEach(() => {
    jest.useFakeTimers();
    mockFunc = jest.fn().mockResolvedValue(undefined);
    longPolling = new LongPolling(5000, mockFunc);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * ! await Promise.resolve() : Jest의 가상 타이머와 비동기 함수 호출 사이의 비동기 작업이 올바르게 실행되도록 보장하기 위해 사용
   * ! Jest에서 가상 타이머를 사용할 때, 타이머가 예상대로 작동하도록 하려면 다음 틱으로 넘어가야 하는데, 이를 위해 await Promise.resolve()를 사용
   */
  it("Start 메소드가 interval마다 옳바르게 작동하는지 확인", async () => {
    longPolling.Start();

    await Promise.resolve();
    jest.advanceTimersByTime(5000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(2);

    await Promise.resolve();
    jest.advanceTimersByTime(5000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(3);

    longPolling.Stop();
  });

  it("Start 메소드가 Stop 메소드가 실행된 후에도 확인", async () => {
    longPolling.Start();

    await Promise.resolve();
    jest.advanceTimersByTime(5000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(2);

    longPolling.Stop();

    await Promise.resolve();
    jest.advanceTimersByTime(5000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it("가상 타이머를 interval보다 작게 움직여, Start메소드가 옳바르게 작동하는지 확인", async () => {
    longPolling.Start();

    expect(mockFunc).toHaveBeenCalledTimes(1);
    await Promise.resolve();

    jest.advanceTimersByTime(3000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    await Promise.resolve();

    expect(mockFunc).toHaveBeenCalledTimes(2);

    longPolling.Stop();
  });
});
