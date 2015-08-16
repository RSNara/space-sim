import Observer from './Observer';
import Constants from './Constants';
import Vector from './Vector';

export default
class View extends Observer {
	constructor({model, controller, canvas}) {
		super();
		const self = this;

		model.subscribe({observer: this});
		self.model = model;
		self.controller = controller;
		self.canvas = canvas;
		self.context = canvas.getContext('2d');
		self.velocityArrow = {
			start: new Vector({x:0, y:0}),
			end: new Vector({x:0, y:0})
		};

		self._setupMouseInputHandlers();
	}
	update() {
		const self = this;
		self.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let object of this.model.objects) {
			self._drawObject({object});
		}
		self._drawVelocityArrow();
	}
	_drawObject({object}) {
		let path = new Path2D();
		path.arc(
			object.position.x, object.position.y,
			object.radius,
			0, 2*Math.PI
		);
		this.context.fill(path);
	}
	_drawVelocityArrow() {
		let path = new Path2D();
		const { start, end } = this.velocityArrow;
		path.moveTo(start.x, start.y);
		path.lineTo(end.x, end.y);
		this.context.stroke(path);
	}
	_mousePositionOnCanvas({event}){
		const x = event.pageX - this.canvas.offsetLeft;
		const y = event.pageY - this.canvas.offsetTop;
		return new Vector({x, y});
	}
	_setupMouseInputHandlers(){
		const self = this;
		let dragging = false;
		let clicked = false;
		let initialPosition;

		self.canvas.addEventListener('mousedown', function(event){
			initialPosition = self._mousePositionOnCanvas({event});
			self.velocityArrow = {
				start: new Vector(initialPosition),
				end: new Vector(initialPosition)
			};
			clicked = true;
		});

		self.canvas.addEventListener('mousemove', function(event){
			if (clicked) {
				dragging = true;
				self.velocityArrow.end = self._mousePositionOnCanvas({event});
			}
		});

		self.canvas.addEventListener('mouseup', function(event){
			const mousePosition = self._mousePositionOnCanvas({event});
			const mass = self._getMass();
			const density = self._getDensity();
			let velocity = new Vector({x:0, y:0});

			if (dragging) {
				velocity = mousePosition.subtract({vector: initialPosition});
			} 

			self.controller.addObject({mass, density, position: initialPosition, velocity});

			// reset state
			dragging = false;
			clicked = false;
			self.velocityArrow.end = self.velocityArrow.start; 
		});
	}
	_getMass() {
		const el = document.getElementById('mass');
		const density = this._getDensity();
		let mass = Math.pow(Math.E, 3 * (Number(el.value)/100 - 1)) * Math.pow(Math.min(this.canvas.width, this.canvas.height), 2) * Math.PI * density / 32;
		return mass;
	}
	_getDensity() {
		return 1;
	}
}