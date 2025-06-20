import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Animal } from "../context/AnimalContext";
import { useAnimalContext } from "../context/AnimalContext";
import FeedButton from "../components/FeedButton.tsx";

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { feedState } = useAnimalContext();

  useEffect(() => {
    fetch("https://animals.azurewebsites.net/api/animals")
      .then((res) => res.json())
      .then((data: Animal[]) => {
        const found = data.find((a) => a.id === Number(id));
        if (!found) {
          setError("Djuret hittades inte.");
        } else {
          setAnimal(found);
        }
      })
      .catch(() => setError("Kunde inte ladda djur."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Laddar djur...</div>;
  if (error)
    return (
      <div className="error-message">
        {error}{" "}
        <button
          onClick={() => navigate(-1)}
          className="back-link"
        >
          Tillbaka
        </button>
      </div>
    );
  if (!animal) return null;

  const lastFed = feedState[animal.id];
  let status = "Mätt";
  let statusColor = "status-green";
  let soon = false;
  if (!lastFed) {
    status = "Behöver matas";
    statusColor = "status-red";
  } else {
    const last = new Date(lastFed).getTime();
    const now = Date.now();
    const hours = (now - last) / 1000 / 60 / 60;
    if (hours >= 4) {
      status = "Behöver matas";
      statusColor = "status-red";
    } else if (hours >= 3) {
      status = "Snart hungrig";
      statusColor = "status-yellow";
      soon = true;
    }
  }

  return (
    <div className="animal-detail">
      <div className="animal-detail-content">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="animal-detail-img"
          onError={(e) => (e.currentTarget.src = "")}
        />
        <div className="animal-detail-info">
          <h2 className="animal-detail-title">{animal.name}</h2>
          <div className={`animal-detail-status ${statusColor}`}>{status}</div>
          {soon && (
            <div className="animal-detail-warning">
              Djuret behöver snart matas!
            </div>
          )}
          <p className="animal-detail-desc">{animal.description}</p>
          <FeedButton animalId={animal.id} lastFed={lastFed} />
        </div>
      </div>
    </div>
  );
}
