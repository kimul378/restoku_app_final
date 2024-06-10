const itActsAsFavoriteMovieModel = (FavoriteRestoIDB) => {
    it('should return the movie that has been added', async () => {
      FavoriteRestoIDB.putRestoIDB({ id: 1 });
      FavoriteRestoIDB.putRestoIDB({ id: 2 });
   
      expect(await FavoriteRestoIDB.getRestoIDB(1)).toEqual({ id: 1 });
      expect(await FavoriteRestoIDB.getRestoIDB(2)).toEqual({ id: 2 });
      expect(await FavoriteRestoIDB.getRestoIDB(3)).toEqual(undefined);
    });
   
    it('should refuse a movie from being added if it does not have the correct property', async () => {
      FavoriteRestoIDB.putRestoIDB({ aProperty: 'property' });
   
      expect(await FavoriteRestoIDB.getAllRestoIDB()).toEqual([]);
    });
   
    it('can return all of the movies that have been added', async () => {
      FavoriteRestoIDB.putRestoIDB({ id: 1 });
      FavoriteRestoIDB.putRestoIDB({ id: 2 });
   
      expect(await FavoriteRestoIDB.getAllRestoIDB()).toEqual([{ id: 1 }, { id: 2 }]);
    });
   
    it('should remove favorite movie', async () => {
      FavoriteRestoIDB.putRestoIDB({ id: 1 });
      FavoriteRestoIDB.putRestoIDB({ id: 2 });
      FavoriteRestoIDB.putRestoIDB({ id: 3 });
   
      await FavoriteRestoIDB.deleteRestoIDB(1);
   
      expect(await FavoriteRestoIDB.getAllRestoIDB()).toEqual([{ id: 2 }, { id: 3 }]);
    });
   
    it('should handle request to remove a movie even though the movie has not been added', async () => {
      FavoriteRestoIDB.putRestoIDB({ id: 1 });
      FavoriteRestoIDB.putRestoIDB({ id: 2 });
      FavoriteRestoIDB.putRestoIDB({ id: 3 });
   
      await FavoriteRestoIDB.deleteRestoIDB(4);
   
      expect(await FavoriteRestoIDB.getAllRestoIDB()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
  };
   
  // eslint-disable-next-line import/prefer-default-export
  export { itActsAsFavoriteMovieModel };