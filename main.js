import assert from './assert';
import Controller from './Controller';
import Model from './Model';
import View from './View';

setTimeout(function(){
	let model = new Model();
	let controller = new Controller({ model });
	let canvas = document.getElementById('space');
	let view = new View({model, controller, canvas});
	let show = document.getElementById('show');

	console.log('Starting Loop!');
	controller.startLoop();

});