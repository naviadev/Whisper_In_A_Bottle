import { renderHook, act } from "@testing-library/react";

import useRegisterViewModel from "../registerViewModel";

/**
 * CHECKLIST
 * [ ] ViewModel Test 진행 .
 * [ ] 중첩 describe 구문을 통해 Model Test 진행
 * [ ] Form 에 추가 후, 추가적인 통합 테스트 진행.
 */

describe("useRegisterViewModel", () => {
  it("initializes with empty strings and false", () => {
    const { result } = renderHook(() => useRegisterViewModel());

    expect(result.current.id).toBe("");
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.passwordCheck).toBe("");
    expect(result.current.isRegister).toBe(false);
  });

  it("updates state variables", () => {
    const { result } = renderHook(() => useRegisterViewModel());

    act(() => {
      result.current.setId("test-id");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.setPasswordCheck("password123");
    });

    expect(result.current.id).toBe("test-id");
    expect(result.current.email).toBe("test@example.com");
    expect(result.current.password).toBe("password123");
    expect(result.current.passwordCheck).toBe("password123");
  });

  it("handles registration", async () => {
    const { result } = renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.setId("test-id");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.setPasswordCheck("password123");

      const success = await result.current.handleRegister();
      expect(success).toBe(true); // Assuming Register function returns true for successful registration
      expect(result.current.isRegister).toBe(true);
    });
  });

  // Add more test cases as needed
});
