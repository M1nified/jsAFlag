declare class AFlags {
    private _context;
    private _pattern;
    static rx_a: RegExp;
    static rx_href: RegExp;
    constructor(context: string, pattern?: string);
    setFlags(flags: IFlag): AFlags;
    getContext(): string;
}
interface IFlag {
    [index: string]: string;
}
declare class ALink {
    static rx_get: RegExp;
    static rx_hash: RegExp;
    static rx_http: RegExp;
    static rx_path: RegExp;
    private _domain;
    private _path;
    private _flags;
    private _hash;
    constructor(link: string);
    static parseFlags(link: string): IFlag;
    static parseHash(link: string): string;
    static parseDomain(link: string): string;
    static parsePath(link: string, domain?: string): string;
    toString(): string;
    flagsToString(): string;
    hashToString(): string;
    pathToString(): string;
    setFlags(flags: IFlag): ALink;
}
