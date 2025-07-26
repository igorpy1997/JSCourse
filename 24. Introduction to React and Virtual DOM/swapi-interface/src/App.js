// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import SearchSection from './components/SearchSection.jsx';
import TabNavigation from './components/TabNavigation.jsx';
import CharacterCard from './components/CharacterCard.jsx';
import PlanetCard from './components/PlanetCard.jsx';
import StarshipCard from './components/StarshipCard.jsx';
import FilmCard from './components/FilmCard.jsx';
import StatisticsSection from './components/StatisticsSection.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('characters');

  // Моковые данные
  const mockCharacters = [
    { id: 1, name: 'Luke Skywalker', height: '172', mass: '77', birth_year: '19BBY', gender: 'male' },
    { id: 2, name: 'Darth Vader', height: '202', mass: '136', birth_year: '41.9BBY', gender: 'male' },
    { id: 3, name: 'Leia Organa', height: '150', mass: '49', birth_year: '19BBY', gender: 'female' },
    { id: 4, name: 'Obi-Wan Kenobi', height: '182', mass: '77', birth_year: '57BBY', gender: 'male' },
  ];

  const mockPlanets = [
    { id: 1, name: 'Tatooine', climate: 'arid', terrain: 'desert', population: '200000' },
    { id: 2, name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountains', population: '2000000000' },
    { id: 3, name: 'Yavin IV', climate: 'temperate, tropical', terrain: 'jungle, rainforests', population: '1000' },
    { id: 4, name: 'Hoth', climate: 'frozen', terrain: 'tundra, ice caves, mountain ranges', population: 'unknown' },
  ];

  const mockStarships = [
    { id: 1, name: 'Death Star', model: 'DS-1 Orbital Battle Station', manufacturer: 'Imperial Department of Military Research', crew: '342953' },
    { id: 2, name: 'Millennium Falcon', model: 'YT-1300 light freighter', manufacturer: 'Corellian Engineering Corporation', crew: '4' },
    { id: 3, name: 'X-wing', model: 'T-65 X-wing', manufacturer: 'Incom Corporation', crew: '1' },
    { id: 4, name: 'TIE Advanced x1', model: 'Twin Ion Engine Advanced x1', manufacturer: 'Sienar Fleet Systems', crew: '1' },
  ];

  const mockFilms = [
    { id: 1, title: 'A New Hope', episode_id: 4, director: 'George Lucas', producer: 'Gary Kurtz, Rick McCallum', release_date: '1977-05-25' },
    { id: 2, title: 'The Empire Strikes Back', episode_id: 5, director: 'Irvin Kershner', producer: 'Gary Kurtz, Rick McCallum', release_date: '1980-05-17' },
    { id: 3, title: 'Return of the Jedi', episode_id: 6, director: 'Richard Marquand', producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum', release_date: '1983-05-25' },
    { id: 4, title: 'The Phantom Menace', episode_id: 1, director: 'George Lucas', producer: 'Rick McCallum', release_date: '1999-05-19' },
  ];

  return (
      <div className="container-fluid bg-dark text-light min-vh-100">
        <Header />
        <SearchSection />

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="container">
          <div className="row">
            {activeTab === 'characters' && mockCharacters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))}

            {activeTab === 'planets' && mockPlanets.map(planet => (
                <PlanetCard key={planet.id} planet={planet} />
            ))}

            {activeTab === 'starships' && mockStarships.map(starship => (
                <StarshipCard key={starship.id} starship={starship} />
            ))}

            {activeTab === 'films' && mockFilms.map(film => (
                <FilmCard key={film.id} film={film} />
            ))}
          </div>

          <StatisticsSection />
        </div>

        <Footer />
      </div>
  );
};

export default App;