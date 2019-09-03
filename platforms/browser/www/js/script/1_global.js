	var stage, w, h, loader, deltaS;

	var isPlayGame = false,
	  isTurnLeft = false,
	  isJump = false,
	  isFire = false,
	  isSlide = false,
	  isDeath = false,
	  score = 0,
	  health = 100,
	  particles,
	  groundPosition = 205,
	  bloodPosition = 250;


	var ninjaKho, bullet, hitPoint, hitPointEnemy, trap, dead_cycle;
