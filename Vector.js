export default 
class Vector {
    constructor({x = 0, y = 0} = {}) {
        Object.defineProperties(this, {
            'x': {
                value: x,
                writable: false,
                configurable: false,
                enumerable: true,
            },
            'y': {
                value: y,
                writable: false,
                configurable: false,
                enumerable: true,
            }
        });
    }
    size() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add({vector}) {
        return new Vector({
            x: this.x + vector.x,
            y: this.y + vector.y
        });
    }
    subtract({vector}) {
        return new Vector({
            x: this.x - vector.x,
            y: this.y - vector.y
        });
    }
    multiply({number}){
        return new Vector({
            x: this.x * number,
            y: this.y * number
        });
    }
}