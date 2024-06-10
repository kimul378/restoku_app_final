class FavoriteMovieShowPresenter {
    constructor({ view, favoriteMovies }) {
      this._view = view;
      this._favoriteMovies = favoriteMovies;
  
      this._showFavoriteMovies();
    }
  
    async _showFavoriteMovies() {
      const restaurants = await this._favoriteMovies.getAllRestoIDB();
      this._displayMovies(restaurants);
    }
  
    _displayMovies(restaurants) {
      this._view.showFavoriteMovies(restaurants);
    }
  }
  
  export default FavoriteMovieShowPresenter;
  