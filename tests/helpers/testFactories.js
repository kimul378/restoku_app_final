import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter.js';
import FavoriteRestaurantIDB from '../../src/scripts/data/favorite-resto-idb.js';
const createLikeButtonPresenterWithMovie = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteMovies: FavoriteRestaurantIDB,
    restaurant,
  });
};
export { createLikeButtonPresenterWithMovie };