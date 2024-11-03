// Displays character images and names
import React from 'react';
import { Character } from '../types/Character';
import '../App.css';

interface CharacterFeedProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedEpisode: number | null;
  episodeDetails: { id: number; name: string; characters: string[] } | null;
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({
  characters,
  currentPage,
  totalPages,
  onPageChange,
  selectedEpisode,
  episodeDetails,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const visiblePages = 2;

    pages.push(
      <button key={1} className={`btn btn-outline-primary mx-1 ${currentPage === 1 ? "active" : ""}`} onClick={() => handlePageClick(1)} > 1 </button>
    );

    if (currentPage > visiblePages + 2) {
      pages.push(
        <button key="start-ellipsis" className="btn btn-outline-primary mx-1" disabled> ... </button>
      );
    }

    const startPage = Math.max(2, currentPage - visiblePages);
    const endPage = Math.min(totalPages - 1, currentPage + visiblePages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-outline-primary mx-1 ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <button key="end-ellipsis" className="btn btn-outline-primary mx-1" disabled> ... </button>
      );
    }

    pages.push( 
      <button key={totalPages} className={`btn btn-outline-primary mx-1 ${currentPage === totalPages ? "active" : ""}`} onClick={() => handlePageClick(totalPages)} > {totalPages} </button>
    );

    return pages;
  };

  return (
    <div className="character-feed-container">
      <h2 className="mb-3">Characters</h2>

      {episodeDetails && (
        <div className="mb-4">
          <p>
            {episodeDetails.characters.length} characters in episode "{episodeDetails.name}"
          </p>
        </div>
      )}

      <div className="character-feed-scrollable">
        <div className="row">
          {characters.map((character) => (
            <div key={character.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={character.image} className="card-img-top" alt={character.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{character.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!selectedEpisode && (
        <div className="pagination-controls d-flex justify-content-center mt-4">
          <button className="btn btn-outline-primary me-2" onClick={handlePrevious} disabled={currentPage === 1} > &larr; </button>

          {renderPageNumbers()}

          <button className="btn btn-outline-primary ms-2" onClick={handleNext} disabled={currentPage === totalPages} > &rarr; </button>
        </div>
      )}
    </div>
  );
};

export default CharacterFeed;




