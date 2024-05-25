import { useParams } from 'react-router-dom';

const Game = () => {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Game Room: {roomId}</h1>
    </div>
  );
};

export default Game;