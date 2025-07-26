import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SWAPIApp = () => {
  const [activeTab, setActiveTab] = useState('characters');

  // Моковые данные для демонстрации интерфейса
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

  const CharacterCard = ({ character }) => (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-warning">{character.name}</h5>
            <p className="card-text">
              <strong>Height:</strong> {character.height} cm<br/>
              <strong>Mass:</strong> {character.mass} kg<br/>
              <strong>Birth Year:</strong> {character.birth_year}<br/>
              <strong>Gender:</strong> {character.gender}
            </p>
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>
        </div>
      </div>
  );

  const PlanetCard = ({ planet }) => (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-info">{planet.name}</h5>
            <p className="card-text">
              <strong>Climate:</strong> {planet.climate}<br/>
              <strong>Terrain:</strong> {planet.terrain}<br/>
              <strong>Population:</strong> {planet.population}
            </p>
            <button className="btn btn-info btn-sm">Explore Planet</button>
          </div>
        </div>
      </div>
  );

  const StarshipCard = ({ starship }) => (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-success">{starship.name}</h5>
            <p className="card-text">
              <strong>Model:</strong> {starship.model}<br/>
              <strong>Manufacturer:</strong> {starship.manufacturer}<br/>
              <strong>Crew:</strong> {starship.crew}
            </p>
            <button className="btn btn-success btn-sm">View Ship</button>
          </div>
        </div>
      </div>
  );

  const FilmCard = ({ film }) => (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-danger">Episode {film.episode_id}: {film.title}</h5>
            <p className="card-text">
              <strong>Director:</strong> {film.director}<br/>
              <strong>Producer:</strong> {film.producer}<br/>
              <strong>Release Date:</strong> {film.release_date}
            </p>
            <button className="btn btn-danger btn-sm">Watch Trailer</button>
          </div>
        </div>
      </div>
  );

  return (
      <div className="container-fluid bg-dark text-light min-vh-100">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          <div className="container">
            <a className="navbar-brand fw-bold fs-2" href="#">
              <span className="text-warning">STAR</span> <span className="text-info">WARS</span> API
            </a>
            <div className="navbar-nav ms-auto">
              <span className="navbar-text">May the Force be with you</span>
            </div>
          </div>
        </nav>

        {/* Search Section */}
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search the galaxy far, far away..."
                />
                <button className="btn btn-warning btn-lg" type="button">
                  🔍 Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container">
          <ul className="nav nav-pills nav-fill mb-4">
            <li className="nav-item">
              <button
                  className={`nav-link ${activeTab === 'characters' ? 'active bg-warning text-dark' : 'text-warning'}`}
                  onClick={() => setActiveTab('characters')}
              >
                👥 Characters
              </button>
            </li>
            <li className="nav-item">
              <button
                  className={`nav-link ${activeTab === 'planets' ? 'active bg-info text-dark' : 'text-info'}`}
                  onClick={() => setActiveTab('planets')}
              >
                🪐 Planets
              </button>
            </li>
            <li className="nav-item">
              <button
                  className={`nav-link ${activeTab === 'starships' ? 'active bg-success text-dark' : 'text-success'}`}
                  onClick={() => setActiveTab('starships')}
              >
                🚀 Starships
              </button>
            </li>
            <li className="nav-item">
              <button
                  className={`nav-link ${activeTab === 'films' ? 'active bg-danger text-dark' : 'text-danger'}`}
                  onClick={() => setActiveTab('films')}
              >
                🎬 Films
              </button>
            </li>
          </ul>

          {/* Content */}
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

          {/* Statistics Section */}
          <div className="row mt-5 mb-4">
            <div className="col-md-3">
              <div className="card bg-warning text-dark text-center">
                <div className="card-body">
                  <h2 className="card-title">87</h2>
                  <p className="card-text">Characters</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-dark text-center">
                <div className="card-body">
                  <h2 className="card-title">60</h2>
                  <p className="card-text">Planets</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white text-center">
                <div className="card-body">
                  <h2 className="card-title">37</h2>
                  <p className="card-text">Starships</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white text-center">
                <div className="card-body">
                  <h2 className="card-title">6</h2>
                  <p className="card-text">Films</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-center py-4 mt-5">
          <div className="container">
            <p className="mb-0">
              Made with ❤️ using <span className="text-info">React</span> and <span className="text-primary">Bootstrap</span>
            </p>
            <p className="mb-0 mt-2">
              <small className="text-muted">A long time ago in a galaxy far, far away...</small>
            </p>
          </div>
        </footer>
      </div>
  );
};

export default SWAPIApp;