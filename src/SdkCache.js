"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const memory_cache_1 = tslib_1.__importDefault(require("memory-cache"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const interface_1 = require("./interface");
const debuglog_1 = require("./debuglog");
class SdkCache {
    constructor(aria) {
        this.aria = aria;
        // run first cache
        this.cacheTasks().subscribe(() => {
            debuglog_1.debuglog('cache done');
        });
    }
    getTask(name) {
        const taskMap = memory_cache_1.default.get(interface_1.CacheKey.task);
        const task = taskMap[name];
        if (!task) {
            return rxjs_1.of(null);
        }
        return this.aria.getStatus(task.gid);
    }
    cacheTasks() {
        return this.getAllTask().pipe(operators_1.tap((list) => {
            memory_cache_1.default.put(interface_1.CacheKey.task, lodash_1.keyBy(list, 'name'));
        }));
    }
    getAllTask() {
        return rxjs_1.forkJoin(this.aria.getOneStatus('tellActive'), this.aria.getOneStatus('tellWaiting'), this.aria.getOneStatus('tellStopped')).pipe(operators_1.map(([active, waiting, stopped]) => {
            return [
                ...SdkCache.transformResult(active.result),
                ...SdkCache.transformResult(waiting.result),
                ...SdkCache.transformResult(stopped.result),
            ];
        }));
    }
    static transformResult(arr) {
        return arr.map(({ gid, status, files: [{ path }], dir, completedLength, totalLength }) => {
            return {
                gid,
                status,
                completedLength,
                totalLength,
                percentage: completedLength / totalLength,
                name: path.replace(`${dir}/`, ''),
                dir,
                path,
            };
        });
    }
}
exports.SdkCache = SdkCache;

//# sourceMappingURL=SdkCache.js.map
