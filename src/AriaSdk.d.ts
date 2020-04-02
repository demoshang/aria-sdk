import { Observable } from 'rxjs';
import { Aria } from './Aria';
declare class AriaSdk extends Aria {
    private sdkCache;
    constructor(url: string, token?: string);
    add({ name, url, page, headers, }: {
        name: string;
        url: string;
        page: string;
        headers?: string;
    }): Observable<any>;
    getErrorList(): Observable<import("./Aria").File[][]>;
}
export { AriaSdk };
