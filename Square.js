/**
 * Square.js
 * 
 * Un pequeño motor de videojuegos JavaScript
 * @autor: Roneiser Vargas <roneiserv2.0@gmail.com>
 * @version: 8.0
 */

Square = {}

Square.Game = class Game {

	constructor(game) {

		this.canvas = game.canvas;
		this.canvasRender = this.canvas.getContext('2d');

		this.scene = game.scene;

		this._loop = () => {
			this.clearCanvas();
			this.update();
			this.scene.update(this);
			this.scene.draw(this.canvasRender);
			requestAnimationFrame(this._loop);
		}	
	}

	update() {
		// ...
	}

	clearCanvas() {
		this.canvasRender.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	_init() {
		document.body.appendChild(CANVAS);
		this._loop();
	}
}

Square.Scene = class Scene {

	constructor(scene) {
		this.elements = scene && scene.elements && Array.isArray(scene.elements) ? scene.elements : [];
	}

	update(game) {
		this.elements.forEach(element=>{
			element.update(game);
		})
	}

	draw(canvasRender) {
		this.elements.forEach(element=>{
			element.draw(canvasRender);
		})
	}

	instance(elements) {
		if (Array.isArray(elements)) {
			elements.forEach(element=>{
				element.index = this.elements.length;
				this.elements.push(element)
			})			
		} else {
			let element = elements;
			element.index = this.elements.length;
			this.elements.push(element);
		}
	}
}

Square.Element = class Element {

	constructor(element) {
		this.index;
	}

	update(game) {
		// ...
	}

	draw(canvasRender) {
		// ...
	}
}

Square.Vector2 = class Vector2 {

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

Square.Transform = class Transform {

	constructor(position, size) {
		this.position = position ? position : new Square.Vector2;
		this.size = size ? size : new Square.Vector2;
	}

	setPos(x, y) {
		return (this.position = new Square.Vector2(x, y))
	}

	setSize(x, y) {
		return (this.size = new Square.Vector2(x, y))
	}

	getPos() {
		return this.position;
	}

	getSize() {
		return this.size;
	}
}

Square.Rect = class Rect extends Square.Element {

	constructor(posx, posy, width, height, color = "black") {
		super();
		this.transform = new Square.Transform(new Square.Vector2(posx, posy), new Square.Vector2(width, height));
		this.velocity = new Square.Vector2(0, 0);
		this.color = color;
	}

	update(game) {
		this.transform.position.x += this.velocity.x;
		this.transform.position.y += this.velocity.y;
	}

	draw(canvasRender) {
		canvasRender.fillStyle = this.color;
		canvasRender.fillRect(this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
	}

	isCollision(b) {
		return (this.transform.position.x + this.transform.size.x >= b.transform.position.x && this.transform.position.x <= b.transform.position.x + b.transform.size.x &&
				this.transform.position.y + this.transform.size.y >= b.transform.position.y && this.transform.position.y <= b.transform.position.y + b.transform.size.y)
	}
}

Square.Sprite = class Sprite extends Square.Rect {

	constructor(image, posx, posy, width, height) {
		super(posx, posy, width ? width : image.width, height ? height : image.height);
		this.image = image;
	}

	draw(canvasRender) {
		canvasRender.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
	}
}

Square.Input = {
	Keyboad: {},
	isKeyDown: function(key) {
		return (Square.Input.Keyboad[key] && Square.Input.Keyboad[key].isdown);
	},
	isKeyUp: function(key) {
		return (Square.Input.Keyboad[key] && Square.Input.Keyboad[key].isup);
	},
	Mouse: {}
}

window.addEventListener('keydown', e => {
	Square.Input.Keyboad[e.key] = {'isdown':true};
})

window.addEventListener('keyup', e =>{ 
	Square.Input.Keyboad[e.key] = {'isdown':false, 'isup':true};
	requestAnimationFrame(()=>{Square.Input.Keyboad[e.key].isup = false})
})

Square.loadImage = function(src) {
	let image = new Image;
	image.src = src;
	return image;
}

Square.createCanvas = function(width, height) {
	let canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
}