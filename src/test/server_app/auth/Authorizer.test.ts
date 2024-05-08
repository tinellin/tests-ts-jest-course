import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";

// SessionTokenDataAccess mocks:
const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();

jest.mock("../../../app/server_app/data/SessionTokenDataAccess", () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
        generateToken: generateTokenMock,
        invalidateToken: invalidateTokenMock
      }
    })
  }
});

// UserCredentialsDataAccess mocks:
const addUserMock = jest.fn();
const getUserByUserNameMock = jest.fn();

jest.mock("../../../app/server_app/data/UserCredentialsDataAccess", () => {
  return {
    UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
      return {
        addUser: addUserMock,
        getUserByUserName: getUserByUserNameMock
      }
    })
  }
})

describe("Authorizer test suite", () => {
  let sut: Authorizer;

  const fakeTokenId = "1234"
  const fakeUserId = "0001"

  const someUser = {
    userName: "someUserName",
    password: "somePassword"
  }

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1);
    expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should validate token", async () => {
    isValidTokenMock.mockResolvedValueOnce(fakeTokenId)

    const actual = await sut.validateToken(fakeTokenId);
    
    expect(actual).toBe(fakeTokenId);
    expect(isValidTokenMock).toHaveBeenCalledTimes(1)
  })

  it("should return id for new registered user", async () => {
    addUserMock.mockResolvedValueOnce(fakeUserId)

    const { userName, password } = someUser;

    const actual = await sut.registerUser(userName, password);

    expect(actual).toBe(fakeUserId)
    expect(addUserMock).toHaveBeenCalledWith({
      id: '',
      password: password,
      userName: userName
    })
    expect(addUserMock).toHaveBeenCalledTimes(1)
  })

  it("should return tokenId for valid credentials", async () => {
    getUserByUserNameMock.mockResolvedValueOnce(someUser)
    generateTokenMock.mockResolvedValue(fakeTokenId)

    const actual = await sut.login(someUser.userName, someUser.password);

    expect(actual).toBe(fakeTokenId)
    expect(getUserByUserNameMock).toHaveBeenCalledTimes(1)
    expect(generateTokenMock).toHaveBeenCalledTimes(1)
  })

  it('should return undefined for invalid credentials', async () => {
    getUserByUserNameMock.mockResolvedValueOnce(someUser)
    generateTokenMock.mockResolvedValueOnce(fakeTokenId);

    const actual = await sut.login(someUser.userName, 'someOtherPassword');

    expect(actual).toBeUndefined();
  });

  it("should logout user", async () => {
    invalidateTokenMock.mockResolvedValueOnce(fakeTokenId)

    await sut.logout(fakeTokenId);

    expect(invalidateTokenMock).toHaveBeenCalledTimes(1)
  })
})