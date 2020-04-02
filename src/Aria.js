"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const got_1 = tslib_1.__importDefault(require("got"));
const rxjs_1 = require("rxjs");
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const debuglog_1 = require("./debuglog");
class Aria {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    getStatus(gid) {
        return rxjs_1.from(this.request('tellStatus', gid, Aria.statusKeys));
    }
    changeUri(gid, url, removeUris) {
        return rxjs_1.from(this.request('changeUri', gid, 1, removeUris, [url]));
    }
    addUri(url, out, headers) {
        return rxjs_1.from(this.request('addUri', [url], {
            out,
            header: headers,
        }));
    }
    getOneStatus(method) {
        if (method !== 'tellActive') {
            return rxjs_1.from(this.request(method, 0, 100, Aria.statusKeys));
        }
        return rxjs_1.from(this.request(method, Aria.statusKeys));
    }
    request(method, ...params) {
        const body = {
            jsonrpc: '2.0',
            method: `aria2.${method}`,
            id: v4_1.default(),
            params: this.token ? [`token:${this.token}`, ...params] : params,
        };
        debuglog_1.debuglog('post: %j', { url: this.url, body });
        return got_1.default(this.url, {
            method: 'post',
            responseType: 'json',
            json: body,
        }).json();
    }
}
exports.Aria = Aria;
Aria.statusKeys = ['gid', 'dir', 'status', 'completedLength', 'totalLength', 'files'];

//# sourceMappingURL=Aria.js.map
