const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row)=>{
        return Array(columns).fill(0).map((_, column)=>{
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0 
            }
        })
    });
}

const spreadMines = (board, minesAmount) =>{
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while(minesPlanted < minesAmount){
        const randomRow = parseInt(Math.random() * rows, 10);
        const randomColumn = parseInt(Math.random() * columns, 10);

        if(!board[randomRow][randomColumn].mined){
            board[randomRow][randomColumn].mined = true;
            board[randomRow][randomColumn].nearMines = 0;
            minesPlanted++;
            setNearMines(randomRow, randomColumn, board);
        }
        
    }
}

const setNearMines = (row, column, board) => {

    const neighbors = getNeighbors(board, row, column);
    neighbors.forEach((neighbor) => {
        if(!neighbor.mined){
            neighbor.nearMines++;
        }
    })
}

const getNeighbors = (board, selectedRow, selectedColumn) => {

    const totalRows = board.length;
    const totalColumns = board[0].length;

    const rows = [selectedRow-1, selectedRow, selectedRow+1];
    const columns = [selectedColumn-1, selectedColumn, selectedColumn+1];
    const neighbors = [];
    rows.forEach((row)=>{
        columns.forEach((column)=>{

            if(row === selectedRow && column === selectedColumn)return; 
            if(row < 0 || row >= totalRows)return; 
            if(column < 0 || column >= totalColumns)return; 
            neighbors.push(board[row][column]);
        });
    })
    return neighbors;
}

const cloneBoard = (board) => {
    return board.map((rows)=>{
        return rows.map((field)=>{
            return {...field}
        });
    });
}

const openField = (board, row, column) => {
    const field = board[row][column];
    if(!field.opened){
        field.opened = true;

        if(field.mined) field.exploded = true;
        else if (field.nearMines===0){
            getNeighbors(board, row, column)
                .forEach((neighbor) => openField(board, neighbor.row, neighbor.column))
        }
    }
}

const fields = board => [].concat(...board);

const hasExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0;

const pendding = field => (field.mined && !field.flagged) 
    || (!field.mined && !field.opened);

const wonGame = board => fields(board).filter(pendding).length === 0;

const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true);

const createMineBoard = (rows, columns, minesAmount) => {
    const board  = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

export { createMineBoard, cloneBoard, openField, hasExplosion, wonGame, showMines}