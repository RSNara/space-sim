import Vector from './Vector';
import Constants from './Constants'

export default
class SpaceObject {
	constructor({mass, density, position, velocity, acceleration}) {
		this.position = new Vector(position);
		this.velocity = new Vector(velocity);
		this.acceleration = new Vector(acceleration);
		
		Object.defineProperties(this, {
			'mass': {
				value: mass,
				enumerable: true,
			},
			'density': {
				value: density,
				enumerable: true,
			},
			'radius': {
				value: Math.sqrt(mass / (4 * Math.PI * density)),
				enumerable: true,
			}
		});
	}
	updatePosition({time}){
		let position = {x:0, y:0};
		position.x = 0.5*this.acceleration.x*time*time + this.velocity.x*time + this.position.x;
		position.y = 0.5*this.acceleration.y*time*time + this.velocity.y*time + this.position.y;
		this.position = new Vector(position);		
	}
	updateVelocity({time}){
		let velocity = {x:0, y:0};
		velocity.x = this.acceleration.x*time + this.velocity.x;
		velocity.y = this.acceleration.y*time + this.velocity.y;

		if (this.position.y <= this.radius) {
			velocity.y = Math.abs(velocity.y);
		} else if (this.position.y >= Constants.space.height - this.radius) {
			velocity.y = -Math.abs(velocity.y);
		} 

		if (this.position.x <= this.radius) {
			velocity.x = Math.abs(velocity.x);
		} else if (this.position.x >= Constants.space.width - this.radius) {
			velocity.x = - Math.abs(velocity.x);
		}

		this.velocity = new Vector(velocity);		
	}
}