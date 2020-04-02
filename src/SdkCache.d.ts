import { Observable } from 'rxjs';
import { Aria, StatusResult } from './Aria';
declare class SdkCache {
    private aria;
    constructor(aria: Aria);
    getTask(name: string): Observable<{
        result: StatusResult;
    } | null>;
    cacheTasks(): Observable<{
        gid: string;
        status: string;
        completedLength: number;
        totalLength: number;
        percentage: number;
        name: string;
        dir: string;
        path: string;
    }[]>;
    private getAllTask;
    private static transformResult;
}
export { SdkCache };
