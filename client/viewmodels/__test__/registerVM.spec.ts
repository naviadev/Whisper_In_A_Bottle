import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import useRegisterViewModel from "../registerViewModel";

// Initialize a MockAdapter for axios
let mockAxios: MockAdapter;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios
    .onPost("http://localhost:3001/register")
    .reply(200, { success: true });
});

afterEach(() => {
  mockAxios.restore();
  jest.resetAllMocks();
});

jest.mock("../../models/auth/register", () => ({
  default: jest.fn(() => Promise.resolve(true)),
}));

describe("VM TEST", () => {
  it("ID PW CHECK", () => {});
  const { result } = renderHook(() => useRegisterViewModel());
  act(() => {
    result.current.setId("test@example.com");
    result.current.setPassword("password");
  });
  expect(result.current.id).toBe("test@example.com");
  expect(result.current.password).toBe("password");

  it("Invalid Email (1)", async () => {
    const { result } = renderHook(() => useRegisterViewModel());
    await act(async () => {
      result.current.setId("dummy");
      result.current.setPassword("1111");
      await result.current.handleRegister();
    });

    expect(result.current.isRegister).toBe(false);
  });

  it("success Register", async () => {
    const { result } = renderHook(() => useRegisterViewModel());
  });
});
