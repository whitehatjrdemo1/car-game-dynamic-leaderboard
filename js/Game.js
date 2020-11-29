class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1_img);
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);
    car3 = createSprite(500, 200);
    car3.addImage("car3", car3_img);
    car4 = createSprite(700, 200);
    car4.addImage("car4", car4_img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //var display_position = 100;
      var temp_rank = [];

      //index of the array
      var index = 0;
      var temp_dist;
      //x and y position of the cars
      var x = 175;
      var y;
      var temp_display = []

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction

        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;


        temp_rank[index - 1] = (allPlayers[plr]);
        if (temp_rank.length === 4) {
          temp_rank.sort((a, b) => (b.distance - a.distance));
        }
        console.log(temp_rank)
        temp_display=[];
        temp_display = [createElement('h4'), createElement('h4'), createElement('h4'), createElement('h4')];
        temp_display[index - 1].position(displayWidth - 200, index * 20);
        
        temp_display[index - 1].html(temp_rank[index - 1].name + ": " + temp_rank[index - 1].distance);

        console.log(temp_rank[index - 1].name + ": " + temp_rank[index - 1].distance + "," + index * 20);




        if (index === player.index) {
          temp_display[index - 1].style('color', "#800000");
        } else {
          temp_display[index - 1].style('color', "#000080");
        }


        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        } else {
          fill('black')
        }



        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if (player.distance > 3760) {

      //this.gameEnd();
      player.getcarsatend();
      player.rank = globalRank + 1;
      player.update();
      console.log(player.rank);
      console.log("Game Ended");
      Player.updatecarsatend(player.rank);
      gameState = 2;
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();

    }



    drawSprites();
  }

  end() {

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      console.log("not undefined")
      var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        console.log("loop")
        fill("black");
        textSize(15);
        stroke(0);
        index = index + 1;
        //text(allPlayers[plr].name + ": " + allPlayers[plr].rank, displayWidth/2, displayHeight / 2+ allPlayers[plr].rank * 20);
        if (index === player.index) {
          fill("red");
        } else {
          fill("white");
        }
        if (allPlayers[plr].rank != 0) {
          console.log("rank not zero");
          //text("NAME:                     RANK ", displayWidth/2, 20);
          console.log(allPlayers[plr].name + ": " + allPlayers[plr].rank)
          var rank = createElement('h4')
          rank.position(displayWidth / 2, allPlayers[plr].rank * 20)
          rank.html(allPlayers[plr].name + ": " + allPlayers[plr].rank);
        }
        // text(allPlayers[plr].name + ": " + allPlayers[plr].rank, displayWidth, displayHeight / 2 + index * 10);


      }
    }
  }
}
