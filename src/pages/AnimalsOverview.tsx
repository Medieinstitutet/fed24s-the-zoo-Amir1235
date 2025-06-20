import { useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import type { Animal } from "../context/AnimalContext";

export default function AnimalsOverview() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://animals.azurewebsites.net/api/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch(() => setError("Kunde inte ladda djur."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laddar djur...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h2 className="animals-title">Våra djur</h2>
      <div className="animals-grid">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
