import { useAnimalContext } from "../context/AnimalContext";

function canFeed(lastFed?: string) {
  if (!lastFed) return true;
  const last = new Date(lastFed).getTime();
  const now = Date.now();
  return (now - last) / 1000 / 60 / 60 >= 4;
}

function getTimeLeft(lastFed?: string) {
  if (!lastFed) return null;
  const last = new Date(lastFed).getTime();
  const now = Date.now();
  const msLeft = 4 * 60 * 60 * 1000 - (now - last);
  if (msLeft <= 0) return null;
  const min = Math.ceil(msLeft / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

export default function FeedButton({ animalId, lastFed }: { animalId: number; lastFed?: string }) {
  const { feed } = useAnimalContext();
  const enabled = canFeed(lastFed);
  const timeLeft = getTimeLeft(lastFed);

  return (
    <button
      className={`feed-btn ${enabled ? "feed-btn-enabled" : "feed-btn-disabled"}`}
      onClick={() => enabled && feed(animalId)}
      disabled={!enabled}
      title={!enabled && timeLeft ? `Du kan mata om ${timeLeft}` : undefined}
    >
      {enabled ? "Mata djuret" : timeLeft ? `Mätt (${timeLeft} kvar)` : "Mätt"}
    </button>
  );
}
