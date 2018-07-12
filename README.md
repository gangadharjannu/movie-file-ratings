# movie-file-ratings
An application which display IMDB ratings of movie files.

Problem:  
Had to clean my hard disk and increase the free space.
* Hard disk mostly contains copied/downloaded movies (1000+).
* It is hard to delete each and every movie because I don't want to remove good movies (atleast considering IMDB rating >7)
* I find it extermely difficult to select each file and get the movie name (because they are mostly downloaded from torrents) inorder to search in IMDB.

Solution: 
* A window which will display all files/folders from specified folder along with movie name and imdb rating
* It will allows us to sort movies by imdb rating
* It will allows to multi select and delete them.

Problem solving steps:  
1. list folders/files
2. extract movie names
3. call IMDB service with given movie name and display rating.

So the output would be something like this

| Files / Folders       | Movie Name        | IMDB Rating  |
| -------------         |:-------------:    | -----:|
| Atlantis BRRIP.2010   | Atlantis          | 6.7 |
| Inception.2011.Xvid   | Inception         | 7.5 |
| Ratatoui              | Ratatoui          | 9.3 |