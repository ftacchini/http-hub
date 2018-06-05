import { TsHubLogger } from "ts-hub";

export class QuietLogger implements TsHubLogger {
    emergency(...args: any[]): void{}
    alert(...args: any[]): void{}
    crit(...args: any[]): void{}
    error(...args: any[]): void{}
    warning(...args: any[]): void{}
    notice(...args: any[]): void{}
    info(...args: any[]): void{}
    debug(...args: any[]): void{}

}