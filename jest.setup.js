// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";


class ResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserver;
