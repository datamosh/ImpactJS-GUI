ig.module('game.joystick')
.requires(
	'impact.game'
)
.defines(function() {
	joystick = function() {
		ig.gui.element.add({
			name: 'left',
			group: 'joystick',
			size: { x: 47, y: 47 },
			pos: { x: 0, y: ig.system.height - 47 },
			state: {
				normal: {
					image: new ig.Image('media/joystick.png'),
					tile: 0,
					tileSize: 47
				}
			},
			mouseDown: function() {
				ig.game.player.vel.x = -100
				ig.game.player.flip = true
			}
		})

		ig.gui.element.add({
			name: 'right',
			group: 'joystick',
			size: { x: 47, y: 47 },
			pos: { x: 47, y: ig.system.height - 47 },
			state: {
				normal: {
					image: new ig.Image('media/joystick.png'),
					tile: 1,
					tileSize: 47
				}
			},
			mouseDown: function() {
				ig.game.player.vel.x = 100
				ig.game.player.flip = false
			}
		})

		ig.gui.element.add({
			name: 'a',
			group: 'joystick',
			size: { x: 47, y: 47 },
			pos: { x: ig.system.width - 100, y: ig.system.height - 47 },
			state: {
				normal: {
					image: new ig.Image('media/joystick.png'),
					tile: 2,
					tileSize: 47
				}
			},
			click: function() {
				if(ig.game.player.standing)
					ig.game.player.vel.y = -ig.game.player.jump;
			}
		})


		ig.gui.element.add({
			name: 'b',
			group: 'joystick',
			size: { x: 47, y: 47 },
			pos: { x: ig.system.width - 47, y: ig.system.height - 47 },
			state: {
				normal: {
					image: new ig.Image('media/joystick.png'),
					tile: 3,
					tileSize: 47
				}
			},
			click: function() {
				ig.game.spawnEntity( EntitySlimeGrenade, ig.game.player.pos.x, ig.game.player.pos.y, { flip: ig.game.player.flip } )
			}
		})

		ig.gui.element.add({
			name: 'left',
			group: 'control',
			size: { x: 47, y: 47 },
			pos: { x: ig.system.width - 47, y: 5 },
			toggle: true,
			state: {
				normal: {
					image: new ig.Image('media/joystick.png'),
					tile: 4,
					tileSize: 47
				},
				active: {
					image: new ig.Image('media/joystick.png'),
					tile: 5,
					tileSize: 47
				}
			},
			click: function() {
				ig.game.pause = !ig.game.pause
				for (var i = 0; i < ig.gui.element.action('getByGroup', 'joystick').length; i++) {
					var alpha = 1;
					if(ig.game.pause) alpha = 0.5;
					ig.gui.element.action('getByGroup', 'joystick')[i].alpha = alpha
					ig.gui.element.action('getByGroup', 'joystick')[i].disabled = ig.game.pause
				}
			}
		})
	}
})