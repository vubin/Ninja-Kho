function preLoadingAssets() {
  manifest = [{
    src: "bg.png",
    id: "bg"
  }, {
    src: "gate.png",
    id: "gate"
  }, {
    src: "bullet.png",
    id: "bullet"
  }, {
    src: "moon.png",
    id: "moon"
  }, {
    src: "hill_1.png",
    id: "hill_1"
  }, {
    src: "hill_2.png",
    id: "hill_2"
  }, {
    src: "ninjaKho_sheet.png",
    id: "ninjaKho"
  }, {
    src: "ninjaEnemy_sheet.png",
    id: "ninjaEnemy"
  }, {
    src: "trap.png",
    id: "trap"
  }, {
    src: "grass.png",
    id: "grass"
  }, {
    src: "dead_cycle.png",
    id: "dead_cycle"
  }, {
    src: "ground_tiles.png",
    id: "ground_tiles"
  }];


  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "assets/");


  function handleComplete() {
    examples.hideDistractor();

    initGameStage();
    initNinjaKho();
    getScoreData();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
  }



}


function initGameStage() {

  var _ran = Math.floor(Math.random() * 5) + 1;
  /*  if (_ran == 1) initStage1();
    if (_ran == 2) initStage2();
    if (_ran == 3) initStage3();
    if (_ran == 4) initStage4();
    if (_ran == 5) initStage5(); */
  initStage();
  loadSound();

}


function loadSound() {


  // if initializeDefaultPlugins returns false, we cannot play sound in this browser
  if (!createjs.Sound.initializeDefaultPlugins()) {
    return;
  }

  var audioPath = "assets/";
  var sounds = [{
    id: "theme",
    src: "monster.mp3"
  }];

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", handleLoad);
  createjs.Sound.registerSounds(sounds, audioPath);


  function handleLoad(event) {

    createjs.Sound.play("theme", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 1, 0);
    //createjs.Sound.play("jump");
  }

}


function initStage() {

  srcImg = loader.getResult("bg");
  bg = new createjs.Shape();
  bg.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  bg.y = -130;

  srcImg = loader.getResult("hill_1");
  hill_1 = new createjs.Shape();
  hill_1.graphics.beginBitmapFill(srcImg).drawRect(0, 0, w + srcImg.width, srcImg.height);
  hill_1.alpha = .2;
  hill_1.tileW = srcImg.width;
  hill_1.y = h / 6;


  srcImg = loader.getResult("hill_2");
  hill_2 = new createjs.Shape();
  hill_2.graphics.beginBitmapFill(srcImg).drawRect(0, 0, w + srcImg.width, srcImg.height);
  hill_2.alpha = 1;
  hill_2.tileW = srcImg.width;
  hill_2.y = h / 3;

  srcImg = loader.getResult("moon");
  moon = new createjs.Shape();
  moon.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  moon.x = w / 2 - srcImg.width / 2;
  moon.y = 30;

  srcImg = loader.getResult("ground_tiles");
  ground_tiles = new createjs.Shape();
  ground_tiles.graphics.beginBitmapFill(srcImg).drawRect(0, 0, w + srcImg.width, srcImg.height);
  ground_tiles.tileW = srcImg.width;
  ground_tiles.y = h - srcImg.height;


  srcImg = loader.getResult("trap");
  trap = new createjs.Shape();
  trap.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  trap.y = h - groundPosition;
  trap.x = -srcImg.width;

  srcImg = loader.getResult("grass");
  grass = new createjs.Shape();
  grass.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  grass.y = h - groundPosition + 15;
  grass.x = w / 2;

  srcImg = loader.getResult("gate");
  gate = new createjs.Shape();
  gate.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  gate.y = h - groundPosition - srcImg.height + 100;
  gate.x = srcImg.width / 3;


  srcImg = loader.getResult("dead_cycle");
  dead_cycle = new createjs.Shape();
  dead_cycle.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  dead_cycle.regX = srcImg.width / 2;
  dead_cycle.regY = srcImg.height / 2;
  dead_cycle.x = w + srcImg.width;
  dead_cycle.y = h - groundPosition + 20;

  createjs.Tween.get(dead_cycle, {
      loop: true,
      overdrive: false
    })
    .to({
      rotation: 360
    }, 1000);

  stage.addChild(bg, moon, hill_1, hill_2, ground_tiles, gate, trap, grass, dead_cycle);

}


function initNinjaKho() {

  var spriteSheet = new createjs.SpriteSheet({
    framerate: 13,
    "images": [loader.getResult("ninjaKho")],
    "frames": {
      "regX": 44,
      "height": 120,
      "count": 12,
      "regY": 60,
      "width": 88
    },
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {

      "masked": [0, 0, "stand", .5],
      "stand": [0, 0, "stand", .1],
      "shoot": [8, 10, "run"],
      "jump": [3, 3, "jump"],
      "run": [4, 6, "run", 1],
      "lay": [1, 1, "run", .6],
      "death": [11, 11, "death", 1],
      "climb": [11, 11, "climb", .6],
      "slide": [2, 2, "slide"]

    }
  });
  ninjaKho = new createjs.Sprite(spriteSheet, "masked");

  //ninjaKho hit point detect collision
  hitPoint = new createjs.Shape();
  hitPoint.graphics.beginFill('red');
  hitPoint.graphics.drawRect(0, 0, 20, 20);
  hitPoint.graphics.endFill();
  hitPoint.alpha = 0;

  ninjaKho.x = w / 4;
  ninjaKho.y = h - groundPosition;

  ninjaKho.scaleX = 1;
  isTurnLeft = false;

  stage.addChild(ninjaKho, hitPoint);

  srcImg = loader.getResult("bullet");
  bullet = new createjs.Shape();
  bullet.graphics.beginBitmapFill(srcImg).drawRect(0, 0, srcImg.width, srcImg.height);
  bullet.y = h - groundPosition;

}



function initNinjaEnemy() {

  var spriteSheet = new createjs.SpriteSheet({
    framerate: 13,
    "images": [loader.getResult("ninjaEnemy")],
    "frames": {
      "regX": 110,
      "height": 150,
      "count": 6,
      "regY": 75,
      "width": 220
    },
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "stand": [4, 4, "stand", 1],
      "run": [0, 2, "run", 1],
      "death": [3, 3, "death", .6]

    }
  });
  ninjaEnemy = new createjs.Sprite(spriteSheet, "run");


  ninjaEnemy.x = w * 3;
  ninjaEnemy.y = h - groundPosition - 10;

  ninjaEnemy.scaleX = -1;

  //ninjaEnemy hit point detect collision
  hitPointEnemy = new createjs.Shape();
  hitPointEnemy.graphics.beginFill('red');
  hitPointEnemy.graphics.drawRect(0, 0, 80, 80);
  hitPointEnemy.graphics.endFill();
  hitPointEnemy.alpha = 0;

  stage.addChild(ninjaEnemy, hitPointEnemy);


}


function ninjaKhoBleed() {

  while (particles--) {

    Particle = new createjs.Shape();
    Particle.graphics.beginFill('red');
    Particle.graphics.drawCircle(0, 0, 3);
    Particle.graphics.endFill();

    Particle.alpha = 0;
    var path = [hitPoint.x, hitPoint.y, rxBlood(), ryBlood(), rxBlood(), ryBlood() + h];
    createjs.Tween.get(Particle, {
        loop: true
      })
      .to({
        alpha: 1
      }, 0)
      .to({
        //  skewX: Math.random() * 100 + 100,
        guide: {
          path: path,
          start: 0,
          end: 1
        }
      }, 1000)
      .to({
        alpha: 0,
        visible: false
      }, 500)
      .wait(Math.random() * 1000);
    //.to({guide: {path: path, start: 1, end: 0}}, 5000);

    stage.addChild(Particle);
  }

}
