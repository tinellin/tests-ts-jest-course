import { OtherStringUtils, calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/OtherUtils"

/* using stubs */
describe("OtherUtils test suite", () => {

  /* Here, the calculation only needs length and extrainfo */
  it("calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo"
      }
    }

    /* In general, we use stubs when we don't need to fill an object completely */
    const actual = calculateComplexity(someInfo as any) // therefore using stub (as any)

    expect(actual).toBe(10)
  });

  /* using fake */
  it ("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {}); // fake callback fc with () => {}
    expect(actual).toBeUndefined();
  });

  it ("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {}); // fake callback fc with () => {}
    expect(actual).toBe("ABC");
  });

  /* using mocks: mocks don't preserve the original function  */
  describe.only('Tracking callbacks with Jest mocks', ()=>{

    const callBackMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('calls callback for invalid argument - track calls', () => {
        const actual = toUpperCaseWithCb('', callBackMock);
        expect(actual).toBeUndefined();
        expect(callBackMock).toHaveBeenCalledWith('Invalid argument!')
        expect(callBackMock).toHaveBeenCalledTimes(1);
    })

    it('calls callback for valid argument - track calls', () => {
        const actual = toUpperCaseWithCb('abc', callBackMock);
        expect(actual).toBe('ABC')

        expect(callBackMock).toHaveBeenCalledWith('called function with abc')
        expect(callBackMock).toHaveBeenCalledTimes(1);
    })
  });

  /* using spies: spies preserve the original function */
  describe.only('OtherStringUtils tests with spies', ()=>{

    let sut: OtherStringUtils

    beforeEach(()=>{
        sut = new OtherStringUtils();
    });

    /* using spy to  track calls */
    test('Use a spy to track calls', () => {
        const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
        sut.toUpperCase('asa');
        expect(toUpperCaseSpy).toHaveBeenCalledWith('asa');
    });

    test('Use a spy to track calls to other module', ()=>{
        const consoleLogSpy = jest.spyOn(console, 'log');
        sut.logString('abc');
        expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    /* using spy to replace the implementation of a method */
    test('Use a spy to replace the implementation of a method', ()=>{
        jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
            console.log('calling mocked implementation!!!')
        });

        sut.callExternalService();
    });
  });
})