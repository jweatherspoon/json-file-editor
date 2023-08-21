import log from 'electron-log';
import { injectable } from 'inversify';

enum Severity {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Debug = 'DEBUG',
}

@injectable()
export class Logger {
  info(msg: string, ...data: any) {
    this.log(Severity.Info, msg, ...data);
  }

  warn(msg: string, ...data: any) {
    this.log(Severity.Warn, msg, ...data);
  }

  error(msg: string, ...data: any) {
    this.log(Severity.Error, msg, ...data);
  }

  debug(msg: string, ...data: any) {
    this.log(Severity.Debug, msg, ...data);
  }

  // eslint-disable-next-line class-methods-use-this
  log(severity: Severity, msg: string, ...data: any) {
    const timestamp = new Date();
    const message = `[${timestamp.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })}] - [${severity}] - ${msg}`;

    log.log(message, ...data);
  }
}
