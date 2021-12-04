# Movie Ratings HQ

## Description
As home entertainment continues to rise in popularity and more films than ever before are being produced, the need to find the right movie becomes more difficult for most movie fanatics. The search for an intriguing movie to watch leaves many users frustrated browsing for something that fits their interests. Some seem to face information overload with too many movies to choose from, which only fatigues people from watching anything. Our application tries to solve this by providing an open community film website where users can explore and specifically search for movies to watch. They can also add or edit movies to the database for others to potentially see and watch.  

## Link To Website
https://movie-rating-hq.herokuapp.com/

## Target Browsers 
### Operating Systems
* IOS
* Andriod
* Windows
* MacOS

### Types of Devices That the Application Should Work On
* iPhone 6/7/8
* iPhone 6/7/8 Plus
* iPad
* Pixel 2 XL
* Galaxy S5
* MacBook Pro 13/15

## Link
* [Developer Manual](https://github.com/KamranDjourshari24/Group19-Project-Base#developer-manual)

# Developer Manual
## How to Install the Application and all Node Module Dependencies
1. Clone the [Repository](https://github.com/KamranDjourshari24/Group19-Project-Base) via GitHub Desktop or the Terminal of your OS
2. Open the directory, where the repository is stored, in VSCode's Terminal or your OS's Terminal
3. Type into the terminal `npm install` and run it by pressing enter. The Application should now be able to run on your computer

## How to Run the Application on a Local Server
1. Open the directory, where the repository is stored, in VSCode's Terminal or your OS's Terminal
2. Type into the terminal `npm start` and run it by pressing enter. There should be no errors popping up.
3. In your desired web browser, enter the following URL to view the Application: `http://localhost:3000/`

## How to Run Tests for the Application
*Note: We do not have any tests in the repository at the moment* 
1. Within VSCode, Open a split terminal (or two terminals) in the Repository directory
2. In one terminal run `npm start`
3. In the second terminal run `npm test`

## API Server Endpoints
`/api/actors_linking` - API route for actors linking data
* GET - Returns a JSON response of the data from a SELECT statement of the actors linking table
* PUT - Updates the Actors Linking table based on the linking ID provided, responds with Sequalize response
* POST - Enters row into the actors_linking table based on the provided film title and actor name. Responds with Sequalize response
* DELETE - Deletes row from actors_linking table based on the provided film title

`/api/actors` - API route for the actors data
* GET - Returns a JSON response of the data from a SELECT statement of the actors table with a logged message to the console
* PUT - Updates the Actors based on the actor name and ID provided, responds with a message explaining which actor was updated
* POST - Enters row into the actors table based on the provided actor name. Responds with Sequalize response
* DELETE - Deletes row from Actors table based on the provided actors name and responds with message of the actor name deleted

`/api/directors` - API route for the directors data
* GET - Returns a JSON response of the data from a SELECT statement of the directors table
* PUT - Updates the Directors table based on the director name and ID provided, responds with a message of which director was updated
* POST - Enters row into the directors table based on the provided director name. Responds with director uploaded to the Database
* DELETE - Deletes row from Actors table based on the provided director name and responds with message of the director name deleted

`/api/films` - API route for the films data
* GET - Returns a JSON response of the data from a SELECT statement of the films table joined with the genre and directors table
* PUT - Updates the films table based on the film title, genre, release date and rating provided, responds with film title updated
* POST - Enters row into the films table based on film title, genre, director, release date and rating. Responds with film title created
* DELETE - Deletes row from films table based on the provided film title and responds with the film name deleted

`/api/customMap` - API route for a custom film queries
* GET - Returns a JSON response of the films which won an award with all their awards won in one column seperated by commas
* POST - Returns a JSON response of all the actors staring in a film (seperated by a comma) based on the given film_title in the body  

`/api/awards` - API route for awards data
* GET - Returns a JSON response of the data from a SELECT statement of the awards table joined with the films and awards_linking table
* PUT - Updates the awards table based on the award title, responds with award title updated
* POST - Enters row into the awards table based on the new award title given in the body. Responds with award title created
* DELETE - Deletes row from awards table based on the provided award title and responds with the award name deleted

`/api/movieImages/:movieTitle` - API route for third party The Movie DataBase which provides the images and overview for our website
* POST - Returns a JSON response with the query results of the given film title (URI encoded) into the route URL. These include a general informations of the matched films.

`/api/top100` - API route to retrieve the top 100 films for the Top 100 Page on the application
* GET - Returns a JSON response with only 100 films based solely on the top film's rating. It also logs in the console that the Top100 endpoint was touched with GET.

`/api/genre` - API route for awards data
* GET - Returns a JSON response of the data from a SELECT statement of the table with all the possible genres
* PUT - Updates the genre table based on the genre title and ID given, responds with name of the genre updated
* POST - Enters row into the genre table based on the new genre given in the body. Responds with name of genre created
* DELETE - Deletes row from genre table based on the provided genre and responds with the genre name deleted

`/api/genremovies` - API route to retrieve the films that match the given genre
* POST - Returns a JSON response with only the films that match the genre given in the body.

## Known Bugs and Future Plans for Development
### Bugs
* The carousel doesn't tell you which image position you are on with the provided buttons on the caoursel
* The films provided may show no description, which will show as empty, if it doesn't exist in The Movie Database API
* Images may take a second to load when the page loads due to it retrieving it from an outside source

### Future Development
* Add even more ways to filter the film results in the Discovery Page (genre, movie ratings provided by EIRIN)
* Individual pages for each film which provides even more detail on the pages
* The ability to share reviews so others who open the site can view and reply to
* An efficient way to rate films with interactive starts that the user can click on to provide a rating
* User Profiles so users can save their data of things they saved and rated
* Provide clips of films as well so people can watch the trailer/snippit of the movie