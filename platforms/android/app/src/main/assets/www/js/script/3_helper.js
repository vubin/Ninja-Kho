function playGame() {

  stage.removeAllChildren();
  stage.update();
  isPlayGame = true;
  isDeath = false;
  initGameStage();
  initNinjaKho();
  initNinjaEnemy();
  particles = 50;

console.log(stage.getNumChildren());

  ninjaKho.gotoAndPlay("run");
  score = 0;
  hp = 2;
  document.getElementById("btnPlay").style.display = 'none';
  showGameStates();
}


function gameOver() {

  storeScoreData(score);
  ninjaEnemy.gotoAndStop("stand");
  ninjaKho.gotoAndStop("death");
  isPlayGame = false;
  isDeath = true;
  document.getElementById("btnPlay").style.display = 'block';

  ninjaKhoBleed();

  console.log(stage.getNumChildren());

}


function showGameStates() {
  hp--;
  if (hp <= 0) {
    hp = 0;
    gameOver();
  }

  document.getElementById("score").innerHTML = Math.floor(score);
  document.getElementById("hp").innerHTML = hp + "%";
}

function rxLeft() {
  return Math.random() * canvas.width * (-1);
}

function rxRight() {
  return Math.random() * canvas.width + canvas.width * 2;
}

function ry() {
  return Math.random() * canvas.height - groundPosition;
}

function rxBlood() {
  return Math.random() * bloodPosition;
}

function ryBlood() {
  return Math.random() * bloodPosition;
}

function updatePositionHitPoint() {
  hitPoint.x = ninjaKho.x;
  hitPoint.y = ninjaKho.y + 13;
}

function updatePositionHitPointEnemy() {
  hitPointEnemy.x = ninjaEnemy.x-100;
  hitPointEnemy.y = ninjaEnemy.y-30;
}


function checkCollisionStage(mc1, mc2) {

  var testPosition = mc1.globalToLocal(mc2.x, mc2.y);
  if (mc1.hitTest(testPosition.x, testPosition.y)) return true;
  else return false;
}


/*---------------------using ndgmr library----------------------*/
//var intersection = ndgmr.checkRectCollision(bitmap1,bitmap2);
// intersection is null if no collision, otherwise a {x,y,width,height}-Object is returned

//var collision = ndgmr.checkPixelCollision(bitmap1,bitmap2,alphaThreshold,true);
// returns a rect with the global position of the colliding pixel(s)
// alphaThreshold default is 0, set to higher value to ignore collisions with semi transparent pixels
// the last parameter defines if all pixels should be checked, in this case it returns a
// rect with the size of the full collision, if false a rect with the size 1x1 is returned

/*
function checkCollision(mc1, mc2) {

  var intersection = ndgmr.checkRectCollision(mc1, mc2);
  if (intersection) {
    //  console.log(intersection);
    return true;
  } else {
    //  console.log(intersection);
    return false;
  }

}
*/

function getScoreData() {

  var bestScore = localStorage.getItem('dataOnMobile');
  if (bestScore < 0 || bestScore == "") {
    document.getElementById("bestScore").innerHTML = '0';
    localStorage.setItem('dataOnMobile', '0');
  } else {
    document.getElementById("bestScore").innerHTML = bestScore;
  }

}

function storeScoreData(_score) {

  var bestScore = localStorage.getItem('dataOnMobile');
  if (bestScore < _score) {
    localStorage.setItem('dataOnMobile', Math.floor(score));
    document.getElementById("bestScore").innerHTML = Math.floor(score);
  }

}
