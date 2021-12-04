const burgerIcon = document.getElementById('burger');

function toggleBurgerMenu(burger) {
  const dropMenu = document.getElementById('navbarBasicExample');
  burger.classList.toggle('is-active');
  dropMenu.classList.toggle('is-active');
}

burgerIcon.addEventListener('click', () => {
  toggleBurgerMenu(burgerIcon);
});

document.addEventListener('DOMContentLoaded', () => {
  const top100List = document.querySelector('.top-100-movie-list');

  const apiImageLink = 'https://image.tmdb.org/t/p/w500';

  // This will create the cards with the images attached
  const makeMovieImageCard = (title, description, rating, num, src, alt) => {
    top100List.innerHTML += `
    <div class="movie-container">
      <div class="circle"> <div id='circleNum'>${num}</div></div>
      <div class="movie-card"> 
          <div class ="movie">
              <img src=${src} alt=${alt}>
          </div>
          <div class="movie-description">
              <h1 class="movie-name">${title}</h1>
              <p class="description-text"> ${description} </p>
          </div>
          <div class="movie-rating">${rating}</div>
      </div>
    </div> 
    `;
  };

  async function imageExtractor() {
    let num = 0;
    // fetch the films table
    const response = await fetch('../api/top100');
    // extract the json data
    const top100moviesArray = await response.json();
    console.log(top100moviesArray);
    // for each movie {film_title, imdb_rating}
    // extract the movie title and rating from top100
    await Promise.all(top100moviesArray.map(async (movieData) => {
      // console.log(movieData.film_title);
      const movieTitle = encodeURIComponent(movieData.film_title.trim());
      const movieRating = movieData.imdb_rating;
      // theoretically using kamran's movieImage route
      const tmdbResponse = await fetch(`../api/movieImages/${movieTitle}`, {method: 'POST'}); 
      const tmdbMovieArray = await tmdbResponse.json();
      try {
        const backDropPath = tmdbMovieArray[0].backdrop_path;
        const posterPath = tmdbMovieArray[0].poster_path;
        if (((backDropPath === null) && (posterPath === null)) || (tmdbMovieArray.length === 0)) {
          const imageSource = '../images/empty-show-curtains.jpg';
          const imageAlt = `${movieData.film_title} image.`;
          const description = tmdbMovieArray[0].overview;
          makeMovieImageCard(movieData.film_title, description,
            movieRating, (num += 1), imageSource, imageAlt);
        } else if ((posterPath !== null) && (backDropPath === null)) {
          const description = tmdbMovieArray[0].overview;
          const imageResponse = await fetch(`${apiImageLink}${posterPath}`);
          const image = await imageResponse.blob();
          const imageSource = URL.createObjectURL(image);
          const imageAlt = `${movieData.film_title} image.`;
          makeMovieImageCard(movieData.film_title, description,
            movieRating, (num += 1), imageSource, imageAlt);
        } else {
          const description = tmdbMovieArray[0].overview;
          const imageResponse = await fetch(`${apiImageLink}${backDropPath}`);
          const image = await imageResponse.blob();
          const imageSource = URL.createObjectURL(image);
          const imageAlt = `${movieData.film_title} image.`;
          makeMovieImageCard(movieData.film_title, description,
            movieRating, (num += 1), imageSource, imageAlt);
        }
      } catch {
        const imageSource = '../images/empty-show-curtains.jpg';
        const imageAlt = `${movieData.film_title} image.`;
        const description = `N/A Unforunately for ${movieData.film_title}`;
        makeMovieImageCard(movieData.film_title, description,
          movieRating, (num += 1), imageSource, imageAlt);
      }
      // using the path found from the movieTitle, directly search for the image
    }));
    return top100moviesArray;
  }
  console.log(top100List);
  imageExtractor(top100List);

  const movieList = ['Avengers: Endgame', 'The Dark Knight', 'Django Unchained', 'Spider-Man: Into the Spider-Verse'];
  let movieCounter = 1;
  async function getImage(titleList) {
    await Promise.all(titleList.map(async (title) => {
      const movieVal = encodeURIComponent(title.trim());
      const results = await fetch(`../api/movieImages/${movieVal}`, {method: 'POST'});
      const movieResults = await results.json();
      const backdropPath = movieResults[0].backdrop_path;
      const imageRequest = await fetch(`${apiImageLink}${backdropPath}`);
      const img = await imageRequest.blob();
      const imgSource = URL.createObjectURL(img);
      const slideShow = `#slide${movieCounter}`;
      const slide = document.getElementById(slideShow);
      slide.src = imgSource;
      slide.alt = title;
      const slideTitle = `#title${movieCounter}`;
      const movieName = document.getElementById(slideTitle);
      movieName.innerHTML = title;
      movieCounter += 1;
    }));
  }
  getImage(movieList);
  let counter = 1;
  setInterval(() => {
    document.getElementById(`radio${counter}`).checked = true;
    counter += 1;
    if (counter > 4) {
      counter = 1;
    }
  }, 5000);
});
