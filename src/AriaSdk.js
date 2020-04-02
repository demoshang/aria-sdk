"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const Aria_1 = require("./Aria");
const debuglog_1 = require("./debuglog");
const SdkCache_1 = require("./SdkCache");
class AriaSdk extends Aria_1.Aria {
    constructor(url, token) {
        super(url, token);
        this.sdkCache = new SdkCache_1.SdkCache(this);
    }
    add({ name, url, page, headers = '', }) {
        return this.sdkCache.getTask(name).pipe(operators_1.map((task) => {
            debuglog_1.debuglog('task: ', task);
            if (!task) {
                return undefined;
            }
            return Object.assign(Object.assign({}, task.result), { removeUris: task.result.files[0].uris.map(({ uri }) => {
                    return uri;
                }) });
        }), operators_1.concatMap((taskResult) => {
            if (!taskResult) {
                debuglog_1.debuglog('addUri: ', {
                    name,
                    page,
                    url,
                    headers,
                });
                return this.addUri(url, name, `Origin: ${page}\n${headers}`).pipe(operators_1.switchMap(() => {
                    return this.sdkCache.cacheTasks();
                }));
            }
            debuglog_1.debuglog('changeUrl', { name, page, url });
            const { gid, removeUris } = taskResult;
            return this.changeUri(gid, url, removeUris);
        }));
    }
    getErrorList() {
        return this.getOneStatus('tellStopped').pipe(operators_1.map((list) => {
            return list.result
                .filter(({ status }) => {
                return status === 'error';
            })
                .map(({ files }) => {
                return files;
            });
        }));
    }
}
exports.AriaSdk = AriaSdk;

//# sourceMappingURL=AriaSdk.js.map
