export class StringUtils {
  public toUpperCase(arg: string): string {
    if (!arg) {
      throw new Error("Invalid argument!");
    }

    return toUpperCase(arg);
  }
} 

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export type stringInfo = {
  lowercase: string,
  uppercase: string,
  characters: string[],
  length: number,
  extraInfo: Object | undefined
}

/* istanbul ignore next */
export function getStringInfo(arg: string): stringInfo{
  return {
      lowercase: arg.toLowerCase(),
      uppercase: arg.toUpperCase(),
      characters: Array.from(arg),
      length: arg.length,
      extraInfo: {}
  }
} 