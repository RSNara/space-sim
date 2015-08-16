import assert from './assert';
import SpaceObject from './SpaceObject';
import Subject from './Subject';

export default
class Model extends Subject {
    constructor() {
        super();
        Object.defineProperty(this, 'objects', {
            value: new Set(),
            configurable: false,
            enumerable: true,
            writable: false,
        });
    }
    updateObjects({time}){
        this._updateObjectVelocities({time});
        this._updateObjectPositions({time});
        this.notify();
    }
    _updateObjectPositions({time}) {
        for (let obj of this.objects) {
            obj.updatePosition({time});
        }
    }
    _updateObjectVelocities({time}) {
        for (let obj of this.objects) {
            obj.updateVelocity({time});
        }
    }
    addObject({mass, density, position, velocity}) {
        let acceleration = {x:0, y:0};
        assert(position instanceof Object, "Position is of type Object.");
        assert(velocity instanceof Object, "Velocity is of type Object.");
        assert(typeof mass == 'number', "Mass is a number literal.");
        assert(typeof density == 'number', "Density is a number literal.");
        assert(Object.keys(position)[0] === 'x', "The first aspect of Position is x.");
        assert(Object.keys(position)[1] === 'y', "The second aspect of Position is y.");
        assert(Object.keys(velocity)[0] === 'x', "The first aspect of Velocity is x.");
        assert(Object.keys(velocity)[1] === 'y', "The second aspect of Velocity is y.");
        assert(! isNaN(mass), 'The mass isn\'t NaN');
        assert(! isNaN(density), 'The density isn\'t NaN');
        this.objects.add(new SpaceObject({mass, density, position, velocity, acceleration}));
    }
}