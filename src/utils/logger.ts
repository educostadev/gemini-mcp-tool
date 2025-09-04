import { LOG_PREFIX } from "../constants.js";

export class Logger {
  private static formatMessage(message: string): string {
    return `${LOG_PREFIX} ${message}`;
  }

  // Always redirect logging to stderr to avoid corrupting JSON-RPC on stdout
  // This is safer for MCP servers than trying to detect the mode
  private static writeToStderr(message: string, ...args: any[]): void {
    const fullMessage = this.formatMessage(message) + 
      (args.length > 0 ? ' ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ') : '');
    process.stderr.write(fullMessage + '\n');
  }

  static log(message: string, ...args: any[]): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(message, ...args);
  }

  static warn(message: string, ...args: any[]): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(message, ...args);
  }

  static error(message: string, ...args: any[]): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(message, ...args);
  }

  static debug(message: string, ...args: any[]): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(message, ...args);
  }

  static toolInvocation(toolName: string, args: any): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr("Raw:", JSON.stringify(args, null, 2));
  }

  static toolParsedArgs(
    prompt: string,
    model?: string,
    sandbox?: boolean,
    changeMode?: boolean,
  ): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(`Parsed prompt: "${prompt}"\nchangeMode: ${changeMode || false}`);
  }

  static commandExecution(
    command: string,
    args: string[],
    startTime: number,
  ): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    this.writeToStderr(
      `[${startTime}] Starting: ${command} ${args.map((arg) => `"${arg}"`).join(" ")}`,
    );

    // Store command execution start for timing analysis
    this._commandStartTimes.set(startTime, { command, args, startTime });
  }

  // Track command start times for duration calculation
  private static _commandStartTimes = new Map<
    number,
    { command: string; args: string[]; startTime: number }
  >();

  static commandComplete(
    startTime: number,
    exitCode: number | null,
    outputLength?: number,
  ): void {
    // Always use stderr to avoid corrupting stdout JSON-RPC
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    this.writeToStderr(`[${elapsed}s] Process finished with exit code: ${exitCode}`);
    if (outputLength !== undefined) {
      this.writeToStderr(`Response: ${outputLength} chars`);
    }

    // Clean up command tracking
    this._commandStartTimes.delete(startTime);
  }
}
