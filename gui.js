ig.module('plugins.gui')
.requires(
	'impact.game'
)
.defines(function () {
	// Create GUI container
	ig.gui = {
		// Configuration
		show: true,
		initialized: false,

		// Mouse and cursor
		cursor: {
			pos: { x: 0, y: 0 },
			offset: { x: 0, y: 0 },
			image: null,

			set: function(image) {
				this.image = image;
			},

			clear: function() {
				this.image = null;
			},

			draw: function() {
				if(this.image != null)
					this.image.draw(this.pos.x - this.offset.x, this.pos.y - this.offset.y);
			}
		},

		// Buttons
		buttons: [],
		button: {
			/* Actions:
					getByName, name
					getByGroup, name
					show, name
					showGroup, name
					hide, name
					hideGroup, name
					remove, name
					removeGroup, name
			*/
			action: function(action, name) {
				var collection = [];
				for (var i = 0; i < ig.gui.buttons.length; i++) {
					// getByName
					if(action == 'getByName' && ig.gui.buttons[i].name == name)
						collection.push(ig.gui.buttons[i]);
					// getByGroup
					if(action == 'getByGroup' && ig.gui.buttons[i].group == name)
						collection.push(ig.gui.buttons[i]);
					// show
					if(action == 'show' && ig.gui.buttons[i].name == name)
						ig.gui.buttons[i].show = true;
					// showGroup
					if(action == 'showGroup' && ig.gui.buttons[i].group == name)
						ig.gui.buttons[i].show = true;
					// hide
					if(action == 'hide' && ig.gui.buttons[i].name == name)
						ig.gui.buttons[i].show = false;
					// hideGroup
					if(action == 'hideGroup' && ig.gui.buttons[i].group == name)
						ig.gui.buttons[i].show = false;
					// remove
					if(action == 'remove' && ig.gui.buttons[i].name == name)
						ig.gui.buttons.erase(ig.gui.buttons[i]);
					// removeGroup
					if(action == 'removeGroup' && ig.gui.buttons[i].group == name)
						ig.gui.buttons.erase(ig.gui.buttons[i]);
				}
				if(collection.length) return collection;
			},

			add: function(button) {
				if(button.show == undefined) button.show = true;
				if(button.disabled == undefined) button.disabled = false;
				ig.gui.buttons.push(button);
			},

			draw: function() {
				for (var i = 0; i < ig.gui.buttons.length; i++) {
					var button = ig.gui.buttons[i],
						state = 'normal';

					// Check position & state
					if(button.show == false) continue;
					if(ig.gui.cursor.pos.x >= button.pos.x && ig.gui.cursor.pos.x <= button.pos.x + button.size.x &&
						ig.gui.cursor.pos.y >= button.pos.y && ig.gui.cursor.pos.y <= button.pos.y + button.size.y) {
						state = 'hover';
					}
					
					// Pressed
					if(state == 'hover' && (ig.input.state('mouse1') || ig.input.pressed('mouse1'))) {
						state = 'active';
						if(ig.input.state('mouse1') && typeof ig.gui.buttons[i].mouseDown == 'function') ig.gui.buttons[i].mouseDown.call();
						if(ig.input.pressed('mouse1') && typeof ig.gui.buttons[i].click == 'function') ig.gui.buttons[i].click.call();
					}

					// Default state
					if(ig.gui.buttons[i].state[state] == undefined)
						state = 'normal';

					// Image
					var image = ig.gui.buttons[i].state[state];
					if(isNaN(image.tile) || isNaN(image.tileSize)) {
						image.image.draw(button.pos.x, button.pos.y);
					} else {
						image.image.drawTile(button.pos.x, button.pos.y, image.tile, image.tileSize);
					}
				}
			}
		},

		// Draw
		draw: function() {
			// Capture mouse
			this.cursor.pos = {
				x: ig.input.mouse.x,
				y: ig.input.mouse.y
			}
			this.cursor.draw();
			this.button.draw();
		}
	}

	// Initialize and draw
	ig.Game.inject({
		update: function() {
			this.parent();

			// Initialize GUI
			if(ig.gui.initialized) return; else ig.gui.initialized = true;

			// Bind
			ig.input.bind(ig.KEY.MOUSE1, 'mouse1');
		}
	});
});