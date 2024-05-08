import { IncomingMessage } from "http";
import { getRequestBody } from "../../../app/server_app/utils/Utils";

const requestMock = {
  on: jest.fn()
}

const someObject = {
  name: "John",
  age: 30,
  city: "New York"
}

const someObjectAsString = JSON.stringify(someObject);

/* This test suite shows how to test promises */
describe("getRequestBody test suite", () => {
  it("should return object for valid JSON", async () => {
    requestMock.on.mockImplementation((event: string, cb: (data?: string) => void) => {
      event == "data" ? cb(someObjectAsString) : cb()
    })

    const actual = await getRequestBody(requestMock as any as IncomingMessage)

    expect(actual).toEqual(someObject)
  });

  it("should return error for invalid JSON", async () => {
    requestMock.on.mockImplementation((event: string, cb: (data?: string) => void) => {
      event == "data" ? cb('a' + someObjectAsString) : cb()
    })

    await expect(getRequestBody(requestMock as any)).rejects.toThrow("Unexpected token a in JSON at position 0");
  });

  it("should throw error for unexpected error", async () => {
    const someError = new Error("Something went wrong!");

    requestMock.on.mockImplementation((event: string, cb: (data?: Error) => void) => {
      if (event == "error") {
        cb(someError)
      }
    })  

    await expect(getRequestBody(requestMock as any)).rejects.toThrow(someError.message);
  });
})