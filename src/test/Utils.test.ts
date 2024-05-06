import { getStringInfo, toUpperCase } from "../app/Utils";

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

/* 
  * No Jest, usamos (assertion) Matchers.toBe para tipos primitivos
  * Para estruturas de dados mais complexas, e.g. objetos usamos o .toEqual
*/