## Installation
- Copy `gui.js` to `lib/plugins/`
- Add plugin in main.js: `'plugins.gui'`
- On your draw code: `if(ig.gui.show) ig.gui.draw();`
- Boom. Easy-GUI

## Elements

### Functions:

##### add: `ig.gui.element.add(properties);`
##### getByName `ig.gui.element.action('getByName', 'name');`
##### getByGroup `ig.gui.element.action('getByGroup', 'name');`
##### show `ig.gui.element.action('show', 'name')`
##### showGroup `ig.gui.element.action('showGroup', 'name');`
##### hide `ig.gui.element.action('hide', 'name')`
##### hideGroup `ig.gui.element.action('hideGroup', 'name');`
##### toggle `ig.gui.element.action('toggle', 'name');`
##### toggleGroup `ig.gui.element.action('toggleGroup', 'name');`
##### remove `ig.gui.element.action('remove', 'name');`
##### removeGroup `ig.gui.element.action('removeGroup', 'name');`
##### enable `ig.gui.element.action('enable', 'name');`
##### enableGroup `ig.gui.element.action('enableGroup', 'name');`
##### disable `ig.gui.element.action('disable', 'name');`
##### disableGroup `ig.gui.element.action('disableGroup', 'name');`
##### disableAll `ig.gui.element.action('disableAll');`


### Add properties

```
name: Element name
group: Group name
title: Element title. Shown in the lower-left of the element if enabled.
keybind: Element bound key. Allows a key to activate the button as well as the mouse. (must be the name that the key is bound with in Main.js)
showTitle: Show the element's title on the element. The default is false
showBind: Show the key bound to the element. The default is false (it simply shows the name of the key that is bound in Main.js)
count: An integer attached to the element, can be used for various purposes.
icon: An icon to be shown on top of the element, during all states.
size: Size of element
pos: Position to place this element on screen
disabled: Avoids behaviors and state changes
alpha: Specifies the alpha transparency. The default is 1 (fully opaque).
toggle: Changes state and remains there until you click. The default is false
active: Toggle initial state. Default is false,
mouseDown: Sets a function that runs continuously while the mouse button is pressed
click: Sets a function that runs every time you press the mouse button
state: Allows state and behavior changes
	normal: Normal state of element (Required, other states: **hover** and **active**)
		image: Image resource.
		tile: Number of tile. (Optional, you can use a simple image)
		tileSize: Tile size
```

### Quick button:

```
ig.gui.element.add({
	name: 'button_name',
	group: 'group_name',
	size: { x: 28, y: 56 },
	pos: { x: 0, y: 37 },
	state: {
		normal: {
			image: new ig.Image('media/minibutton.png')
		}
	},
	click: function() {
		// Action!
	}
})
```

### Full example

```
ig.gui.element.add({
	name: 'button_name',
	group: 'group_name',
	title: 'button_title',
	showTitle: true,
	keybind: 'button_key',
	showBind: true,
	icon: new ig.Image('media/icon.png'),
	size: { x: 32, y: 32 },
	pos: { x: 15, y: 10 },
	disabled: false,
	alpha: 0.5,
	toggle: true,
	active: false,
	state: {
		normal: {
			image: new ig.Image('media/buttons.png'),
			tile: 3,
			tileSize: 32
		},
		hover: {
			image: new ig.Image('media/buttons.png'),
			tile: 4,
			tileSize: 32
		},
		active: {
			image: new ig.Image('media/buttons.png'),
			tile: 5,
			tileSize: 32
		}
	},
	mouseDown: function() {
		// Mouse down!
	},
	click: function() {
		console.log(this); // Print this button ;)
	}
})
```

### Change properties

```
(ig.gui.element.action('getByName', 'button_name')).alpha = 0.5;
```

## Cursor

### Functions:

##### set `ig.gui.cursor.set(image);`
##### clear `ig.gui.cursor.clear();`

### Mouse binds *(Important!)*:

The plugin binds *left button* to *mouse1*.   
If your click doesn't work maybe this is the problem!   
https://github.com/datamosh/ImpactJS-GUI/issues/4

## More information?


- [Impact forum post](http://impactjs.com/forums/code/impact-gui)
