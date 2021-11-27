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

  const movieList = ['Avengers:+Endgame', 'The+Dark+Knight', 'Django+Unchained', 'Spider-Man:+Into+the+Spider-Verse'];
  async function getImage(titleList) {
    await Promise.all(titleList.map(async (title) => {
      const movieVal = encodeURIComponent(title.trim());
      const results = await fetch(`../api/movieImages/${movieVal}`, {method: 'POST'});
      const movieResults = await results.json();
      const backdropPath = movieResults[0].backdrop_path;
      const imageRequest = await fetch(`${apiImageLink}${backdropPath}`);
      const img = await imageRequest.blob();
      const imgSource = URL.createObjectURL(img);
    }));
  }
  getImage(movieList);
  let counter = 1;
  setInterval(() => {
    counter += 1;
    if (counter > 4) {
      counter = 1;
    }
  }, 5000);
});

$(document).ready(function () {
  const bigimage = $("#big");
  let thumbs = $("#thumbs");
  let syncedSecondary = true;

  bigimage
  .owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    animateOut: "fadeOut",
    autoplay: true,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
    navText: [
      '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    ],
  })
  .on("changed.owl.carousel", syncPosition);

  thumbs
    .on("initialized.owl.carousel", function () {
      thumbs.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: 7,
      dots: true,
      nav: true,
      navText: [
        '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
      ],
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: 4,
      responsiveRefreshRate: 100,
      responsive:{
        0:{
            items:2,
        },
        600:{
            items:5,
        },
        1000:{
          items:7,
      }
    },
    })
    .on("changed.owl.carousel", syncPosition2);
  function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;
  
      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
      // $("#counter").html("item " + current + " of " + count);
      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs.find(".owl-item.active").first().index();
      var end = thumbs.find(".owl-item.active").last().index();
  
      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }
  
    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }
  
  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data('owl.carousel').to(number, 300, true);
  });
});