import { Authorizer } from "../../../app/server_app/auth/Authorizer"
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler"
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler"
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel"
import { Server } from "../../../app/server_app/server/Server"

jest.mock("../../../app/server_app/auth/Authorizer")
jest.mock("../../../app/server_app/data/ReservationsDataAccess")
jest.mock("../../../app/server_app/handlers/LoginHandler")
jest.mock("../../../app/server_app/handlers/RegisterHandler")
jest.mock("../../../app/server_app/handlers/ReservationsHandler")

const requestMock = {
  url: "",
  headers: {
    "user-agent": "jest-test"
  }
}

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
}

const serverMock = {
  listen: jest.fn(),
  close: jest.fn()
}

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  }
}));

describe("Server test suite", () => {
  let sut: Server

  beforeEach(() => {
    sut = new Server()
    expect(Authorizer).toHaveBeenCalledTimes(1)
    expect(ReservationsDataAccess).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should work by now", async () => {
    await sut.startServer()

    expect(serverMock.listen).toHaveBeenCalledWith(8080);
    expect(responseMock.end).toHaveBeenCalled();
  })

  /**
   * using prototype spies to normally execute methods of private classes
   * it's only work on classes
  */

  it("should handle register requests", async () => {
    requestMock.url = "localhost:8080/register";
    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, "handleRequest");

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);

    /* (_, _, obj as Authorizer) We don't know the data, so we expect it's at least of the authorizer type */ 
    expect(RegisterHandler).toHaveBeenCalledWith(
      requestMock, 
      responseMock, 
      expect.any(Authorizer)); // For that, we use expect.any(...) strategy
  });

  it("should handle login requests", async () => {
    requestMock.url = "localhost:8080/login";
    const handleRequestSpy = jest.spyOn(LoginHandler.prototype, "handleRequest");

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
  });

  it("should handle reservation requests", async () => {
    requestMock.url = "localhost:8080/reservation";
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, "handleRequest");

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(ReservationsHandler).toHaveBeenCalledWith(
        requestMock, 
        responseMock, 
        expect.any(Authorizer),
        expect.any(ReservationsDataAccess));
  });

  it("should do nothing for not supported routes", async () => {
    requestMock.url = "localhost:8080/someRandomRoute";
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, "validateToken");

    await sut.startServer();

    expect(validateTokenSpy).not.toHaveBeenCalled();
  });


  it("should handle errors in serving requests", async () => {
    requestMock.url = "localhost:8080/reservation";
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, "handleRequest");
    handleRequestSpy.mockRejectedValueOnce(
        new Error("Some error")
    )

    await sut.startServer();

    expect(responseMock.writeHead).toHaveBeenCalledWith(
        HTTP_CODES.INTERNAL_SERVER_ERROR, 
        JSON.stringify(`Internal server error: Some error`)
    )
  });

// it("should stop the server if started", async () => {
//       await sut.startServer();

//       await sut.stopServer();

//       expect(serverMock.close).toHaveBeenCalledTimes(1);
//   })
})