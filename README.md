# Movie Review Site

## Searching Movie

This is a simple movie review site which brings data from an IMDb API and shows the essential information regarding that to the user.
<br>
When the user types a name of the movie in the search bar the name of the movie is send to the API call. The code to that call is in folder utils/api_call.js. The result from the API is the information for that movie.
<br>

### Search Result

![searching movie](./images/API_result.png)
<br>

## Saving Movie

When the user click on the green **Add to favourites** button, this tiggers a request to the express server and saves the name and IMDb rating to the mongoDB databasae
<br>

## Saved Movies

![saved movies](./images/saved.png)
The user can delete any movie from the html table they want.
