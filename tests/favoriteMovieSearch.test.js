/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
import { spyOn } from 'jest-mock';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteRestaurantIDB from '../src/scripts/data/favorite-resto-idb';
 
 
describe('Searching movies', () => {
  let presenter;
 
  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
 
    queryElement.dispatchEvent(new Event('change'));
  };
 
  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
    `;
  };
 
  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIDB, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies: FavoriteRestaurantIDB,
    });
  };
 
  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });
 
  it('should be able to capture the query typed by the user', () => {
    FavoriteRestaurantIDB.searchMovies.mockImplementation(() => []);
 
    searchMovies('film a');
 
    expect(presenter.latestQuery).toEqual('film a');
  });
 
  it('should ask the model to search for liked movies', () => {
    FavoriteRestaurantIDB.searchMovies.mockImplementation(() => []);
 
    searchMovies('film a');
 
    expect(FavoriteRestaurantIDB.searchMovies).toHaveBeenCalledWith('film a');
  });
 
  it('should show the found movies', () => {
    presenter._showFoundMovies([{ id: 1 }]);
    expect(document.querySelectorAll('.movie').length).toEqual(1);
 
    presenter._showFoundMovies([
      { id: 1, name: 'Satu' },
      { id: 2, name: 'Dua' },
    ]);
    expect(document.querySelectorAll('.movie').length).toEqual(2);
  });
 
  it('should show the title of the found movies', () => {
    presenter._showFoundMovies([
      { id: 1, name: 'Satu' },
    ]);
 
    expect(document.querySelectorAll('.movie__title')
      .item(0).textContent)
      .toEqual('Satu');
 
    presenter._showFoundMovies([
      { id: 1, name: 'Satu' },
      { id: 2, name: 'Dua' },
    ]);
 
    const movieTitles = document.querySelectorAll('.movie__title');
 
    expect(movieTitles.item(0).textContent).toEqual('Satu');
    expect(movieTitles.item(1).textContent).toEqual('Dua');
  });
 
  it('should show - for found movie without title', () => {
    presenter._showFoundMovies([{ id: 1 }]);
 
    expect(document.querySelectorAll('.movie__title')
      .item(0).textContent)
      .toEqual('-');
  });
 
  it('should show the movies found by Favorite Movies', (done) => {
    document
      .getElementById('movie-search-container')
      .addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(3);
 
        done();
      });
 
    FavoriteRestaurantIDB.searchMovies.mockImplementation((query) => {
      if (query === 'film a') {
        return [
          { id: 111, name: 'film abc' },
          { id: 222, name: 'ada juga film abcde' },
          { id: 333, name: 'ini juga boleh film a' },
        ];
      }
 
      return [];
    });
 
    searchMovies('film a');
  });
 
  it('should show the name of the movies found by Favorite Movies', (done) => {
    document
      .getElementById('movie-search-container')
      .addEventListener('movies:searched:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
 
        expect(movieTitles.item(0).textContent).toEqual('film abc');
        expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
        expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
 
        done();
      });
 
    FavoriteRestaurantIDB.searchMovies.mockImplementation((query) => {
      if (query === 'film a') {
        return [
          { id: 111, title: 'film abc' },
          { id: 222, title: 'ada juga film abcde' },
          { id: 333, title: 'ini juga boleh film a' },
        ];
      }
 
      return [];
    });
 
    searchMovies('film a');
  });
});