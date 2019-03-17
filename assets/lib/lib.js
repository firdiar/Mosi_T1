function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}

function getImage(name){
  return "assets/img/"+name;
}

//mendapatkan normalize vector
function getNormalizeVector(x,y){
  var length = getLengthVector(x,y); //calculating length
  if(length != 0){
    x = x/length; //assigning new value to x (dividing x by lenght of the vector)
    y = y/length; //assigning new value to y
  }
  return {x:x , y:y};
}

// mendapatkan panjang vector
function getLengthVector(x,y){
  return Math.sqrt(x*x+y*y);
}

// mendapatkan angle dari vector
function getAngle(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}

// fungsi dari rumus analitik untuk mendapatkan posisi objek
function getCalculationPositionAnalitik(time , angle , startSpeed , vectorStart){
  let g = 10;
  return {
           x: vectorStart.x+startSpeed*Math.cos(angle*Math.PI/180)*time ,
           y: vectorStart.y+(1/2)*g*(time*time) + startSpeed*Math.sin(angle* Math.PI/180)*time
         }
}

// fungsi dari rumus numerik untuk mendapatkan posisi objek
function getCalculationPositionNumerik(DeltaTime , angle , startSpeed ,vectorPrev , vectorStart , vy){
    return {
             x : vectorPrev.x + startSpeed *Math.cos(angle* Math.PI/180) * DeltaTime,
             y : vectorPrev.y + (vy*DeltaTime)
           }
}




// convert value
function NormalToGameY(gamey){
    return height-gamey;
}
function NormalToGameX(gamex){
    return gamex;
}
function GameToNormalY(gamey){
    return height-gamey;
}
function GameToNormalX(gamex){
    return gamex;
}
