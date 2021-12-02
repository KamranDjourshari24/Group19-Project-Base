const burgerIcon = document.getElementById('burger');

function toggleBurgerMenu(burger) {
  const dropMenu = document.getElementById('navbarBasicExample');
  burger.classList.toggle('is-active');
  dropMenu.classList.toggle('is-active');
}

burgerIcon.addEventListener('click', () => {
  toggleBurgerMenu(burgerIcon);
});

const httpMethods = Array.from(document.querySelectorAll('#add, #update, #delete'));
httpMethods.forEach((method) => {
  method.addEventListener('click', () => {
    const currentActive = document.getElementsByClassName('is-active')[0];
    currentActive.classList.remove('is-active');
    const otherForms = document.querySelectorAll('form:not([is-hidden])');
    otherForms.forEach((form) => {
      form.classList.add('is-hidden');
    });
    method.classList.add('is-active');
    const newForm = document.getElementById(`${method.id}-form`);
    newForm.classList.remove('is-hidden');
  });
});

function relocatePage() {
  location.replace('../submission/submission.html');
}

const submitInput = document.getElementById('submit-button');
async function addFormSender() {
  const movieInput = document.getElementById('movie-input').value;
  const directorInput = document.getElementById('director-input').value;
  const actorInput = document.getElementById('actor-input').value;
  const genreInput = document.getElementById('genre-input').value;
  const ratingInput = document.getElementById('rating-input').value;
  const dateInput = document.getElementById('date-input').value;
  const input = Array.from(document.getElementById('add-form').querySelectorAll('input, select, textarea'));
  input.forEach((field) => {
    const parent = document.getElementById(field.id).parentElement;
    const fieldvalue = field.value.trim();
    const warning = parent.nextElementSibling !== null;
    if ((warning === false) && ((fieldvalue === '') || (fieldvalue === 'Select Genre') || (fieldvalue === 'Select Rating'))) {
      parent.insertAdjacentHTML('afterend', '<p class="help is-danger">This field is required</br></p>');
    } else if ((warning === true) && ((fieldvalue !== '') && (fieldvalue !== 'Select Genre') && (fieldvalue !== 'Select Rating'))) {
      parent.nextElementSibling.remove();
    }
  });
  const mapping = document.getElementsByClassName('help').length;
  if (mapping === 0) {
    await fetch('../api/directors', {
      method: 'POST',
      body: JSON.stringify({
        director_name: directorInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    await fetch('../api/actors', {
      method: 'POST',
      body: JSON.stringify({
        actor_name: actorInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    await fetch('../api/films', {
      method: 'POST',
      body: JSON.stringify({
        film_title: movieInput,
        release_date: dateInput,
        genre: genreInput,
        rating: ratingInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    await fetch('../api/actors_linking', {
      method: 'POST',
      body: JSON.stringify({
        actor_name: actorInput,
        film_title: movieInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setTimeout(relocatePage, 1000);
  }
}

const updateSubmit = document.getElementById('update-button');
async function updateFormSender() {
  const movieInput = document.getElementById('update-movie-input').value;
  const genreInput = document.getElementById('update-genre-input').value;
  const ratingInput = document.getElementById('update-rating-input').value;
  const dateInput = document.getElementById('update-date-input').value;
  const input = Array.from(document.getElementById('update-form').querySelectorAll('input, select, textarea'));
  input.forEach((field) => {
    const parent = document.getElementById(field.id).parentElement;
    const fieldvalue = field.value.trim();
    const warning = parent.nextElementSibling !== null;
    if ((warning === false) && ((fieldvalue === '') || (fieldvalue === 'Select Genre') || (fieldvalue === 'Select Rating'))) {
      parent.insertAdjacentHTML('afterend', '<p class="help is-danger">This field is required</br></p>');
    } else if ((warning === true) && ((fieldvalue !== '') && (fieldvalue !== 'Select Genre') && (fieldvalue !== 'Select Rating'))) {
      parent.nextElementSibling.remove();
    }
  });
  const mapping = document.getElementsByClassName('help').length;
  if (mapping === 0) {
    await fetch('../api/films', {
      method: 'PUT',
      body: JSON.stringify({
        film_title: movieInput,
        release_date: dateInput,
        genre: genreInput,
        imdbRating: ratingInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setTimeout(relocatePage, 1000);
  }
}

const deleteSubmit = document.getElementById('delete-button');
async function deleteFormSender() {
  const movieInput = document.getElementById('delete-movie-input').value;
  const input = Array.from(document.getElementById('delete-form').querySelectorAll('input, select, textarea'));
  input.forEach((field) => {
    const parent = document.getElementById(field.id).parentElement;
    const fieldvalue = field.value.trim();
    const warning = parent.nextElementSibling !== null;
    if ((warning === false) && ((fieldvalue === '') || (fieldvalue === 'Select Genre') || (fieldvalue === 'Select Rating'))) {
      parent.insertAdjacentHTML('afterend', '<p class="help is-danger">This field is required</br></p>');
    } else if ((warning === true) && ((fieldvalue !== '') && (fieldvalue !== 'Select Genre') && (fieldvalue !== 'Select Rating'))) {
      parent.nextElementSibling.remove();
    }
  });
  const mapping = document.getElementsByClassName('help').length;
  if (mapping === 0) {
    await fetch('../api/actors_linking', {
      method: 'DELETE',
      body: JSON.stringify({
        film_title: movieInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    await fetch('../api/films', {
      method: 'DELETE',
      body: JSON.stringify({
        film_title: movieInput
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setTimeout(relocatePage, 1000);
  }
}

submitInput.addEventListener('click', (event) => {
  event.preventDefault();
  addFormSender();
});

updateSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  updateFormSender();
});

deleteSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  deleteFormSender();
});