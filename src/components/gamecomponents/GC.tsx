import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import cactus from "/assets/cactus.png";
import ground from "/assets/ground.svg";
import dinoRun1 from "/assets/dino1.svg";
import dinoRun2 from "/assets/dino2.svg";
import cloud from "/assets/cloud.png";
import dvj from "/assets/dvj.svg";

interface GameState {
  isPlaying: boolean;
  score: number;
  highScore: number;
  dinoY: number;
  obstacles: { x: number; y: number }[];
  clouds: { x: number; y: number }[];
  dinoFrame: number;
  groundOffset: number;
}

interface DinoGameProps {
  cactusImage?: string;
  groundImage?: string;
  cloudImage?: string;
}

const GAME_HEIGHT = 300;
const JUMP_FORCE = 1200;
const GRAVITY = 1500;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 55;
const DINO_WIDTH = 120;
const DINO_HEIGHT = 200;
const ANIMATION_SPEED = 7; // frames per second
const GROUND_SPEED = 500; // pixels per second

const DinoGame: React.FC<DinoGameProps> = ({
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
    dinoFrame: 0,
    groundOffset: 0,
  });

  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [doublePressCount, setDoublePressCount] = useState<number>(0);
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
      dinoFrame: 0,
      groundOffset: 0,
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
    setDoublePressCount(0);
  }, []);

  const updateGameState = useCallback(
    (deltaTime: number) => {
      setGameState((prev) => {
        // Update dino position
        let newDinoY = prev.dinoY + jumpVelocity.current * deltaTime;
        jumpVelocity.current -= GRAVITY * deltaTime;

        if (newDinoY < 0) {
          newDinoY = 0;
          jumpVelocity.current = 0;
        }

        // Move ground
        const newGroundOffset =
          (prev.groundOffset + GROUND_SPEED * deltaTime) % 1200;

        // Move obstacles
        const newObstacles = prev.obstacles
          .map((obs) => ({ ...obs, x: obs.x - GROUND_SPEED * deltaTime }))
          .filter((obs) => obs.x > -OBSTACLE_WIDTH);

        // Add new obstacle
        if (Math.random() < 0.02 * deltaTime * 60 && newObstacles.length < 3) {
          const lastObstacle = newObstacles[newObstacles.length - 1];
          if (!lastObstacle || lastObstacle.x < 800 - OBSTACLE_WIDTH - 200) {
            newObstacles.push({ x: 800, y: GAME_HEIGHT - OBSTACLE_HEIGHT });
          }
        }

        // Move clouds
        const newClouds = prev.clouds
          .map((cloud) => ({ ...cloud, x: cloud.x - 30 * deltaTime }))
          .filter((cloud) => cloud.x > -70);

        // Add new cloud
        if (Math.random() < 0.005 * deltaTime * 60 && newClouds.length < 3) {
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

        // Update dino animation frame
        const newDinoFrame = (prev.dinoFrame + ANIMATION_SPEED * deltaTime) % 2;

        return {
          ...prev,
          score: prev.score + Math.floor(60 * deltaTime),
          obstacles: newObstacles,
          clouds: newClouds,
          dinoY: newDinoY,
          dinoFrame: newDinoFrame,
          groundOffset: newGroundOffset,
        };
      });
    },
    [endGame]
  );

  const gameLoop = useCallback(
    (currentTime: number) => {
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
    },
    [gameState.isPlaying, jump, updateGameState]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    return cleanup;

    return cleanup;
  }, []);

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
        if (isMobile) {
          setDoublePressCount((prev) => {
            if (prev === 1) {
              startGame();
              return 0;
            }
            setTimeout(() => setDoublePressCount(0), 300);
            return prev + 1;
          });
        } else {
          startGame();
        }
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
  }, [gameState.isPlaying, startGame, gameLoop, isMobile]);

  const memoizedClouds = useMemo(
    () =>
      gameState.clouds.map((cloud, index) => (
        <img
          key={index}
          src={cloudImage}
          alt="Cloud"
          className="absolute"
          style={{ left: cloud.x, top: cloud.y }}
        />
      )),
    [gameState.clouds, cloudImage]
  );

  const memoizedObstacles = useMemo(
    () =>
      gameState.obstacles.map((obs, index) => (
        <img
          key={index}
          src={cactusImage}
          alt="Cactus"
          className="absolute"
          style={{
            left: obs.x,
            bottom: 72,
            width: 45,
            height: 78,
          }}
        />
      )),
    [gameState.obstacles, cactusImage]
  );

  const dinoImage = gameState.dinoFrame < 1 ? dinoRun1 : dinoRun2;

  return (
    <div
      ref={gameRef}
      className={`relative overflow-hidden game-bg text-white font-mono ${
        isMobile ? "w-full h-[65vh] " : "w-full h-screen "
      }`}
    >
      <div className="absolute inset-0">
        <div className="absolute top-2 left-2 m-4 text-xl">
          OVR HI {gameState.highScore.toString().padStart(4, "0")}
        </div>
        <div className="absolute top-2 right-2 m-4 text-xl">
          HI {gameState.score.toString().padStart(4, "0")}{" "}
        </div>
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="stars"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="1" fill="white" />
            <circle cx="25" cy="25" r="0.5" fill="white" />
            <circle cx="75" cy="75" r="0.7" fill="white" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#stars)" />
      </svg>

      {memoizedClouds}

      <div
        className="absolute bottom-0 w-[2400px] h-24"
        style={{
          backgroundImage: `url(${groundImage})`,
          backgroundRepeat: "repeat-x",
          transform: `translateX(-${gameState.groundOffset}px)`,
        }}
      />

      <img
        src={dinoImage}
        alt="Dino"
        className={`absolute left-[50px] `}
        style={{
          bottom: gameState.dinoY + 24,
          width: DINO_WIDTH,
          height: DINO_HEIGHT,
        }}
      />

      {memoizedObstacles}

      {!gameState.isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center top-28  m-4">
          <img src={dvj} alt="DevJams Logo" />
          {showStartButton && (
            <p className="text-2xl mb-4 animate-pulse">
              {isMobile
                ? `Double tap to play! (${doublePressCount}/2)`
                : "Press space to play!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DinoGame;
