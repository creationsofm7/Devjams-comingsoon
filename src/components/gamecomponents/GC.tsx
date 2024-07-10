import { useState, useEffect, useCallback, CSSProperties } from 'react';
import cactus from "../../assets/cactus.png"
import ground from "../../assets/ground.svg"
import dino from "../../assets/dino.svg"
import cloud from "../../assets/cloud.png"

interface GameState {
  isPlaying: boolean;
  score: number;
  highScore: number;
  dinoY: number;
  obstacles: { x: number; y: number }[];
  clouds: { x: number; y: number }[];
}

interface DinoGameProps {
  dinoImage?: string;
  cactusImage?: string;
  groundImage?: string;
  cloudImage?: string;
}

const DinoGame: React.FC<DinoGameProps> = ({
  dinoImage = dino,
  cactusImage = cactus,
  groundImage = ground,
  cloudImage = cloud,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    highScore: 0,
    dinoY: 0,
    obstacles: [],
    clouds: [],
  });

  const [isJumping, setIsJumping] = useState<boolean>(false);

  const GAME_HEIGHT = 300;
  const JUMP_HEIGHT = 100;
  const OBSTACLE_WIDTH = 30;
  const OBSTACLE_HEIGHT = 50;
  const DINO_WIDTH = 70;
  const DINO_HEIGHT = 100;

  const jump = useCallback(() => {
    if (!isJumping && gameState.isPlaying) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping, gameState.isPlaying]);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      score: 0,
      obstacles: [],
      clouds: [],
    }));
  };

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      highScore: Math.max(prev.highScore, prev.score),
    }));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!gameState.isPlaying) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, jump]);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Move obstacles
        const newObstacles = prev.obstacles
          .map(obs => ({ ...obs, x: obs.x - 5 }))
          .filter(obs => obs.x > -OBSTACLE_WIDTH);

        // Add new obstacle
        if (Math.random() < 0.02 && newObstacles.length < 3) {
          newObstacles.push({ x: 800, y: GAME_HEIGHT - OBSTACLE_HEIGHT });
        }

        // Move clouds
        const newClouds = prev.clouds
          .map(cloud => ({ ...cloud, x: cloud.x - 1 }))
          .filter(cloud => cloud.x > -70);

        // Add new cloud
        if (Math.random() < 0.005 && newClouds.length < 3) {
          newClouds.push({ x: 800, y: Math.random() * 100 });
        }

        // Check collision
        const dinoHitbox = {
          x: 50,
          y: GAME_HEIGHT - DINO_HEIGHT - (isJumping ? JUMP_HEIGHT : 0),
          width: DINO_WIDTH,
          height: DINO_HEIGHT,
        };

        const collision = newObstacles.some(obs => (
          dinoHitbox.x < obs.x + OBSTACLE_WIDTH &&
          dinoHitbox.x + DINO_WIDTH > obs.x &&
          dinoHitbox.y < obs.y + OBSTACLE_HEIGHT &&
          dinoHitbox.y + DINO_HEIGHT > obs.y
        ));

        if (collision) {
          clearInterval(gameLoop);
          endGame();
        }

        return {
          ...prev,
          score: prev.score + 1,
          obstacles: newObstacles,
          clouds: newClouds,
          dinoY: isJumping ? JUMP_HEIGHT : 0,
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, isJumping]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 contact-c" />

      {/* Clouds */}
      {gameState.clouds.map((cloud, index) => (
        <img
          key={index}
          src={cloudImage}
          alt="Cloud"
          className="absolute"
          style={{ left: cloud.x, top: cloud.y } as CSSProperties}
        />
      ))}

      {/* Ground */}
      <img
        src={groundImage}
        alt="Ground"
        className="absolute bottom-0 w-full"
      />

      {/* Dino */}
      <img
        src={dinoImage}
        alt="Dino"
        className="absolute left-[50px] translate-y-6"
        style={{ bottom: gameState.dinoY + 24, width: DINO_WIDTH, height: DINO_HEIGHT } as CSSProperties}
      />

      {/* Obstacles */}
      {gameState.obstacles.map((obs, index) => (
        <img
          key={index}
          src={cactusImage}
          alt="Cactus"
          className="absolute"
          style={{ left: obs.x, bottom: 24, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT } as CSSProperties}
        />
      ))}

      {/* Score */}
      <div className="absolute top-4 right-4 text-xl font-bold">
        Score: {gameState.score}
      </div>

      {/* Game Over */}
      {!gameState.isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Game Over</h2>
          <p className="text-xl mb-2">Score: {gameState.score}</p>
          <p className="text-xl mb-4">High Score: {gameState.highScore}</p>
          <button
            className="px-4 py-2 bg-white text-black font-bold rounded"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DinoGame;
