
class BN{
    m=0;
    e=0;

    constructor(m=0, e=0,fix = true) {
	if(m == 0 || Number.isNaN(m) || m = undefined) {this.m=0,this.e=0; return}
	if(e == 0 || Number.isNaN(e) || e = undefined) {this.m=0,this.e=0; return}
	    
        if(m == Infinity || e == Infinity){
            this.m = 1.79;
            this.e = Math.max(308,e);
            if(e == Infinity) this.e = 1.79e308; 
        }
        else if(m instanceof BN || typeof(m) == "object") {
            this.m = m.m;
            this.e = m.e;
        }
        else{
            this.m = m;
            this.e = e;
        }
        if(fix) this.fix();
    }

    static prase(string){
        let m = string.split("e")
        if(m == "") {
            notify("no input",3,"#ff0000")
            return new BN()
        }
        if(this.isNaN(Number(m[0]))) {
            notify("tryed to add NaN: " + m[0],3,"#ff0000")
            return new BN()
        }
        if(this.isNaN(Number(m[1])) && m[1] != undefined) {
            notify("tryed to add NaN: " + m[1],3,"#ff0000")
            return new BN()
        }
        if(this.isNaN(Number(m[2])) && m[2] != undefined) {
            notify("tryed to add NaN: " + m[2],3,"#ff0000")
            return new BN()
        }
        let e = (typeof m[1] == "string" ? m[1]: "") + (typeof m[2] == "string" ? "e" + m[2]: "" );
        if(e == "") return(new BN(Number(m[0]),0));
        if(m[2] == "" || m[2] == undefined) return(new BN(Number(m[0]),Number(m[1])));
        return new BN(Number(m[0]), Number(e));
    }

	mult(bn) {
        if (typeof bn === "number") bn = new BN(bn)
		this.m = this.m * bn.m;
		this.e = this.e + bn.e;
        return this.fix();
	}

    div(bn) {
        if (typeof bn === "number") bn = new BN(bn)
		this.m = this.m / bn.m;
		this.e = this.e - bn.e;
        return this.fix();
	};

    static div(Bn, bn) {
        if (typeof bn === "number") bn = new BN(bn)
        if (typeof Bn === "number") Bn = new BN(Bn)
        let bignum = {
            m: Bn.m,
            e: Bn.e
        }
        let bignum2 = {
            m: bn.m,
            e: bn.e
        }
		bignum.m = bignum.m / bignum2.m;
		bignum.e = bignum.e - bignum2.e;
        return BN.fix(new BN(bignum));
	};

    add(bn) {
        if (typeof bn === "number") bn = new BN(bn)
        let dif = bn.e - this.e;
        if(bn.m == 0) return this;
        if(dif > 15) {
            this.m = bn.m;
            this.e = bn.e;
            return this;
        }
        if (dif < -15){
            return this;
        }
        this.m = this.m + (bn.m * (10 ** dif));
        return this.fix();
    }

    static add(Bn ,bn) {
        if (typeof bn === "number") bn = new BN(bn)
        if (typeof Bn === "number") Bn = new BN(Bn)
        // so input doesn't get edited
        let bignum = {
            m: Bn.m,
            e: Bn.e
        }
        let bignum2 = {
            m: bn.m,
            e: bn.e
        }
        let dif = bignum2.e - bignum.e;
        if(dif > 15) {
            return new BN(bignum2);
        }
        if (dif < -15){
            return new BN(bignum);
        }
        bignum.m = bignum.m + (bignum2.m * (10 ** dif));
        return BN.fix(new BN(bignum));
    }
    
    sub(bn) {
        if (typeof bn === "number") bn = new BN(bn)
        let dif = bn.e - this.e;
        if(dif > 15) {
            this.m = -bn.m;
            this.e = bn.e;
            return this.fix();
        }
        if (dif < -15){
            return this.fix();
        }
        this.m = this.m - (bn.m * (10 ** dif));
        return this.fix();
    }

    pow(bn = 1) {
        if (typeof bn === "number") bn = new BN(bn)

        let m = (bn.m * 10 ** bn.e)
        this.e = (this.e + Math.log10(this.m)) * m;

        this.m = 10 ** (this.e % 1);
        this.e = Math.floor(this.e);

        if(this.gt(this.cap())) return this.cap();
        return this;
    }

    static pow(Bn, bn = 1) {
        if (typeof Bn === "number") Bn = new BN(Bn);
        if (typeof bn === "number") bn = new BN(bn);
        // so input doesn't get edited
        let bignum = {
            m: Bn.m,
            e: Bn.e
        }
        let bignum2 = {
            m: bn.m,
            e: bn.e
        }
        let m = (bignum2.m * 10 ** bignum2.e)
        bignum.e = (bignum.e + Math.log10(bignum.m)) * m;

        bignum.m = 10 ** (bignum.e % 1);
        bignum.e = Math.floor(bignum.e);

        if(new BN(bignum).gt(this.cap())) return this.cap();
        return new BN(bignum);
    }

    root(n) {
        if (n instanceof BN) throw Error("use number not big number for root");
        this.e + Math.log10(this.m) / n;
        return this.fix();
    }
     
    static root(bn, n) {
        if (n instanceof BN) throw Error("use number not big number for root");
        if(typeof bn == "number") bn = new BN(bn);
        let c = (bn.e + Math.log10(bn.m)) / n;
        return BN.fix(new BN(1,c));
    }

    log(n = 10) {
        if (n instanceof BN) throw Error("use number not big number for log");
        if(n==0) console.warn("log used zero");
        if(this.e < 0) return new BN(0,0,false);
        this.m = (this.e + Math.log10(this.m)) / Math.log10(n);
        this.e = 0;
        return this.fix();
    }

    static log(bn = new BN(1,1),n = 10) {
        if (n instanceof BN) throw Error("use number not big number for log");
        if(n==0) console.warn("log used zero");
        if(typeof bn == "number") bn = new BN(bn);
        // so input doesn't get edited
        let bignum = {
            m: bn.m,
            e: bn.e
        }
        if(bignum.e < 0) return new BN(0,0,false);

        bignum.m = (bignum.e + Math.log10(bignum.m)) / Math.log10(n);
        bignum.e = 0;

        return BN.fix(new BN (bignum));
    }

    fix(){
        if ((Math.abs(this.m) >= 10 || (Math.abs(this.m) <= 1 && (Math.abs(this.m) != 0)) ) || this.e % 1 != 0) {
            this.e += Math.log10(Math.abs(this.m));
            this.m = 10 ** (this.e % 1);
            
            if (this.e < 0) this.e = Math.ceil(this.e);
            this.e = Math.floor(this.e);
        }

        if(this.gt(this.cap())) {
            this.m = this.cap().m;
            this.e = this.cap().e;
        }
        
        return this;
    }

    static fix(bn = new BN){

        if ( (Math.abs(bn.m) >= 10 || (Math.abs(bn.m) <= 1 && (Math.abs(bn.m) != 0))  ) || bn.e % 1 != 0) {
            bn.e += Math.log10(Math.abs(bn.m));
            bn.m = 10 ** (bn.e % 1);
            
            if (bn.e < 0) bn.e = Math.ceil(bn.e);
            bn.e = Math.floor(bn.e);
        }
        if(bn.e % 1 != 0){
            bn.e += Math.log10(Math.abs(bn.m));
            bn.m = 10 ** (bn.e % 1);
            
            if (bn.e < 0) bn.e = Math.ceil(bn.e);
            bn.e = Math.floor(bn.e);
        }
        if(bn.gt(this.cap())) return this.cap();
        return bn;
    }

    toString(type = 0,min = 5) {
        if(this.e > 1e6){
            let m = this.m.toFixed(1).toString();
            let e = Math.log10(this.e);
            return m + "e" + (10 ** (e % 1) ).toFixed(2).toString() + "e" + Math.floor(e).toString();
        }

        if(type == 0){
            if (Math.abs(this.e) <= min) return (this.m * 10 ** this.e).toFixed(2).toString()
            return this.round(2).toString() + "e" + this.e.toString();
        }
        if(type == 1){
            if (Math.abs(this.e) <= min) return (this.m * 10 ** this.e).toFixed(2).toString()
            return this.round(2).toString() + "e" + this.e.toString();
        }
        
    }

    round(r = 2){
        if (this.e > 5) return this.m.toFixed(r);
        if(this.m % 1 != 0) return Math.floor(this.m);
        return this.m.toFixed(this.e + r);
    }
    
    toFixed(r = 2){
        if (this.e > 5) return this.m.toFixed(r);
        if(this.m % 1 != 0) return Math.floor(this.m);
        return this.m.toFixed(this.e + r);
    }

    gt( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn)
        if(isNaN(this.m) || isNaN(this.e)) return false;
        if(this.e > bn.e) return true;
        if(this.e == bn.e){
            if(this.m > bn.m) return true;
        }
        return false;
    }

    lt( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn)
        if(isNaN(this.m) || isNaN(this.e)) return false;
        if(this.e < bn.e) return true;
        if(this.e == bn.e){
            if(this.m < bn.m) return true;
        }
        return false;
    }

    eq( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn)
        if(isNaN(this.m) || isNaN(this.e)) return false;
        if(this.e == bn.e && this.m == bn.m) return true;
        return false;
    }
    gte( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn)
        if(isNaN(this.m) || isNaN(this.e)) return false;
        if(this.e > bn.e) return true;
        if(this.e == bn.e){
            if(this.m > bn.m) return true;
        }
        if(this.e == bn.e && this.m == bn.m) return true;
        return false;
    }

    lte( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn)
        if(isNaN(this.m) || isNaN(this.e)) return false;
        if(this.e < bn.e) return true;
        if(this.e == bn.e){
            if(this.m < bn.m) return true;
        }
        if(this.e == bn.e && this.m == bn.m) return true;
        return false;
    }

    isNaN(){
        if(isNaN(this.m) || isNaN(this.e)) return true;
        return false;
    }

    static isNaN( bn = new BN){
        if (typeof bn === "number") bn = new BN(bn);
        if(isNaN(bn.m) || isNaN(bn.e)) return true;
        return false;
    }

    isInfinity(){
        if(this.e = Infinity) return true;
        return false;
    }

    static min(l,r){
        if (typeof l === "number") l = new BN(l);
        if (typeof r === "number") r = new BN(r);
        if(l.lt(r)) return l;
        return r;
    }
    static max(l,r){
        if (typeof l === "number") l = new BN(l);
        if (typeof r === "number") r = new BN(r);
        if(l.gt(r)) return l;
        return r;
    }

    cap(){
        if(!this.g) return  player.challenge.doomed ? new BN(1,1e308,false) : new BN(1.8,308,false);
        return new BN(1,1.79e308,false);
    }
    static cap(){
        if(!ups[24].brought) return new BN(1.8,308,false);
        return new BN(1,1.79e308,false);
    }
    get g(){
        if(ups[24] == undefined ) return true;
        return ups[24].brought;
    }
}
var br = false;
var ups = [];
