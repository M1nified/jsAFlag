"use strict";
class AFlags {
    constructor(context, pattern = null) {
        this._context = null;
        this._pattern = null;
        this._context = context;
        if (pattern && pattern != "") {
            this._pattern = new RegExp(pattern);
        }
    }
    setFlags(flags) {
        this._context = this._context.replace(AFlags.rx_a, (link) => {
            let nl = link.replace(AFlags.rx_href, (href) => {
                let nh = href.slice(6, href.length - 1);
                if (this._pattern && !this._pattern.test(nh))
                    return href;
                let link = new ALink(nh);
                nh = link.setFlags(flags).toString();
                nh = "href=\"" + nh + "\"";
                return nh;
            });
            return nl;
        });
        return this;
    }
    getContext() {
        return this._context;
    }
}
AFlags.rx_a = /<a[^>]*>/g;
AFlags.rx_href = /href=("|')[^"']*("|')/g;
"use strict";
class ALink {
    constructor(link) {
        this._flags = {};
        this._hash = "";
        this._flags = ALink.parseFlags(link);
        this._hash = ALink.parseHash(link);
        this._domain = ALink.parseDomain(link);
        this._path = ALink.parsePath(link);
    }
    static parseFlags(link) {
        let cf = link.match(ALink.rx_get);
        if (!cf || cf.length === 0)
            return {};
        let cflags = {};
        cf.forEach((val, i, arr) => {
            let split = val.split("=");
            cflags[split[0]] = split[1];
        });
        return cflags;
    }
    static parseHash(link) {
        let hasharr = link.match(ALink.rx_hash);
        if (!hasharr || hasharr.length === 0)
            return null;
        let hash = hasharr[0];
        return hash.slice(1);
    }
    static parseDomain(link) {
        let http = ALink.rx_http.exec(link);
        http = http && http.length > 0 ? http[0] : "";
        let dom = link.slice(http.length);
        dom = dom.split(/\/|\\|\?|#/, 1);
        dom = dom && dom.length > 0 ? dom[0] : "";
        return http + dom;
    }
    static parsePath(link, domain = null) {
        if (!domain) {
            domain = ALink.parseDomain(link);
        }
        let cl = link.replace(domain, '').replace('\\', '/');
        let patharr = cl.match(ALink.rx_path);
        if (!patharr || patharr.length === 0)
            return null;
        let path = patharr[0];
        return path;
    }
    toString() {
        return this._domain + this.pathToString() + this.flagsToString() + this.hashToString();
    }
    flagsToString() {
        let keys = Object.keys(this._flags);
        if (keys.length == 0)
            return "";
        let elems = [];
        for (let key of keys) {
            elems.push(key + "=" + this._flags[key]);
        }
        let str = elems.join("&");
        return "?" + str;
    }
    hashToString() {
        return this._hash && this._hash !== "" ? "#" + this._hash : "";
    }
    pathToString() {
        return (this._path || '');
    }
    setFlags(flags) {
        let keys = Object.keys(flags);
        for (let key of keys) {
            this._flags[key] = flags[key];
        }
        return this;
    }
}
ALink.rx_get = /\w*=\w*/g;
ALink.rx_hash = /#[\w-]*/g;
ALink.rx_http = /^\w*:\/\//;
ALink.rx_path = /\/[^\?#]*/;
//# sourceMappingURL=jsAFlag.js.map