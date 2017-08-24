var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var squareSide = Math.min(screenWidth,screenHeight)/8*0.7;
var bluePiecesPositon = initialPiecesPosition(0, 3);
var redPiecesPosition = initialPiecesPosition(5, 8);

function startGame() {
    myGameArea.start();
}

function initialPiecesPosition(initialLine,finalLine){
    piecesPosition = [];
    for (line = initialLine; line<finalLine; line++){
        for (column = 0; column<8; column++){
            if(isBlackSquare(line,column)){
                piecesPosition.push([line,column]);
            }
        }
    }
    return piecesPosition;
}

function isBlackSquare(line,column){
    return (line-column)%2!==0;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 0.98*screenWidth;
        this.canvas.height = 0.98*screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function plotCheckersBoard(){
    var whiteSquare;
    var blackSquare;
    for (line = 0; line < 8; line++) {
        for (column = 0; column < 8; column++) {
            if (isBlackSquare(line, column)) {
                blackSquare = new component(squareSide, squareSide, "black", screenWidth / 2 + squareSide * (line - 4), screenHeight / 2 + squareSide * (column - 4));
                blackSquare.update();
            }
            else {
                whiteSquare = new component(squareSide, squareSide, "white", screenWidth / 2 + squareSide * (line - 4), screenHeight / 2 + squareSide * (column - 4));
                whiteSquare.update();
            }
        }
    }
}

function plotPieces(line,column,color) {
    piece = new component(squareSide,squareSide,color,screenWidth/2+squareSide*(line-4),screenHeigth/2+squareSide*(line-4));
    piece.update();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}

function updateGameArea() {
    myGameArea.clear();
    plotCheckersBoard();
    for (piece = 0; piece < bluePiecesPositon.length;piece++){
        plotPieces(bluePiecesPositon[piece][0],bluePiecesPositon[piece][1],'blue')
    }
}