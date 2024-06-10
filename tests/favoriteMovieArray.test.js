import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContract';
 
let favoriteMovies = [];
 
const FavoriteMovieArray = {
    getRestoIDB(id) {
    if (!id) {
      return;
    }
 
    return favoriteMovies.find((restaurant) => restaurant.id == id);
  },
 
  getAllRestoIDB() {
    return favoriteMovies;
  },
 
  putRestoIDB(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getRestoIDB(restaurant.id)) {
      return;
    }
 
    favoriteMovies.push(restaurant);
  },
 
  deleteRestoIDB(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteMovies = favoriteMovies.filter((restaurant) => restaurant.id != id);
  },
};
 
describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteMovies = [];
  });
 
  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});