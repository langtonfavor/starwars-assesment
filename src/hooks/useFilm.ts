import { useCallback, useEffect, useState } from 'react';
import { Film } from '../types/Film.types';

type Character = {
  name: string;
  url: string;
};

type Planet = {
  name: string;
  url: string;
};

export function useFilms(data: Film | undefined) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacters = useCallback(async () => {
    try {
      data?.characters.forEach((character: any) => {
        fetch(character)
          .then((dataResponse) => dataResponse.json())
          .then((characterData) => setCharacters((prevState) => {
            if (prevState.includes(characterData.name)) return prevState;
            return [
              ...prevState,
              {
                name: characterData.name,
                url: characterData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.characters]);

  const getPlanets = useCallback(async () => {
    try {
      data?.planets.forEach((planet: any) => {
        fetch(planet)
          .then((dataResponse) => dataResponse.json())
          .then((planetData) => setPlanets((prevState) => {
            if (prevState.includes(planetData.name)) return prevState;
            return [
              ...prevState,
              {
                name: planetData.name,
                url: planetData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.planets]);

  useEffect(() => {
    setIsLoading(true);
    getCharacters();
  }, [getCharacters]);

  useEffect(() => {
    setIsLoading(true);
    getPlanets();
  }, [getPlanets]);

  return {
    characters,
    planets,
    isLoading,
  };
}
