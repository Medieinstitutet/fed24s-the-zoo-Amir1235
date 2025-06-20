import { createContext, useContext, useReducer, useEffect } from "react";

export type Animal = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
};

type FeedState = { [id: number]: string };
type Action = { type: "feed"; animalId: number; time: string };

function feedReducer(state: FeedState, action: Action): FeedState {
  if (action.type === "feed") {
    return { ...state, [action.animalId]: action.time };
  }
  return state;
}

const AnimalContext = createContext<{
  feedState: FeedState;
  feed: (id: number) => void;
} | undefined>(undefined);

export function AnimalProvider({ children }: { children: React.ReactNode }) {
  const [feedState, dispatch] = useReducer(feedReducer, {}, () => {
    const saved = localStorage.getItem("feedState");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("feedState", JSON.stringify(feedState));
  }, [feedState]);

  function feed(id: number) {
    dispatch({ type: "feed", animalId: id, time: new Date().toISOString() });
  }

  return (
    <AnimalContext.Provider value={{ feedState, feed }}>
      {children}
    </AnimalContext.Provider>
  );
}

export function useAnimalContext() {
  const ctx = useContext(AnimalContext);
  if (!ctx) throw new Error();
  return ctx;
}
