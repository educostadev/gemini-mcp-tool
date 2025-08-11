import { describe, it, expect, vi, afterEach } from 'vitest';
import { Logger } from '../src/utils/logger.js';
import { LOG_PREFIX } from '../src/constants.js';

describe('Logger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    { level: 'log', message: 'hello', args: ['world'], expectedMsg: `${LOG_PREFIX} hello\n` },
    { level: 'warn', message: 'warning', args: [], expectedMsg: `${LOG_PREFIX} warning\n` },
    { level: 'error', message: 'problem', args: [], expectedMsg: `${LOG_PREFIX} problem\n` },
    { level: 'debug', message: 'details', args: [], expectedMsg: `${LOG_PREFIX} details\n` },
  ])('uses console.%s for %s', ({ level, message, args, expectedMsg }) => {
    const spy = vi
      .spyOn(console, level as keyof Console)
      .mockImplementation(() => {});
    (Logger[level as keyof typeof Logger] as (...args: any[]) => void)(
      message,
      ...args,
    );
    expect(spy).toHaveBeenCalledWith(expectedMsg, ...args);
  });
});
