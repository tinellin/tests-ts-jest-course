import { v4 } from "uuid";

export type stringInfo = {
  lowercase: string,
  uppercase: string,
  characters: string[],
  length: number,
  extraInfo: Object | undefined
}

type LoggerServiceCallBack = (arg: string) => void

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

export function calculateComplexity(info: stringInfo): number {
  return Object.keys(info.extraInfo!).length * info.length
}

export function toUpperCaseWithCb(arg: string, callBack: LoggerServiceCallBack) {
  if(!arg) {
      callBack('Invalid argument!');
      return;
  }
  
  callBack(`called function with ${arg}`)
  return arg.toUpperCase();
}

export class OtherStringUtils {
  callExternalService() {
    console.log("Calling external service!!!");
  }

  toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  logString(arg: string) {
    console.log(arg);
  }
}