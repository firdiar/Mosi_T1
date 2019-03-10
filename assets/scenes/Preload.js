Game.Preload = function(game){
    this.game = game // keep reference to main game object
}

Game.Preload.prototype = {
    preload:function(){
        console.log(getImage("aaa"));
        //tolong penamaan dimulai dengan huruf kecil
        this.load.spritesheet('startBtn', getImage("ButtonPlay.png") , 486 , 271);
        this.load.image('babi', getImage("Babi.png"));
        this.load.image('bird', getImage("Bird.png"));
        this.load.image('ketapel', getImage("Ketapel.png"));
    },
    create:function(){
		    this.state.start('mainmenu');
    }
}
