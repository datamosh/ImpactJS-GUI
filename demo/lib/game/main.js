ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'plugins.gui',
	'game.joystick',
	
	'game.entities.player',
	'game.entities.spike',
	'game.levels.test'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 300, // All entities are affected by this
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	crosshair: new ig.Image('media/crosshair.png'),
	pause: false,
	player: null,
	
	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );

		joystick();
		
		// Set cursor
		ig.gui.cursor.set(this.crosshair);
		// Cursor offset (hotspot fix)
		ig.gui.cursor.offset = {
			x: 8,
			y: 8
		}

		// Load the LevelTest as required above ('game.level.test')
		this.loadLevel( LevelTest );
	},
	
	update: function() {		
		if(ig.game.pause) return;
		// Update all entities and BackgroundMaps
		this.parent();

		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		
		this.font.draw( 'Arrow Keys, X, C', 2, 2 );

		if(ig.gui.show) ig.gui.draw();
	}
});


// Start the Game with 60fps, a resolution of 240x160, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 240, 160, 2 );

});
