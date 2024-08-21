import ValidateId from "../validators/validateId";

describe("ValidateId Test", () => {
  it("Email Correct (1)", () => {
    expect(ValidateId("dummy@gmail.com")).toBe(true);
  });

  it("Email Correct (2)", () => {
    expect(ValidateId("dummy@gmail.co.kr")).toBe(true);
  });

  it("Email Correct (3)", () => {
    expect(ValidateId("dummy@gmail.gg")).toBe(true);
  });

  it("Email InCorrect (1)", () => {
    expect(ValidateId("dummy")).toBe(false);
  });

  it("Email InCorrect (2)", () => {
    expect(ValidateId("dummy@eee")).toBe(false);
  });

  it("Email InCorrect (3)", () => {
    expect(ValidateId("dummy@eee.")).toBe(false);
  });
});
