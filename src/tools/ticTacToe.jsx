import { useState } from "react";

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("Your turn");
    const [difficulty, setDifficulty] = useState(2);
    const difficultyLabels = ['Easy', 'Medium', 'Hard'];

    const checkWinner = (brd) => {
        const lines = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (const [x,y,z] of lines) {
            if (brd[x] && brd[x] === brd[y] && brd[x] === brd[z]) return brd[x];
        }
        return null;
    };

    const move = (index) => {
        if (board[index] || gameOver) return;

        const next = [...board];
        next[index] = "X";
        setBoard(next);

        const winner = checkWinner(next);
        if (winner) { setStatus("You win!"); setGameOver(true); return; }
        if (next.every(cell => cell !== null)) { setStatus("Draw"); setGameOver(true); return; }

        setStatus("AI turn");

        const aiMove = (difficulty === 2) ? findBestMove(next)
            : (difficulty === 1) ? findMediumMove(next)
            : findEasyMove(next);

        const aiBoard = [...next];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);

        const aiWinner = checkWinner(aiBoard);
        if (aiWinner) { setStatus("AI wins"); setGameOver(true); return; }
        if (aiBoard.every(cell => cell !== null)) { setStatus("Draw"); setGameOver(true); return; }
        setStatus("Your turn");
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setGameOver(false);
        setStatus("Your turn");
    };

    const winner = checkWinner(board);
    const winLine = winner ? getWinLine(board, winner) : [];

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between mb-8">
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                    winner ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400' :
                    gameOver && !winner ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' :
                    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                    {status}
                </span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDifficulty((d) => (d + 1) % 3)}
                        className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        {difficultyLabels[difficulty]}
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                    >
                        New Game
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {board.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => move(i)}
                        disabled={!!cell || gameOver}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black transition-all duration-200 border-2 
                            ${!cell && !gameOver ? 'border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer' : 'border-gray-100 dark:border-gray-800 cursor-default'}
                            ${cell === 'X' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800' : ''}
                            ${cell === 'O' ? 'text-red-500 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-800' : ''}
                            ${winLine.includes(i) ? 'ring-4 ring-green-500 dark:ring-green-400' : ''}
                        `}
                    >
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
}

function getWinLine(board, winner) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const line of lines) {
        if (board[line[0]] === winner && board[line[1]] === winner && board[line[2]] === winner) {
            return line;
        }
    }
    return [];
}

function findEasyMove(board) {
    const empty = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) empty.push(i);
    }

    for (const i of empty) {
        board[i] = "X";
        if (checkBoard(board) === "X") { board[i] = null; return i; }
        board[i] = null;
    }

    for (const i of empty) {
        board[i] = "O";
        if (checkBoard(board) === "O") { board[i] = null; return i; }
        board[i] = null;
    }

    return empty[Math.floor(Math.random() * empty.length)];
}

function findMediumMove(board) {
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "O";
            if (checkBoard(board) === "O") { board[i] = null; return i; }
            board[i] = null;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "X";
            if (checkBoard(board) === "X") { board[i] = null; return i; }
            board[i] = null;
        }
    }

    if (board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === null);
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    return findEasyMove(board);
}

function findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "O";
            const score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing, alpha, beta) {
    const winner = checkBoard(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "O";
                best = Math.max(best, minimax(board, depth + 1, false, alpha, beta));
                board[i] = null;
                alpha = Math.max(alpha, best);
                if (beta <= alpha) break;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "X";
                best = Math.min(best, minimax(board, depth + 1, true, alpha, beta));
                board[i] = null;
                beta = Math.min(beta, best);
                if (beta <= alpha) break;
            }
        }
        return best;
    }
}

function checkBoard(board) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
}
