"use strict";
/**
 * Link
 */
interface IFlag{
    [index:string]:string
}
class ALink {
    public static rx_get = /\w*=[^&#=]*/g;
    public static rx_hash = /#[\w-]*/g;
    public static rx_http = /^\w*:\/\//;
    public static rx_path = /\/[^\?#]*/;
    private _domain:string;
    private _path:string;
    private _flags:IFlag = {};
    private _hash:string = "";
    constructor(link:string) {
        this._flags = ALink.parseFlags(link);
        this._hash = ALink.parseHash(link);
        this._domain = ALink.parseDomain(link);
        this._path = ALink.parsePath(link);
    }
    
    public static parseFlags(link:string):IFlag{
        let cf:any[] = link.match(ALink.rx_get);
        if(!cf || cf.length === 0) return {};
        let cflags:IFlag = {};
        cf.forEach((val,i,arr)=>{
            let split = val.split("=");
            cflags[split[0]] = split[1]; 
        })
        return cflags;
    }
    public static parseHash(link:string):string{
        let hasharr:any[]=link.match(ALink.rx_hash);
        if(!hasharr || hasharr.length === 0) return null;
        let hash:string = hasharr[0];
        return hash.slice(1);
    }
    public static parseDomain(link:string):string{
        let http:any = ALink.rx_http.exec(link);
        http = http && http.length>0 ? http[0] : "";
        let dom:any = link.slice(http.length);
        dom = dom.split(/\/|\\|\?|#/,1);
        dom = dom && dom.length>0 ? dom[0] : "";
        return http + dom;
    }
    public static parsePath(link:string,domain:string=null):string{
        if(!domain){
            domain = ALink.parseDomain(link);
        }
        let cl = link.replace(domain,'').replace('\\','/');
        let patharr:any[] = cl.match(ALink.rx_path);
        if(!patharr || patharr.length === 0) return null;
        let path:string = patharr[0];
        return path;
    }
    
    public toString():string{
        return this._domain+this.pathToString()+this.flagsToString()+this.hashToString();
    }
    public flagsToString():string{
        let keys = Object.keys(this._flags);
        if(keys.length == 0) return "";
        let elems:string[] = [];
        for(let key of keys){
            elems.push(key+"="+this._flags[key]);
        }
        let str = elems.join("&");
        return "?"+str;
    }
    public hashToString():string{
        return this._hash && this._hash !== "" ? "#"+this._hash : "";
    }
    public pathToString():string{
        return (this._path||'');
    }
    public setFlags(flags:IFlag):ALink{
        let keys = Object.keys(flags);
        for(let key of keys){
            this._flags[key] = flags[key];
        }
        return this;
    }
}

// try{
//     module.exports = ALink;
// }catch(e){
//     //this is not a node.js server
// }