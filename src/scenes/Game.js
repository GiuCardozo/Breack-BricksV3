import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  init(data){
    this.points = data.points || 0;
    this.game_over_timeout = data.game_over_timeout || 99;

    // launch the HUD scene
    this.scene.launch("Hud", { remaining_time: this.game_over_timeout });

    // create a timmer event
    this.timmer_event = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.game_over_timeout--;
        this.scene.get("Hud").update_timeout(this.game_over_timeout);

        if (this.game_over_timeout === 0) {
          this.scene.stop("Hud");
          this.scene.start("GameOver");
        }
      },
    });
  };

  create() {
    
    

   
    this.balls= this.add.group();
    this.balls.add(new Ball(this, 400, 300, 10, 0xffffff, 1));

    this.paddle = new Paddle(this, 200, 650, 400, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);
    this.bombs = this.add.group();

   
  
  
    this.physics.add.collider(this.paddle, this.balls);
    

    this.physics.add.collider(
      this.balls,
      this.wall,
      (ball, brick) => {
        brick.hit();
        
        if (brick.isBallCreator && this.balls.getChildren().length<=4) {
          
          const newBall = new Ball(this, ball.x, ball.y, 10, 0xffffff, 1);
          this.balls.add(newBall);

          brick.isBallCreator= false;
        } 
        if(brick.isBoomCreator) {
            
            // Crear bomba
            const boom = this.add.circle(ball.x, ball.y, 10, 0x000000); 

            // Añadir físicas bomba
            this.physics.add.existing(boom);

            
            boom.body.setVelocity(0, 300); 

            // Agregar la bomba al grupo
            this.bombs.add(boom);
        }
        if (this.wall.getChildren().every(brick => brick.destroyed)) {
          
          ball.increaseSpeed(1.1); 
          this.velocidadX = ball.newVelocityX;
          this.velocidadY = ball.newVelocityY;
          this.scene.restart({ newVelocityX: this.velocidadX, newVelocityY: this.velocidadY }); 
          console.log (ball.newVelocityX);
          console.log (ball.newVelocityY);
      }
     
      
    },
 
      null,
      this
    );
    
    

    this.physics.add.collider(this.paddle, this.bombs, (paddle, boom) => {
        this.scene.start("GameOver"); 
        boom.destroy(); 
      }, null, this);
    //Destruir pelota al tocar el limite de abajo
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
        console.log("worldbounds");
        if (down ) {
          body.gameObject.destroy();
          console.log("hit bottom");
          if(this.balls.getChildren().length===0   ){
            this.scene.start("GameOver");
          } 
        }
      });  
    
    
    
    
  };
  update_points(points) {
    this.points += points;
    this.scene.get("Hud").update_points(this.points);
  }




  update() {
     
    this.paddle.update();
  }
}