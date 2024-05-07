/* mocking the entire module */

import * as OtherUtils from '../../app/doubles/OtherUtils';

jest.mock("../../app/doubles/OtherUtils", () => ({
  /* all functions must preserve their functionality, except one that I must mock */
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => { return 10 } // mock the return
}))

jest.mock("uuid", () => ({
  v4: () => "123"
}))

describe("module tests", () => {
  
  it("calculate complexity", () => {
    const result = OtherUtils.calculateComplexity({} as  any); // using stub
    expect(result).toBe(10);
  })

  it("keep other functions", () => {
    const result = OtherUtils.toUpperCase('abc'); // using stub
    expect(result).toBe('ABC')
  })

  it("string with id", () => {
    const result = OtherUtils.toLowerCaseWithId("abc");
    expect(result).toBe("abc123")
  })
})