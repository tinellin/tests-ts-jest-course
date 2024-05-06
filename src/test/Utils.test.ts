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

  it("should return info for valid string", () => {
    const actual = getStringInfo("My-String")

    expect(actual.lowercase).toBe("my-string")
    expect(actual.uppercase).toBe("MY-STRING")
    expect(actual.extraInfo).toEqual({})

    expect(actual.length).toBe(9)
    // other way:
    expect(actual.characters).toHaveLength(9)

    expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
    expect(actual.characters).toContain<string>('M')
    expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r','i', 'n', 'g', 'M', 'y', '-']))

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