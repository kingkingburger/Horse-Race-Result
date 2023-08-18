"use client";
// components/Tetris.tsx
import React, { useState, useEffect, useCallback } from "react";
import styles from "./tetris.module.css";
const boardWidth = 10;
const boardHeight = 20;

type Piece = {
  shape: number[][];
  x: number;
  y: number;
};

const shapes: number[][][] = [
  // 7개의 테트리스 블록 모양
  [[1, 1, 1, 1]], // I
  [
    [1, 1, 1],
    [0, 1, 0],
  ], // T
  [
    [1, 1, 1],
    [1, 0, 0],
  ], // L
  [
    [1, 1, 1],
    [0, 0, 1],
  ], // J
  [
    [1, 1],
    [1, 1],
  ], // O
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // S
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // Z
];
const Tetris: React.FC = () => {
  const [board, setBoard] = useState<number[]>(
    new Array(boardWidth * boardHeight).fill(0)
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);

  const createPiece = useCallback(() => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentPiece({
      shape,
      x: Math.floor(boardWidth / 2) - Math.floor(shape[0].length / 2),
      y: 0,
    });
  }, [currentPiece]);

  const isCollision = useCallback(
    (piece: number[][], x: number, y: number) => {
      for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
          if (piece[row][col]) {
            const newX = x + col;
            const newY = y + row;
            if (
              newX < 0 ||
              newX >= boardWidth ||
              newY >= boardHeight ||
              board[newY * boardWidth + newX]
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board]
  );

  const rotateMatrix = useCallback((matrix: number[][]) => {
    const result: number[][] = [];
    for (let col = 0; col < matrix[0].length; col++) {
      const newRow: number[] = [];
      for (let row = matrix.length - 1; row >= 0; row--) {
        newRow.push(matrix[row][col]);
      }
      result.push(newRow);
    }
    return result;
  }, []);

  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece) return;
      const { shape, x, y } = currentPiece;
      if (!isCollision(shape, x + dx, y + dy)) {
        setCurrentPiece((prev) => prev && { ...prev, x: x + dx, y: y + dy });
      }
    },
    [currentPiece, isCollision]
  );

  const rotatePiece = useCallback(() => {
    if (!currentPiece) return;
    const { shape, x, y } = currentPiece;
    const newPiece = rotateMatrix(shape);
    if (!isCollision(newPiece, x, y)) {
      setCurrentPiece((prev) => prev && { ...prev, shape: newPiece });
    }
  }, [currentPiece, isCollision, rotateMatrix]);

  const fixPiece = useCallback(() => {
    if (!currentPiece) return;
    const { shape, x, y } = currentPiece;
    const newBoard = [...board];
    shape.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (cell) {
          newBoard[(y + rIndex) * boardWidth + x + cIndex] = 1;
        }
      });
    });
    setBoard(newBoard);
  }, [board, currentPiece]);

  const clearLines = useCallback(() => {
    const newBoard = [...board];
    let linesToRemove: number[] = [];
    for (let row = 0; row < boardHeight; row++) {
      if (
        newBoard
          .slice(row * boardWidth, (row + 1) * boardWidth)
          .every((cell) => cell === 1)
      ) {
        linesToRemove.push(row);
      }
    }

    if (linesToRemove.length > 0) {
      linesToRemove.forEach((row) => {
        newBoard.splice(row * boardWidth, boardWidth);
        newBoard.unshift(...new Array(boardWidth).fill(0));
      });
      setBoard(newBoard);
    }
  }, [board]);

  const moveDown = useCallback(() => {
    if (!currentPiece) return;
    if (!isCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece((prev) => prev && { ...prev, y: prev.y + 1 });
    } else {
      fixPiece();
      clearLines();
      createPiece();
    }
  }, [clearLines, createPiece, currentPiece, fixPiece, isCollision]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveDown, movePiece, rotatePiece]);

  useEffect(() => {
    createPiece();
    const interval = setInterval(moveDown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // 두번째 매개변수로 빈 배열을 넣어 의존성을 제거합니다.

  return (
    <div>
      <div className="text-center border-8">
        turbopack 테스트
        {board.map((cell, index) => (
          <div
            key={index}
            className={`${styles["tetris-cell"]} ${
              cell ? styles["active"] : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Tetris;
