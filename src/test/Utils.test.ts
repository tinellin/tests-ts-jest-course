import { StringUtils, getStringInfo, toUpperCase } from "../app/Utils";

/* basic test */
describe("Utils test suite", () => {
  it("should return uppercase of valid string", () => {
    // arrange:
    const sut = toUpperCase;
    const expected = "ABC";

    // act:
    const actual = sut('abc')

    // assertion:
    expect(actual).toBe(expected)
  })
})

/* encapsulated tests when very large and logically complex */
describe("getStringInfo for arg My-String should", () => {
  test("return right lowercase", () => {
    const actual = getStringInfo("My-String")
    expect(actual.lowercase).toBe("my-string")
  });

  test("return right uppercase", () => {
    const actual = getStringInfo("My-String")
    expect(actual.uppercase).toBe("MY-STRING")
  })

  test("return right length", () => {
    const actual = getStringInfo("My-String")
    expect(actual.length).toBe(9)
    // other way:
    expect(actual.characters).toHaveLength(9)
  })

  test("return right extrainfo", () => {
    const actual = getStringInfo("My-String")
    expect(actual.extraInfo).toEqual({})
  })

  test ("return right characters", () => {
    const actual = getStringInfo("My-String")
    expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
    expect(actual.characters).toContain<string>('M')
    expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r','i', 'n', 'g', 'M', 'y', '-']))
  })

  test("return defined extraInfo", () => {
    const actual = getStringInfo("My-String")
    // first way:
    expect(actual.extraInfo).not.toBe(undefined)
    // second way:
    expect(actual.extraInfo).not.toBeUndefined()
    // third way:
    expect(actual.extraInfo).toBeDefined()
    // another way:
    expect(actual.extraInfo).toBeTruthy() // but analysis 6 falsy values (false, 0, '', null, undefined, and NaN)
  })
})

/* parametrized test */
describe("ToUpperCase examples", () => {
  it.each([
    { input: "abc", expected: "ABC" },
    { input: "My-String", expected: "MY-STRING" },
    { input: "def", expected: "DEF" }
  ])("$input toUpperCase should be $expected", ({ input, expected }) => {
    const actual = toUpperCase(input);
    expect(actual).toBe(expected)
  })
})

/* using jest hooks */
describe("Utils test suite (2)", () => {
  let sut: StringUtils

  beforeEach(() => {
    sut = new StringUtils();
    console.log("Setup");
  })

  afterEach(() => {
    // can be used to clean mocks
    console.log("Teardown");
  })

  it("Should throw error on invalid argument - function", () => {
    function expectError() { sut.toUpperCase(""); }
    expect(expectError).toThrow("Invalid argument!");
  })

  it("Should throw error on invalid argument - arrow function", ()=>{      
    expect(() => { sut.toUpperCase(""); }).toThrow("Invalid argument!");
  })

  // best fit
  it("Should throw error on invalid argument - try catch block", (done)=>{             
    try {
      sut.toUpperCase("");
      // need to use "done" to say that the test ended with an error
      done("GetStringInfo should throw error for invalid arg!")
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
    }
  })
}) 