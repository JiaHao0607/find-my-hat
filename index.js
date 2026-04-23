import promptSync from "prompt-sync";
const prompt = promptSync({sigint: true});

// TODO: Game elements/assets constants
const PLAYER = "*";
const GRASS = "#";
const HAT = "^";
const HOLE = "O"

// TODO: UP / DOWN / LEFT / RIGHT / QUIT keyboard constants
const UP = "W";
const DOWN = "S";
const LEFT = "A";
const RIGHT = "D";
const QUIT = "Q";

// TODO: MSG_UP / MSG_DOWN / MSG_LEFT / MSG_RIGHT / MSG_ QUIT / MSG_INVALID message constants
const FEEDBACK_UP = "You moved up";
const FEEDBACK_DOWN = "You moved down";
const FEEDBACK_LEFT = "You moved left";
const FEEDBACK_RIGHT = "You moved right";
const FEEDBACK_QUIT = "You have quit the game";
const FEEDBACK_INVALID = "You have entered an invalid entry";

// TODO: WIN / LOSE / OUT / QUIT messages constants
const FEEDBACK_WIN_MSG = "Congratulations, you won!";
const FEEDBACK_LOSE_MSG = "You fell into a hole. Game over.";
const FEEDBACK_OUT_MSG = "You stepped out of the platform. Game over.";
const FEEDBACK_QUIT_MSG = "You quit the game. Thank you for playing.";

// TODO: MAP ROWS, COLUMNS AND PERCENTAGE
const ROWS = 10;
const COLS = 10;
const PERCENT = .2; // Percentage used to determine the number of holes generated

class Field {
  score = 0;

  // TODO: constructor, a built-in method of a class (invoked when an object of a class is instantiated)
  constructor(field = [[]]){
    this.field = field;
    this.gamePlay = false;
    this.playerRow = 0;
    this.playerColumn = 0;
  }

  // TODO: generateField is a static method, returning a 2D array of the fields
  static generateField(rows, cols, percentage){
    const map = [[]];

    for(let i = 0; i < rows; i++){
      map[i] = [];

      for(let j = 0; j < cols; j++){
        map[i][j] = Math.random() > PERCENT ? GRASS : HOLE;
      }
    }

    return map;
  }

  // TODO: welcomeMessage is a static method, displays a string
  static welcomeMsg(msg){
    console.log(msg);
  }

  // TODO: setHat positions the hat along a random x and y position within field array
  setHat(){
    const x = Math.floor(Math.random() * (ROWS - 1)) + 1;
    const y = Math.floor(Math.random() * (COLS - 1)) + 1;
    this.field[x][y] = HAT;
  }

  // TODO: printField displays the updated status of the field position
  printField(){
    this.field.forEach(row => console.log(row.join('')));
  }

  // TODO: updateMove displays the move (key) entered by the user
  updateMove(direction){
    console.log(direction);
  }

  // !! TODO: updateGame Assessment Challenge
  updateGame(){
    // Check the following conditions:
    // 1. Player moved to a GRASS spot (update the map)
    // 2. Player obtained the HAT (wins the game)
    // 3. Player fell into a HOLE (end the game)
    // 4. Player moved out of the map (end the game)

    if (
      this.playerRow < 0 ||
      this.playerRow >= ROWS ||
      this.playerColumn < 0 ||
      this.playerColumn >= COLS
    ) {
      console.log(FEEDBACK_OUT_MSG);
      this.#end();
      return;
    }

    const currentPosition = this.field[this.playerRow][this.playerColumn];

    if (currentPosition === HAT) {
      console.log(FEEDBACK_WIN_MSG);
      this.#end();
    }
    else if (currentPosition === HOLE) {
      console.log(FEEDBACK_LOSE_MSG);
      this.#end();
    }
    else {
      this.field[this.playerRow][this.playerColumn] = PLAYER;
    }  
  }

  //  TODO: start() a public method of the class to start the game
  start(){
    this.gamePlay = true;

    this.field[0][0] = PLAYER;
    this.setHat();

    while(this.gamePlay){
      this.printField();
      const input = prompt("Enter w(Up), s(Down), a(Left), d(right) to move. Press q to quit.");
      let flagInvalid = false;
      let feedback = "";

      switch(input.toUpperCase()){
        case UP:
          this.playerRow -= 1;
          feedback = FEEDBACK_UP;
          break;
        case DOWN:
          this.playerRow += 1;
          feedback = FEEDBACK_DOWN;
          break;
        case LEFT:
          this.playerColumn -= 1;
          feedback = FEEDBACK_LEFT;
          break;
        case RIGHT:
          this.playerColumn += 1;
          feedback = FEEDBACK_RIGHT;
          break;
        case QUIT:
          feedback = FEEDBACK_QUIT;
          this.#end();
          break;
        default:
          feedback = FEEDBACK_INVALID;
          flagInvalid = true;
          break;
      }

      this.updateMove(feedback);

      if(!flagInvalid){
        this.updateGame();
      }
    }
  }

  #end(){
    this.gamePlay = false;
  }
}

// TODO: Generate a new field - using Field's static method: generateField
const createField = Field.generateField(ROWS, COLS, PERCENT);

// TODO: Generate a welcome message
Field.welcomeMsg("\n*** Welcome to Find your hat ***\n");

// TODO: Create a new instance of the game
const gameField = new Field(createField);

// TODO: Invoke method start(...) from the instance of game object
gameField.start();