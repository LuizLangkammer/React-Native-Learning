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

const setNearMines = (selectedRow, selectedColumn, board) => {

    const totalRows = board.length;
    const totalColumns = board[0].length;

    const rows = [selectedRow-1, selectedRow, selectedRow+1];
    const columns = [selectedColumn-1, selectedColumn, selectedColumn+1];
    rows.forEach((row)=>{
        columns.forEach((column)=>{

            if(row === selectedRow && column === selectedColumn)return; 
            if(row < 0 || row >= totalRows)return; 
            if(column < 0 || column >= totalColumns)return; 
        
            if(!board[row][column].mined){
                board[row][column].nearMines++;
            }
        });
    })
}

const createMineBoard = (rows, columns, minesAmount) => {
    const board  = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

export { createMineBoard }