import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import User from "@shared/DTO/user";

import RegisterModel from "../auth/register";

describe("RegisterModel", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should return true when the server responds with status 200", async () => {
    const registerData: User = {
      id: "test@example.com",
      password: "password123",
    };
    mock.onPost("http://localhost:3001/register").reply(200, true);

    const result = await RegisterModel(registerData);
    expect(result).toBe(true);
  });

  it("should return false when the server responds with a status other than 200", async () => {
    const registerData: User = {
      id: "test@example.com",
      password: "password123",
    };
    mock.onPost("http://localhost:3001/register").reply(400, false);

    const result = await RegisterModel(registerData);
    expect(result).toBe(false);
  });

  it("should return false when an error occurs during the request", async () => {
    const registerData: User = {
      id: "test@example.com",
      password: "password123",
    };
    mock.onPost("http://localhost:3001/register").networkError();

    const result = await RegisterModel(registerData);
    expect(result).toBe(false);
  });
});
