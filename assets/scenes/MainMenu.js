Game.MainMenu = function(game){}

// Static data
const height = 800;
const width = 1280;
const ground = 680;

// Objek
let ketapel;
let bird;
let babi;
let line;
let graphics;
let vector;

let powerTxt;
let angleTxt;

let shootPower;
let shootAngle;
let time;


let isStart = false;
let isClear = false;

Game.MainMenu.prototype = {
    create : function(){
      // membuat objek babi
      babi = this.add.sprite(500, ground, 'babi');
      babi.scale.setTo(0.3);
      babi.anchor.setTo(0.5 , 1);
      babi.inputEnabled = true;
      babi.input.enableDrag();
      babi.events.onDragUpdate.add(dragUpdateBabi);
      babi.pos = {x : babi.x , y : babi.y};

      // membuat objek ketapel
      ketapel = this.add.sprite(100, ground, 'ketapel');
      ketapel.scale.setTo(0.2);
      ketapel.anchor.setTo(0.5 , 1);
      ketapel.headPos = { x: 100 , y: (ketapel.y-ketapel.height)}


      // membuat objek burung
      bird = this.add.sprite(100, (ketapel.y-ketapel.height), 'bird');
      bird.scale.setTo(0.2);
      bird.anchor.setTo(0.5);
      //enable drag untuk objek burung
      bird.inputEnabled = true;
      bird.input.enableDrag();
      bird.events.onDragUpdate.add(dragUpdateBird);

      // membuat button play
      button = this.add.button(1000 , 30, 'startBtn', this.startSimulation, this, 0, 0, 1);
      button.scale.setTo(0.2);

      // inisiasi text
      powerTxt = this.add.text(100, 30, "Power : 0 m/s");
      angleTxt = this.add.text(500, 30, "Angle : 0");

      for(let i = bird.x ; i < width ; i += 100){
        let t = this.add.text(i, height-100, (i-bird.x)+"m");
        t.anchor.setTo(0.5);
        t.scale.setTo(0.5);
      }

      line = new Phaser.Line(bird.x, bird.y, 90, ketapel.y-ketapel.height+20);
      graphics = this.add.graphics(0,0);



    },
    update : function(){
      if(!isStart){
        // menggambar line (karet ketapel)
        graphics.clear();
        graphics.lineStyle(10, '0x894808', 1);
        graphics.moveTo(line.start.x,line.start.y);//moving position of graphic if you draw mulitple lines
        graphics.lineTo(line.end.x,line.end.y);
        graphics.endFill();



        //
      }else if(isStart && !isClear){
        // mengupdate time
        time += this.time.elapsed/1000;

        // mendapatkan posisi berdasarkan Time
        let pos = getCalculationPosition(time , shootAngle , shootPower , {x:100,y:(ketapel.y-ketapel.height)} );

        //memasukan posisi yang didapat dari fungsi ke objek
        bird.x = pos.x;
        bird.y = clamp(pos.y , -ground , ground );

        if( Math.abs(time - Math.round(time)) <0.2){
          // menggambar line perubahan posisi burung
          graphics.lineStyle(0);
          graphics.beginFill(0xFFFF0B, 0.5);
          graphics.drawCircle(pos.x, pos.y, 5);
          graphics.endFill();
        }

        // membuat burung selalu di atas agar garis tidak munul
        bird.bringToTop();

        // menghentikan burung ketika sudah berada di tanah
        if(bird.y == ground){
          console.log(time);
          isClear = true;
        }
      }


    },
    startSimulation : function(){
      console.log("simulation start");
      // mendapatkan data
      this.calculateCurrentGameData();

      isStart = true;
      graphics.clear();
      time = 0;

      // mematikan input babi dan burung sehingga tidak dapat di sentuh lagi
      bird.inputEnabled = false;
      babi.inputEnabled = false;

    },
    calculateCurrentGameData : function(){
      //mendapatkan data dari game untuk game
      let vector = { x: (ketapel.headPos.x - bird.x) , y : (ketapel.headPos.y - bird.y)}

      // mendapatkan kekuatan tembak dari panjang vector
      shootPower = getLengthVector(vector.x , vector.y);
      // membuat vector satuan
      vector = getNormalizeVector(vector.x , vector.y);
      // mendapatkan angle dari vector
      shootAngle = getAngle( vector.x  ,vector.y);

      console.log(vector);
      console.log(shootAngle);
    },
    calculateCurrentNormalData : function(){
      // mendapatkan data normal atau data yang real(asli)
      let vector = { x: (ketapel.headPos.x - bird.x) , y : ( GameToNormalY(ketapel.headPos.y) - GameToNormalY(bird.y) )}
      // mendapatkan power berdasarkan panjang vector
      let power = getLengthVector(vector.x , vector.y);

      vector = getNormalizeVector(vector.x , vector.y);

      // mendapatkan angle dari vector
      let angle  = getAngle( vector.x  ,vector.y);

      // mengupdate status text
      powerTxt.text = "Power : "+ Math.round(power)+" m/s";
      angleTxt.text = "Angle : "+ Math.round(angle);

    }

}

//berjalan setiap kita men drag burung
function dragUpdateBird(sprite, pointer, dragX, dragY, snapPoint) {

    // mendapatkan vector tarikan burung
    let x = dragX - ketapel.headPos.x;
    let y = dragY - (ketapel.headPos.y);
    // membuat vectornya menjadi vector satuan
    vector = getNormalizeVector(x,y);
    let vector2 = {x:vector.x , y : vector.y};

    // memanjangkannya lagi sesuai length tapi dibatasi hanya dapat sepanjang 100
    vector.x = clamp(vector.x , -200 , 0) * clamp( getLengthVector(x,y) , 0 , 100);
    vector.y = clamp(vector.y , 0 , 200) * clamp( getLengthVector(x,y) , 0 , 100);

    // memasang vector pada sprite burung
    sprite.x = vector.x + ketapel.headPos.x;
    sprite.y = vector.y + ketapel.headPos.y;
    line.start.x = sprite.x + (vector2.x*10);
    line.start.y = sprite.y + (vector2.y*15);

    Game.MainMenu.prototype.calculateCurrentNormalData();
}

//berjalan setiap kita mendrag Babi
function dragUpdateBabi(sprite, pointer, dragX, dragY, snapPoint) {
  // membuat babi hanya dapat berpindah tiap 100m
  if(dragX > babi.pos.x+100){
    babi.pos.x += 100;
  }else if(dragX < babi.pos.x-100){
    babi.pos.x -= 100;
  }

  // memasukan data posisi ke babi
  babi.x = babi.pos.x;
  babi.y = babi.pos.y;

}
