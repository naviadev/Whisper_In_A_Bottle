import { ValidateEmail } from "./ValidateEmail";

describe("ValidateEmail Test", () => {
  it("Email Correct (1)", () => {
    expect(ValidateEmail("dummy@gmail.com")).toBe(true);
  });

  it("Email Correct (2)", () => {
    expect(ValidateEmail("dummy@gmail.co.kr")).toBe(true);
  });

  it("Email Correct (3)", () => {
    expect(ValidateEmail("dummy@gmail.gg")).toBe(true);
  });

  it("Email InCorrect (1)", () => {
    expect(ValidateEmail("dummy")).toBe(false);
  });

  it("Email InCorrect (2)", () => {
    expect(ValidateEmail("dummy@eee")).toBe(false);
  });

  it("Email InCorrect (3)", () => {
    expect(ValidateEmail("dummy@eee.")).toBe(false);
  });
});
