"use strict";
let l1 = "http://www.google.pl?f1=f1v&f2=f2v#sth";
let l2 = "/cos?f=1&f2=#hash";
let l3 = "http://www.statsoft.pl#hash"
let l4 = "http://www.statsoft.pl/cos/dalej?file=1#go"
describe("public static parseFlags ",function(){
    it('should parse flags',()=>{
        expect(ALink.parseFlags(l1)).toEqual({
            f1:'f1v',
            f2:'f2v'
        });
        expect(ALink.parseFlags(l2)).toEqual({
            f:'1',
            f2:''
        })
    })
})
describe("public static parseHash",()=>{
    it('should parse hash',()=>{
        expect(ALink.parseHash(l1)).toBe("sth");
        expect(ALink.parseHash(l2)).toBe("hash");
        expect(ALink.parseHash(l3)).toBe("hash");
    })
})
describe("public static parseDomain",()=>{
    it('should parse domain name',()=>{
        expect(ALink.parseDomain(l1)).toBe("http://www.google.pl");
        expect(ALink.parseDomain(l2)).toBe("");
        expect(ALink.parseDomain(l3)).toBe("http://www.statsoft.pl");
    })
})
describe("public static parsePath",()=>{
    it('should parse path',()=>{
        expect(ALink.parsePath(l2)).toBe("/cos");
        expect(ALink.parsePath(l4)).toBe("/cos/dalej");
    })
})

describe("ALink object",function() {
    let alink1,alink4;
    beforeEach(()=>{
        alink1 = new ALink(l1);
        alink4 = new ALink(l4);
    })
    
    describe("public static setFlags",()=>{
        it('should set given flags',()=>{
            alink1.setFlags({
                nf1:'nf1v'
            })
            expect(alink1._flags).toEqual({
                f1:'f1v',f2:'f2v',
                nf1:'nf1v'
            })
            expect(alink1.toString()).toBe("http://www.google.pl?f1=f1v&f2=f2v&nf1=nf1v#sth");
        })
        it('should set given flag and keep path',()=>{
            alink4.setFlags({
                nf1:'nf1v'
            })
            expect(alink4._flags).toEqual({
                file:'1',
                nf1:'nf1v'
            })
            expect(alink4.toString()).toBe("http://www.statsoft.pl/cos/dalej?file=1&nf1=nf1v#go")
        })
    })
})