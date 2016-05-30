"use strict";
class AFlags {
    private _context:string = null;
    private _pattern:RegExp = null;
    public static rx_a = /<a[^>]*>/g;
    public static rx_href = /href=("|')[^"']*("|')/g;
    constructor(context:string,pattern:string=null) {
        this._context = context;
        if(pattern && pattern!=""){
            this._pattern = new RegExp(pattern);
        }
    }
    public setFlags(flags:IFlag):AFlags {
        this._context = this._context.replace(AFlags.rx_a,(link)=>{
            // console.log(link);
            let nl = link.replace(AFlags.rx_href,(href)=>{
                let nh = href.slice(6,href.length-1);
                if(this._pattern && !this._pattern.test(nh)) return href;
                let link = new ALink(nh);
                nh = link.setFlags(flags).toString();
                nh = "href=\""+nh+"\"";
                //console.log(nh);
                return nh;
            })
            //console.log(nl);
            return nl;
        });
        return this;
    }
    public getContext():string{
        return this._context;
    }
}