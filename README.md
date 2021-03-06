# Space.com Mongo Scraper

### UNC Coding Bootcamp Week 18 Homework Project

[Link to Deployed App](https://arcane-garden-12409.herokuapp.com)

The Space.com Mongo Scraper is a full-stack app that scrapes the Space.com news website, grabs specific elements from each article and then stores them in a MongoDB database.  Once the data has been collected, the articles can displayed in the app.

#### Instructions

There are four buttons on the navigation bar.

* "Home" - Takes you to the main page.
* "Saved Articles" - Displays articles that the user has selected to save.
* "Scrape New Articles" - Scrapes the website and pulls in new articles, sending them to the database.
* "Clear Articles" - Deletes all unsaved articles from the database and clears the screen.

Once scraped, each article has three buttons available.

* "Open" - Opens the site article in a new tab.
* "Save" - Saves the article and prevents it from being deleted when the "Clear Articles" button is used.
* "Delete" - Deletes the article from the database and removes it from the page.

When viewing the saved articles, there are different options available.  In the place of the "Save" button, there is an "Add Comment" button.  Just type in the text field, click the "Add Comment" button, and your comment will be added to the bottom of the card.  

### This project uses the following technologies

#### Front-End
* Vue.js framework
* Vue-router
* Vuetify.js
* HTML5
* CSS3
* JavaScript
* Axios

#### Back-End
* Node.js
* Express.js
* Mongoose
* Cheerio
* Morgan
* Axios

![screenshot](https://github.com/bcoggins78/article-scrape/blob/master/client/src/assets/screenshot.jpg)
