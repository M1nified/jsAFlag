"use strict";
var ALink = (function () {
    function ALink(link) {
        this._flags = {};
        this._hash = "";
        this._flags = ALink.parseFlags(link);
        this._hash = ALink.parseHash(link);
        this._domain = ALink.parseDomain(link);
    }
    ALink.parseFlags = function (link) {
        var cf = link.match(ALink.rx_get);
        if (!cf || cf.length === 0)
            return {};
        var cflags = {};
        cf.forEach(function (val, i, arr) {
            var split = val.split("=");
            cflags[split[0]] = split[1];
        });
        return cflags;
    };
    ALink.parseHash = function (link) {
        var hasharr = link.match(ALink.rx_hash);
        if (!hasharr || hasharr.length === 0)
            return null;
        var hash = hasharr[0];
        return hash.slice(1);
    };
    ALink.parseDomain = function (link) {
        var http = ALink.rx_http.exec(link);
        http = http && http.length > 0 ? http[0] : "";
        var dom = link.slice(http.length);
        dom = dom.split(/\/|\\|\?|#/, 1);
        dom = dom && dom.length > 0 ? dom[0] : "";
        return http + dom;
    };
    ALink.prototype.toString = function () {
        return this._domain + this.flagsToString() + this.hashToString();
    };
    ALink.prototype.flagsToString = function () {
        var keys = Object.keys(this._flags);
        if (keys.length == 0)
            return "";
        var elems = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            elems.push(key + "=" + this._flags[key]);
        }
        var str = elems.join("&");
        return "?" + str;
    };
    ALink.prototype.hashToString = function () {
        return this._hash && this._hash !== "" ? "#" + this._hash : "";
    };
    ALink.prototype.setFlags = function (flags) {
        var keys = Object.keys(flags);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            this._flags[key] = flags[key];
        }
        return this;
    };
    ALink.rx_get = /\w*=\w*/g;
    ALink.rx_hash = /#[\w-]*/g;
    ALink.rx_http = /^\w*:\/\//;
    return ALink;
}());
"use strict";
var AFlags = (function () {
    function AFlags(context, pattern) {
        if (pattern === void 0) { pattern = null; }
        this._context = null;
        this._pattern = null;
        this._context = context;
        if (pattern && pattern != "") {
            this._pattern = new RegExp(pattern);
        }
    }
    AFlags.prototype.setFlags = function (flags) {
        var _this = this;
        this._context = this._context.replace(AFlags.rx_a, function (link) {
            var nl = link.replace(AFlags.rx_href, function (href) {
                var nh = href.slice(6, href.length - 1);
                if (_this._pattern && !_this._pattern.test(nh))
                    return href;
                var link = new ALink(nh);
                nh = link.setFlags(flags).toString();
                nh = "href=\"" + nh + "\"";
                return nh;
            });
            return nl;
        });
    };
    AFlags.rx_a = /<a[^>]*>/g;
    AFlags.rx_href = /href=("|')[^"']*("|')/g;
    return AFlags;
}());
//# sourceMappingURL=main.js.map