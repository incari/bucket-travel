// __mocks__/next/router.ts
import { jest } from "@jest/globals";

const push = jest.fn();
const replace = jest.fn();
const back = jest.fn();
const reload = jest.fn();

const useRouter = jest.fn(() => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  push,
  replace,
  back,
  reload,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}));

export { useRouter };
