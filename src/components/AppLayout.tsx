// Main layout component with sidebar and feed
import React, { useState, useEffect } from "react";
import EpisodeList from "./EpisodeList";
import CharacterFeed from "./CharacterFeed";
import { Character } from "../types/Character";
import '../App.css';

interface EpisodeDetails {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

const AppLayout: React.FC = () => {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);

  // Fetch characters for a specific page
  const fetchCharacters = async (page: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  // Fetch initial characters
  useEffect(() => {
    fetchCharacters(1);
  }, []);

  const handleEpisodeSelect = (episodeId: number) => {
    if (episodeId === selectedEpisodeId) {
      setSelectedEpisodeId(null);
      fetchCharacters(1); // Revert to initial characters on deselect
      setEpisodeDetails(null); // Clear episode details on deselect
    } else {
      setSelectedEpisodeId(episodeId);
      fetchEpisodeCharacters(episodeId);
    }
  };

  const fetchEpisodeCharacters = async (episodeId: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      const data = await response.json();
      const characterUrls = data.characters;

      const characterData = await Promise.all(
        characterUrls.map((url: string) => fetch(url).then((res) => res.json()))
      );

      setCharacters(characterData);
      setTotalPages(1); // Only one page for episode-specific characters
      setEpisodeDetails(data); // Set episode details after fetching
    } catch (error) {
      console.error("Error fetching episode characters:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCharacters(newPage);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 bg-light p-4">
          <EpisodeList 
            onEpisodeSelect={handleEpisodeSelect} 
            selectedEpisodeId={selectedEpisodeId || 0} 
          />
        </aside>
        <main className="col-md-9 p-4">
          <CharacterFeed 
            characters={characters} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
            selectedEpisode={selectedEpisodeId || 0} 
            episodeDetails={episodeDetails}  
          />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

