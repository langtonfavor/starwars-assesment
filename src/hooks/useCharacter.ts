import { useCallback, useEffect, useState } from 'react';
import { Character } from '../types/Character.type';

type Film = {
    title: string;
    url: string;
};

type HomeWorld = {
    name: string;
    url: string;
};

export function useCharacter(data: Character | undefined) {
    const [films, setFilms] = useState<Film[]>([]);
    const [homeWorld, setHomeWorld] = useState<HomeWorld>({
        name: '',
        url: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const getFilms = useCallback(async () => {
        try {
            data?.films.forEach(async (film) => {
                const response = await fetch(film);
                const filmData = await response.json();
                setFilms((prevState) => {
                    if (prevState.includes(filmData.title)) return prevState;
                    return [
                        ...prevState,
                        {
                            title: filmData.title,
                            url: filmData.url,
                        },
                    ];
                });
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data?.films]);

    const getHomeWorld = useCallback(async () => {
        try {
            if (!data?.homeworld) return;
            const response = await fetch(data.homeworld);
            const homeWorldData = await response.json();
            setHomeWorld({
                name: homeWorldData.name,
                url: homeWorldData.url,
            });
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [data?.homeworld]);

    useEffect(() => {
        getFilms();
    }, [getFilms]);

    return {
        films,
        homeWorld,
        isLoading,
    };
}
