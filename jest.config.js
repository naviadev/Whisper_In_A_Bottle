module.exports = {
  projects: [
    '<rootDir>/client',
    '<rootDir>/server',
    // 다른 프로젝트 디렉토리 추가
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './coverage',
  testEnvironment: 'jsdom',
};
