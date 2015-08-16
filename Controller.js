import Model from './Model'

export default 
class Controller {
	constructor({model}) {
		this.model = model;
		this._loop = false;
	}
	startLoop() {
		let self = this;
		self._loop = true;
		(function loop(time){
			requestAnimationFrame(function(now){
				const delta = (now - time)/1000;
				self.model.updateObjects({time: delta});
				if (self._loop) {
					loop(now);
				}
			});	
		})(0);
	}
	endLoop() {
		this._loop = false;
	}
	addObject({mass, density, position, velocity}){
		this.model.addObject({mass, density, position, velocity});
		this.model.updateObjects({time:0});
	}
}