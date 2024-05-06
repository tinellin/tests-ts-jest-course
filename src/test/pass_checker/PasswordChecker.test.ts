import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  })

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("123456A");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  })

  it("Password with more than 8 chars is valid", () => {
    const actual = sut.checkPassword("1234567Ab");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  })

  it("Password with no upper case letter is invalid", () => {
    const actual = sut.checkPassword("1234567abc");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE);
  })
  
  it("Password with at least one upper case letter is valid", () => {
    const actual = sut.checkPassword("1234567Abc");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
  })

  it("Password with no lower case letter is invalid", () => {
    const actual = sut.checkPassword("1234567AB");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE);
  })

  it("Password with at least one lower case letter is valid", () => {
    const actual = sut.checkPassword("1234567Ab");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
  })

  it('Complex password is valid', () => {
    const actual = sut.checkPassword('1234abcD');
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });
  
  it("Admin password with no number is invalid", () => {
    const actual = sut.checkAdminPassword("abcdABCD");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  })

  it("Admin password with at least one number is valid", () => {
    const actual = sut.checkAdminPassword("abcdABCD7");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  })
})