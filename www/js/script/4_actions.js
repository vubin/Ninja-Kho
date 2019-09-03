function handleShootStart() {

  if (isJump == false && isFire == false && isDeath == false) {
    ninjaKho.gotoAndPlay("shoot");
    isFire = true;
    bullet.x = ninjaKho.x;
    stage.addChild(bullet);

  }

}


function handleRightStart() {
  if (isDeath == false) {
    ninjaKho.gotoAndPlay("run");
    isTurnLeft = false;
    ninjaKho.scaleX = 1;
  }
}


function handleLeftStart() {
  if (isDeath == false) {
    ninjaKho.gotoAndPlay("run");
    isTurnLeft = true;
    ninjaKho.scaleX = -1;
  }

}


function handleSlideStart() {

  if (isDeath == false && isSlide == false && isJump == false) {

    ninjaKho.gotoAndPlay("jump");
    if (isSlide == false) {

      isSlide = true;
      createjs.Tween.get(ninjaKho, {
          loop: false,
          overdrive: true
        })
        .to({
          y: ninjaKho.y - 260
        }, 150,createjs.Ease.backIn)
        .to({
          rotation: 360
        }, 350)
        .to({
          rotation: 0
        }, 0).call(handleComplete);

      function handleComplete() {
        ninjaKho.gotoAndPlay("slide");
        createjs.Tween.get(ninjaKho, {
          loop: false,
          overdrive: true
        }).to({
          y: h - groundPosition
        }, 400).call(handleComplete1);

        function handleComplete1() {
          isSlide = false;
          ninjaKho.gotoAndPlay("run");
        }

      }

    }

  }

}



function handleJumpStart() {

  if (isDeath == false && isSlide == false) {

    ninjaKho.gotoAndPlay("jump");
    if (isJump == false) {

      isJump = true;
      createjs.Tween.get(ninjaKho, {
          loop: false,
          overdrive: true
        })
        .to({
          y: ninjaKho.y - 200
        }, 150,createjs.Ease.backIn)
        .to({
          rotation: 360
        }, 350)
        .to({
          y: h - groundPosition
        }, 400)
        .to({
          rotation: 0
        }, 0).call(handleComplete);

      function handleComplete() {
        isJump = false;
        ninjaKho.gotoAndPlay("run");
      }


    }

  }
}
