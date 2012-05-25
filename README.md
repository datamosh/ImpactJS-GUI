## Installation
- Copy `gui.js` to `lib/plugins/`
- Add plugin in main.js: `'plugins.gui'`
- On your draw code: `if(ig.gui.show) ig.gui.draw();`
- Boom. Easy-GUI

## Buttons

### Functions:

#### getByName `ig.gui.button.action('getByName', 'name');`
#### getByGroup `ig.gui.button.action('getByGroup', 'name');`
#### show `ig.gui.button.action('show', 'name')`
#### showGroup `ig.gui.button.action('showGroup', 'name');`
#### hide `ig.gui.button.action('hide', 'name')`
#### hideGroup `ig.gui.button.action('hideGroup', 'name');`
#### remove `ig.gui.button.action('remove', 'name');`
#### removeGroup `ig.gui.button.action('v', 'name');`

### Quick button:
```
ig.gui.button.add({
	name: 'minibutton',
	group: 'minigroup',
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

### Full example:

```
ig.gui.button.add({
	name: 'supername',
	group: 'mygroup',
	size: { x: 32, y: 32 },
	pos: { x: 15, y: 10 },
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
		// Click!
	}
})
```

## Cursor

### Functions:

#### set `ig.gui.cursor.set(image);`
#### clear `ig.gui.cursor.clear();`


## More information?


- [Impact forum post](http://impactjs.com/forums/code/impact-gui)