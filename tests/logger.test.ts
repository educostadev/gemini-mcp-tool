import { describe, it, expect, vi, afterEach } from 'vitest';
import { Logger } from '../src/utils/logger.js';
import { LOG_PREFIX } from '../src/constants.js';

describe('Logger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses console.log for log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    Logger.log('hello', 'world');
    expect(spy).toHaveBeenCalledWith(`${LOG_PREFIX} hello\n`, 'world');
  });

  it('uses console.warn for warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    Logger.warn('warning');
    expect(spy).toHaveBeenCalledWith(`${LOG_PREFIX} warning\n`);
  });

  it('uses console.error for error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    Logger.error('problem');
    expect(spy).toHaveBeenCalledWith(`${LOG_PREFIX} problem\n`);
  });

  it('uses console.debug for debug', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    Logger.debug('details');
    expect(spy).toHaveBeenCalledWith(`${LOG_PREFIX} details\n`);
  });
});
