function tick(event) {


  if (isSlide == true) {
    deltaS = event.delta / 1000;
  } else {
    deltaS = event.delta / 2000;
  }

  if (isPlayGame == true) {
    updatePositionHitPoint();
    updatePositionHitPointEnemy();
    stageAnimation();
    score += .1;
    document.getElementById("score").innerHTML = Math.floor(score);

    if (isDeath == false) {
      ninjaKhoHitEnemy();
      ninjaKhoHitTrap();
      ninjaKhoHitDeadCycle();

    }

    if (isFire == true) {
      bulletMove();
      bulletHitEnemy();
    }
  } else {
    if (isDeath == true) {
      ninjaKho.gotoAndStop("death");
    }
  }


  stage.update(event);
}


function stageAnimation() {

  ground_tiles.x = (ground_tiles.x - deltaS * 1200) % ground_tiles.tileW;
  hill_1.x = (hill_1.x - deltaS * 30) % hill_1.tileW;
  hill_2.x = (hill_2.x - deltaS * 100) % hill_2.tileW;

  /* parallax effect
    if(isJump==true){
      hill_2.y += 1;
    }else{
      if(hill_2.y  != parallax)
      hill_2.y -= 1;

    }*/

  dead_cycle.x = (dead_cycle.x - deltaS * 1200);
  if (dead_cycle.x <= -500) {
    dead_cycle.x = rxRight();
  }

  trap.x = (trap.x - deltaS * 1200);
  if (trap.x <= -500) {
    trap.x = rxRight();
  }

  grass.x = (grass.x - deltaS * 1200);
  if (grass.x <= -500) {
    grass.x = rxRight();
  }

  gate.x = (gate.x - deltaS * 1200);
  if (gate.x <= -500) {
    gate.x = rxRight();
  }

  ninjaEnemy.x = (ninjaEnemy.x - deltaS * 2200);
  if (ninjaEnemy.x <= -500) {
    ninjaEnemy.x = rxRight();
  }

}

function ninjaKhoHitTrap() {


  if (checkCollisionStage(trap, hitPoint)) {

    ninjaKho.gotoAndPlay("lay");

    showGameStates();

  }

}

function ninjaKhoHitDeadCycle() {

  if (checkCollisionStage(dead_cycle, hitPoint)) {

    ninjaKho.gotoAndPlay("lay");

    showGameStates();

  }


}

function ninjaKhoHitEnemy() {

  if (checkCollisionStage(hitPointEnemy, hitPoint)) {
    ninjaKho.gotoAndPlay("lay");

    showGameStates();

  }


}



function bulletMove() {

  bullet.rotation += 5;
  if (isTurnLeft == false)
    bullet.x += 5000 * deltaS;
  else
    bullet.x -= 5000 * deltaS;

  if (bullet.x > w) {
    stage.removeChild(bullet);
    isFire = false;
  }
  if (bullet.x < 0) {
    stage.removeChild(bullet);
    isFire = false;
  }


}

function bulletHitEnemy() {

  if (checkCollisionStage(ninjaEnemy, bullet)) {

    //  ninjaEnemy.gotoAndPlay("death");
    stage.removeChild(bullet);
    isFire = false;
    showGameStates();

  }


}
