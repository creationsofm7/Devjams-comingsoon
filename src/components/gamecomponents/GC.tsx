import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import cactus from "../../assets/cactus.png";
import ground from "../../assets/ground.svg";
import dino from "../../assets/dino.svg";
import cloud from "../../assets/cloud.png";
import dvj from "../../assets/dvj.svg";

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

const GAME_HEIGHT = 300;
const JUMP_FORCE = 900;
const GRAVITY = 2000;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 65;
const DINO_WIDTH = 70;
const DINO_HEIGHT = 100;

const DinoGame: React.FC<DinoGameProps> = ({
  dinoImage = dino,
  cactusImage = cactus,
  groundImage = ground,
  cloudImage = cloud,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    highScore: 4016,
    dinoY: 0,
    obstacles: [],
    clouds: [],
  });

  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const gameRef = useRef<HTMLDivElement>(null);
  const jumpVelocity = useRef<number>(0);
  const lastUpdateTime = useRef<number>(0);
  const requestRef = useRef<number>();
  const jumpPressed = useRef<boolean>(false);

  const jump = useCallback(() => {
    if (gameState.dinoY === 0 && gameState.isPlaying) {
      jumpVelocity.current = JUMP_FORCE;
    }
  }, [gameState.dinoY, gameState.isPlaying]);

  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      score: 0,
      obstacles: [],
      clouds: [],
      dinoY: 0,
    }));
    setShowStartButton(false);
    jumpVelocity.current = 0;
    lastUpdateTime.current = performance.now();
  }, []);

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      highScore: Math.max(prev.highScore, prev.score),
    }));
    setShowStartButton(true);
  }, []);

  const updateGameState = useCallback((deltaTime: number) => {
    setGameState((prev) => {
      // Update dino position
      let newDinoY = prev.dinoY + jumpVelocity.current * deltaTime;
      jumpVelocity.current -= GRAVITY * deltaTime;

      if (newDinoY < 0) {
        newDinoY = 0;
        jumpVelocity.current = 0;
      }

      // Move obstacles
      const newObstacles = prev.obstacles
        .map((obs) => ({ ...obs, x: obs.x - 5 }))
        .filter((obs) => obs.x > -OBSTACLE_WIDTH);

      // Add new obstacle
      if (Math.random() < 0.02 && newObstacles.length < 3) {
        const lastObstacle = newObstacles[newObstacles.length - 1];
        if (!lastObstacle || lastObstacle.x < 800 - OBSTACLE_WIDTH - 200) {
          newObstacles.push({ x: 800, y: GAME_HEIGHT - OBSTACLE_HEIGHT });
        }
      }

      // Move clouds
      const newClouds = prev.clouds
        .map((cloud) => ({ ...cloud, x: cloud.x - 1 }))
        .filter((cloud) => cloud.x > -70);

      // Add new cloud
      if (Math.random() < 0.005 && newClouds.length < 3) {
        newClouds.push({ x: 800, y: Math.random() * 50 + 50 });
      }

      // Check collision
      const dinoHitbox = {
        x: 50,
        y: GAME_HEIGHT - DINO_HEIGHT - newDinoY,
        width: DINO_WIDTH,
        height: DINO_HEIGHT,
      };

      const collision = newObstacles.some(
        (obs) =>
          dinoHitbox.x < obs.x + OBSTACLE_WIDTH &&
          dinoHitbox.x + DINO_WIDTH > obs.x &&
          dinoHitbox.y < obs.y + OBSTACLE_HEIGHT &&
          dinoHitbox.y + DINO_HEIGHT > obs.y
      );

      if (collision) {
        endGame();
        return prev;
      }

      return {
        ...prev,
        score: prev.score + 1,
        obstacles: newObstacles,
        clouds: newClouds,
        dinoY: newDinoY,
      };
    });
  }, [endGame]);

  const gameLoop = useCallback((currentTime: number) => {
    if (gameState.isPlaying) {
      const deltaTime = (currentTime - lastUpdateTime.current) / 1000;
      lastUpdateTime.current = currentTime;

      if (jumpPressed.current) {
        jump();
        jumpPressed.current = false;
      }

      updateGameState(deltaTime);
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState.isPlaying, jump, updateGameState]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!gameState.isPlaying) {
          startGame();
        } else {
          jumpPressed.current = true;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        jumpPressed.current = false;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (!gameState.isPlaying) {
        startGame();
      } else {
        jumpPressed.current = true;
      }
    };

    const handleTouchEnd = () => {
      jumpPressed.current = false;
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);
    gameRef.current?.addEventListener("touchstart", handleTouchStart);
    gameRef.current?.addEventListener("touchend", handleTouchEnd);

    if (gameState.isPlaying) {
      lastUpdateTime.current = performance.now();
      requestRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
      gameRef.current?.removeEventListener("touchstart", handleTouchStart);
      gameRef.current?.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [gameState.isPlaying, startGame, gameLoop]);

  const memoizedClouds = useMemo(() => (
    gameState.clouds.map((cloud, index) => (
      <img
        key={index}
        src={cloudImage}
        alt="Cloud"
        className="absolute"
        style={{ left: cloud.x, top: cloud.y }}
      />
    ))
  ), [gameState.clouds, cloudImage]);

  const memoizedObstacles = useMemo(() => (
    gameState.obstacles.map((obs, index) => (
      <img
        key={index}
        src={cactusImage}
        alt="Cactus"
        className="absolute"
        style={{
          left: obs.x,
          bottom: 24,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
        }}
      />
    ))
  ), [gameState.obstacles, cactusImage]);

  return (
    <div
      ref={gameRef}
      className="relative w-full h-screen overflow-hidden game-bg text-white font-mono"
    >
      <div className="absolute inset-0">
        <div className="absolute top-2 left-2 m-12 text-xl">
          OVR HI {gameState.highScore.toString().padStart(4, "0")}
        </div>
        <div className="absolute top-2 right-2 m-12 text-xl">
          HI {gameState.score.toString().padStart(4, "0")}{" "}
          
        </div>
      </div>

      {memoizedClouds}

      <img
        src={groundImage}
        alt="Ground"
        className="absolute bottom-0 w-full"
      />

      <img
        src={dinoImage}
        alt="Dino"
        className="absolute left-[50px] translate-y-6"
        style={{
          bottom: gameState.dinoY + 24,
          width: DINO_WIDTH,
          height: DINO_HEIGHT,
        }}
      />

      {memoizedObstacles}

      {!gameState.isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={dvj} alt="what" />
          {showStartButton && (
            <p className="text-xl mb-4">press space to play!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DinoGame;