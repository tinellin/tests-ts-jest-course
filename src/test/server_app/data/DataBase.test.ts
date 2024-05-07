import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from '../../../app/server_app/data/IdGenerator'; 

type someTypeWithId = {
  id: string,
  name: string,
  color: string,
}

describe("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>
  const fakeId = "1234"

  const someObject1: someTypeWithId = {
    id: '',
    name: "someName",
    color: "red"
  }

  const someObject2: someTypeWithId = {
    id: '',
    name: "someOtherName",
    color: "red"
  }

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId)
  })

  it("should return id after insert", async () => {
    const actual = await sut.insert({
      id: ''
    } as any)

    expect(actual).toBe(fakeId)
  })

  it("should get element after insert", async () => {
    const id = await sut.insert(someObject1)
    const actual = await sut.getBy('id', id);
    expect(actual).toBe(someObject1)
  })

  it("should find all elements with the same property", async () => {
    await sut.insert(someObject1)
    await sut.insert(someObject2)

    const expected = [someObject1, someObject2]

    const actual = await sut.findAllBy('color','red')
    expect(actual).toEqual(expected)
  })

  it("should update color on object", async () => {
    const id = await sut.insert(someObject1);
    const expectedColor = "red";

    sut.update(id, "color", expectedColor);
    const object = await sut.getBy("id", id);

    expect(object?.color).toBe(expectedColor);
  })

  it("should delete object by id", async () => {
    const id = await sut.insert(someObject1);
    await sut.delete(id);

    const obj = await sut.getBy("id", id);
    expect(obj).toBeUndefined()
  })

  it("should get all elements", async () => {
    await sut.insert(someObject1)
    await sut.insert(someObject2)

    const expected = [someObject1, someObject2];

    const actual = await sut.getAllElements();
    
    expect(actual).toEqual(expected);
  })
})