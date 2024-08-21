/**
 * ! 매개변수 func는 request와 관련된 비동기 함수여야 합니다.
 * * 전체적인 동작은 Sleep 메소드를 통해 일정간격(time)으로 func를 실행한다.
 * * time, func는 매개변수로 받아, 프로퍼티로 등록
 */
export class LongPolling {
  time;
  func;
  isStart;
  constructor(time: number, func: (...args: never[]) => Promise<void>) {
    this.time = time;
    this.func = func;
    this.isStart = false;
  }

  async Start() {
    this.isStart = true;

    while (this.isStart) {
      await this.func();
      await this.Sleep(this.time);
    }
  }

  Stop() {
    this.isStart = false;
  }

  private Sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
