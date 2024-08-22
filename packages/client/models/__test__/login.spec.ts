import PlayerDTO from "../../../../shared/dtos/player.dto";
import LoginAxios from "../services/auth/loginAxios";

describe("login test", () => {
  const dummyUser: PlayerDTO = {
    id: "dummy",
    password: "1111",
  };

  const originalFetch = global.fetch;

  //! 테스트로 인한 오염된 global.fetch를 되돌린다.
  afterAll(() => {
    global.fetch = originalFetch;
  });

  //* 네트워크 통신 에러 상황일 떄 테스트
  it("login Error test", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    global.fetch = mockFetch;
    await expect(LoginAxios(dummyUser)).rejects.toThrow();
  });

  //* 로그인 성공일때 테스트
  it("login Success test", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    global.fetch = mockFetch;
    await expect(LoginAxios(dummyUser)).resolves.toBe(true);
  });

  //* 로그인 실패일때 테스트
  it("login Filed test", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 400,
    });

    global.fetch = mockFetch;
    await expect(LoginAxios(dummyUser)).resolves.toBe(false);
  });
});
