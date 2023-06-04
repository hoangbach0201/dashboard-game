var CELL_SIZE = 10;
var FPS = 10    ;
var WIDTH = 500;
var HEIGHT = 500;
 
function Game(canvas_id){
    var _pressedKey;
    var _cols = WIDTH/CELL_SIZE;
    var _rows = HEIGHT/CELL_SIZE;
    var _snake = new Snake(_cols,_rows);
 
    var _canvas = document.getElementById(canvas_id);
    var _context = _canvas.getContext('2d');
    _context.fillStyle = "black";
 
    var _food = {};
    var _running = false;
    var _timer;
 
    this.init = function() {
        _canvas.width = WIDTH;
        _canvas.height = HEIGHT;
 
        _canvas.onkeydown = function(e) {
            e.preventDefault();
            if(e.keyCode == 13) // Enter key
            {
                if(!_running)
                    startGame();
            }
            else if(_running)
            {
                _pressedKey = e.keyCode;
            }
        };
 
        // draw the welcome screen
        _context.textAlign = "center";
        //_context.font = "36px Arial";
        //_context.fillText("Canvas Snake v1.0",WIDTH/2,HEIGHT/3);
        _context.font = "16px Arial";
        _context.fillText("Press Enter to Start",WIDTH/2,HEIGHT/2);
 
    }
 
    function startGame() {
        _pressedKey = null;
        clearInterval(_timer);
        _snake.init();
        createFood();
        _running = true;
        _timer = setInterval(update,1000/FPS);
 
    }
 
    function update() {
        if(!_running)
            return;
 
        _snake.handleKey(_pressedKey);
        var ret = _snake.update(_food);
 
        if(ret==1)
        {
            createFood();
        }else if(ret==2) {
            // end game
            _running = false;
            _context.save();
            _context.fillStyle = "rgba(0,0,0,0.2)";
            _context.fillRect(0,0,WIDTH,HEIGHT);
            _context.restore();
            _context.fillText("Press Enter to Restart",WIDTH/2,HEIGHT/2);
            return;
        }
 
        draw();
    }
    function draw(){
 
        _context.beginPath();
        _context.clearRect(0,0,WIDTH,HEIGHT);
        _context.fill();
 
        _snake.draw(_context);
        // draw food
        _context.beginPath();
        _context.arc((_food.x*CELL_SIZE)+CELL_SIZE/2, (_food.y*CELL_SIZE)+CELL_SIZE/2, CELL_SIZE/2, 0, Math.PI*2, false);
        _context.fill();
    }
 
    function createFood() {
        var x = Math.floor(Math.random()*_cols);
        var y;
        do {
            y = Math.floor(Math.random()*_rows);
        } while(_snake.collide(x, y));
 
        _food = {x: x, y: y};
    }
 
}
