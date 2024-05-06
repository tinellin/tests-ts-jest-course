import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    /* code coverage shows how tested our code is  */
    collectCoverage: true,
    collectCoverageFrom: [
      "<rootDir>/src/app/**/*.ts"
  ],
}

export default config;