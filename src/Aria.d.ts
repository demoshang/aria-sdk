import { Observable } from 'rxjs';
export interface File {
    completedLength: string;
    length: string;
    path: string;
    selected: string;
    uris: {
        status: string;
        uri: string;
    }[];
}
export interface StatusResult {
    gid: string;
    dir: string;
    status: string;
    completedLength: number;
    totalLength: number;
    files: File[];
}
export declare type StatusMethod = 'tellActive' | 'tellWaiting' | 'tellStopped';
declare class Aria {
    private url;
    private token;
    private static statusKeys;
    constructor(url: string, token?: string);
    getStatus(gid: string): Observable<{
        result: StatusResult;
    }>;
    changeUri(gid: string, url: string, removeUris: string[]): Observable<any>;
    addUri(url: string, out: string, headers: string): Observable<any>;
    getOneStatus(method: StatusMethod): Observable<{
        result: StatusResult[];
    }>;
    private request;
}
export { Aria };
