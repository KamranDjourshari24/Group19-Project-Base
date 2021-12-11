export default `SELECT film_title, imdb_rating, release_date FROM films
JOIN genre USING(genre_id)
WHERE genre = :genre`;
