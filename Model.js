import assert from './assert';
import Constants from './Constants';
import SpaceObject from './SpaceObject';
import Vector from './Vector';
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
        this._updateObjectAccelerations({time});
        this.notify();
    }
    _updateObjectPositions({time}) {
        for (let main of this.objects) {
            main.updatePosition({time});

            // handle collisions
            for (let secondary of this.objects) {
                if (main != secondary) {
                    let displacement = main.position.subtract({vector: secondary.position});
                    if (displacement.size() <= main.radius + secondary.radius) {
                        main.position = main.position.add({vector: displacement.multiply({
                            number: (main.radius + secondary.radius) / displacement.size() - 1
                        })});
                    }
                }
            }
        }
    }
    _updateObjectVelocities({time}) {
        for (let obj of this.objects) {
            obj.updateVelocity({time});
        }
    }
    _updateObjectAccelerations({time}){
        for (let main of this.objects) {
            let accelerations = new Set();

            for (let secondary of this.objects) {
                if (main != secondary) {
                    const radius = secondary.position.subtract({vector: main.position});
                    const r = (radius.size() <= 1) ? 1 : radius.size();
                    const a = secondary.mass / (r * r);
                    const acceleration = radius.multiply({number: 1/r}).multiply({number: a});
                    accelerations.add(acceleration);
                }
            }

            main.acceleration = new Vector({x:0, y: 0});
            for (let a of accelerations) {
                main.acceleration = main.acceleration.add({vector: a});
            }

            //main.acceleration = main.acceleration.multiply({number: 10e11});

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