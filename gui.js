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
				if(this.icon != null)
					this.icon.draw(this.pos.x - this.offset.x, this.pos.y - this.offset.y);
			}
		},

		// Elements
		elements: [],
		element: {
			/* Actions:
					getByName, name
					getByGroup, name
					show, name
					showGroup, name
					hide, name
					hideGroup, name
					toggle, name
					toggleGroup, name
					remove, name
					removeGroup, name
					enable, name
					enableGroup, name
					disable, name
					disableGroup, name
					disableAll
			*/
			action: function(action, name) {
				var collection = [];
				for (var i = 0; i < ig.gui.elements.length; i++) {
					// getByName
					if(action == 'getByName' && ig.gui.elements[i].name == name)
						collection.push(ig.gui.elements[i]);
					// getByGroup
					if(action == 'getByGroup' && ig.gui.elements[i].group == name)
						collection.push(ig.gui.elements[i]);
					// show
					if(action == 'show' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].show = true;
					// showGroup
					if(action == 'showGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].show = true;
					// hide
					if(action == 'hide' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].show = false;
					// hideGroup
					if(action == 'hideGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].show = false;
					// toggle
					if(action == 'toggle' && ig.gui.elements[i].name == name) {
						if (ig.gui.elements[i].show)
							ig.gui.elements[i].show = false;
						else
							ig.gui.elements[i].show = true;
					}
					// toggleGroup
					if(action == 'toggleGroup' && ig.gui.elements[i].group == name) {
						if (ig.gui.elements[i].show)
							ig.gui.elements[i].show = false;
						else
							ig.gui.elements[i].show = true;
					}
					// remove
					if(action == 'remove' && ig.gui.elements[i].name == name)
						ig.gui.elements.erase(ig.gui.elements[i]);
					// removeGroup
					if(action == 'removeGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements.erase(ig.gui.elements[i]);
					// enable
					if(action == 'enable' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].disable = false;
					// enableGroup
					if(action == 'enableGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].disable = false;
					// disable
					if(action == 'disable' && ig.gui.elements[i].name == name)
						ig.gui.elements[i].disable = true;
					// disableGroup
					if(action == 'disableGroup' && ig.gui.elements[i].group == name)
						ig.gui.elements[i].disable = true;
					// disableAll
					if(action == 'disableAll')
						ig.gui.elements[i].disable = true;
				}
				if(collection.length) {
					if(collection.length == 1) collection = collection[0];
					return collection;
				}
			},

			add: function(element) {
				if(element.show == undefined) element.show = true;
				if(element.disabled == undefined) element.disabled = false;
				if(element.active == undefined) element.active = false;
				if(element.showTitle == undefined || (element.font == undefined)) element.showTitle = false;
				if(element.showBind == undefined || (element.font == undefined)) element.showBind = false;
				
				ig.gui.elements.push(element);
			},

			draw: function() {
				for (var i = 0; i < ig.gui.elements.length; i++) {
					var element = ig.gui.elements[i],
						state = 'normal';

					// Check position & state
					if(!element.show) continue;
					if(ig.gui.cursor.pos.x >= element.pos.x && ig.gui.cursor.pos.x <= element.pos.x + element.size.x &&
						ig.gui.cursor.pos.y >= element.pos.y && ig.gui.cursor.pos.y <= element.pos.y + element.size.y &&
						!element.disabled) {
						state = 'hover';
					}
					
					// Pressed by Mouse OR Keybind
					if((state == 'hover' && (ig.input.state('mouse1') || ig.input.pressed('mouse1'))) || (ig.input.pressed(element.keybind))) {
						state = 'active';
						if(ig.input.state('mouse1') && typeof ig.gui.elements[i].mouseDown == 'function')
							ig.gui.elements[i].mouseDown.call(element);
						if(ig.input.pressed('mouse1') || ig.input.pressed(element.keybind)) {
							// Toggle (click)
							if(element.toggle)
								element.active = !element.active;
							// Click function
							if(typeof ig.gui.elements[i].click == 'function')
								ig.gui.elements[i].click.call(element);
						}
					}

					// Toggle (state)
					if(element.toggle && element.active)
						state = 'active';

					// Default state
					if(ig.gui.elements[i].state[state] == undefined)
						state = 'normal';

					// Alpha
					if(element.alpha != undefined)
						ig.system.context.globalAlpha = element.alpha;

					// Image
					var image = ig.gui.elements[i].state[state];
					if(isNaN(image.tile) || isNaN(image.tileSize)) {
						image.image.draw(element.pos.x, element.pos.y);
					} else {
						image.image.drawTile(element.pos.x, element.pos.y, image.tile, image.tileSize);
					}
					// Icon
					var icon = ig.gui.elements[i].icon;
					if (element.icon) {
						icon.draw(element.pos.x, element.pos.y);
					}
					// Show Bind
					if (element.showBind && element.font) {
						element.font.draw(element.keybind.substr(0,4).toUpperCase(),element.pos.x+element.size.x-2, element.pos.y, ig.Font.ALIGN.RIGHT);
					}
					// Show Title
					if (element.showTitle && element.font) {
						element.font.draw(element.title.toUpperCase(), element.pos.x+3, (element.pos.y+element.size.y)-(element.font.height-2), ig.Font.ALIGN.LEFT);
					}
					// Show Count
					if (element.count > 1 && element.font) {
						element.font.draw(element.count,(element.pos.x+element.size.x)-2,(element.pos.y+element.size.y)-(element.font.height-2), ig.Font.ALIGN.RIGHT);
					}
					
					// Restore
					ig.system.context.globalAlpha = 1;
				}
			}
		},

		// Draw
		draw: function() {
			this.element.draw();
			// Capture mouse
			this.cursor.pos = {
				x: ig.input.mouse.x,
				y: ig.input.mouse.y
			}
			this.cursor.draw();
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
