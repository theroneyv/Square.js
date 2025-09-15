const CANVAS = Square.createCanvas(640, 480);
const SCENE = new Square.Scene();
const GAME = new Square.Game({
	canvas: CANVAS,
	scene: SCENE
})

let sprite = new Square.Sprite(Square.loadImage('./sprite.png'), 0, 0)
let rect = new Square.Rect(200, 0, 100, 100, "blue");

GAME.update = function() {
	if (Square.Input.isKeyDown("ArrowRight")) {
		sprite.transform.position.x += 2;
	}
	if (sprite.isCollision(rect)) {
		rect.color = "red";
	}
}

SCENE.instance([sprite, rect]);

GAME._init();