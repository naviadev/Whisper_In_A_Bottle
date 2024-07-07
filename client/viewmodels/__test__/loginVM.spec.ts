import { renderHook, act } from "@testing-library/react";

import loginViewModel from "../loginViewModel";

describe("loginViewModel.spec.ts", () => {
  const originalFetch = global.fetch;

  //! 테스트로 인한 오염된 global.fetch를 되돌린다.
  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("Correct Update Id, Password", () => {
    const { result } = renderHook(() => loginViewModel());

    act(() => {
      result.current.setId("test@example.com");
      result.current.setPassword("password");
    });

    expect(result.current.id).toBe("test@example.com");
    expect(result.current.password).toBe("password");
  });

  //* 유효하지 않는 이메일 형식
  it("Invalid Email (1)", async () => {
    const { result } = renderHook(() => loginViewModel());
    await act(async () => {
      result.current.setId("dummy");
      result.current.setPassword("1111");
      await result.current.handleLogin();
    });

    expect(result.current.isLoggedIn).toBe(false);
  });

  //* 아이디, 비번 공백
  it("Invalid Email (2)", async () => {
    const { result } = renderHook(() => loginViewModel());
    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.isLoggedIn).toBe(false);
  });

  it("Valid Email", async () => {
    const { result } = renderHook(() => loginViewModel());
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    global.fetch = mockFetch;
    await act(async () => {
      result.current.setId("test@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.isLoggedIn).toBe(true);
  });
});
