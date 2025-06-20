import { Link } from "react-router-dom";
import type { Animal } from "../context/AnimalContext";
import { useAnimalContext } from "../context/AnimalContext";

function getStatus(lastFed?: string) {
  if (!lastFed) return { label: "Behöver matas", color: "status-red" };
  const last = new Date(lastFed).getTime();
  const now = Date.now();
  const hours = (now - last) / 1000 / 60 / 60;
  if (hours >= 5) return { label: "Behöver matas", color: "status-red" };
  if (hours >= 3) return { label: "Snart hungrig", color: "status-yellow" };
  return { label: "Mätt", color: "status-green" };
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const { feedState } = useAnimalContext();
  const status = getStatus(feedState[animal.id]);

  return (
    <Link to={`/animals/${animal.id}`} className="animal-card">
      <div className="animal-card-img-wrap">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="animal-card-img"
          onError={e => (e.currentTarget.src = "")}
        />
        <span className={`animal-card-status ${status.color}`}>{status.label}</span>
      </div>
      <div>
        <h3>{animal.name}</h3>
        <p>{animal.shortDescription}</p>
      </div>
    </Link>
  );
}
