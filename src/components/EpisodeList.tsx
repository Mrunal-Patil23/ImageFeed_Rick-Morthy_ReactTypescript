// Displays the list of episodes in the sidebar
import React, { useEffect, useState } from "react";
import { Episode } from "../types/Episode";
import { fetchEpisodes } from "../services/api";

interface EpisodeListProps {
  onEpisodeSelect: (episodeId: number) => void;
  selectedEpisodeId: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ onEpisodeSelect, selectedEpisodeId }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetchEpisodes().then(setEpisodes).catch(console.error);
  }, []);

  const handleClick = (episodeId: number) => {
    onEpisodeSelect(episodeId);
  };

  return (
    <div className="episode">
      <h2 className="mb-3">Episodes</h2>
      <ul className="list-group episode-list">
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`list-group-item list-group-item-action ${
              episode.id === selectedEpisodeId ? "active" : ""
            }`}
            onClick={() => handleClick(episode.id)}
            style={{ cursor: "pointer" }}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;

