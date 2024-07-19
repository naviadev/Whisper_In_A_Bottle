/**
 * ! 매개변수 func는 request와 관련된 비동기 함수여야 합니다.
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
