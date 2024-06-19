# NC News website

This is the front end side of the previously developed backend project which consists of

an Express API server and a PSQL database for a news article article website similar to BBC.

The front end side is built with React and provides the users with an interface to interact with the database.

On the home page, you will see a list of articles. You can filter them by topics,

sort by date posted, vote counts, comment counts and title in ascending or descending order.

The page displays 10 articles at any one time and you can navigate to the next 10 using the pagination bar.

Upon clicking an article you will be taken to the article's own page where you can read the article.

In the article's page you can give likes or dislikes to the article, read other people's comments,

like or dislike other people's comment, post your own comments or delete them if you want.

You will see messages indicating when loading is in process or when errors have occurred.

The project employs React Router Dom as well as hooks such as useState, useEffect, useParams. 

You can find the hosted version of the deployed website here: https://nc-news.samson-ng.com/

the GitHub repo for the backend project here: https://github.com/samson-ng-github/be-nc-news

and the live hosted API here: https://be-nc-news-v1e2.onrender.com/api/

This is how you can clone and run the front end project on your local machine.

1. Go to https://github.com/samson-ng-github/fe-nc-news, click Code and copy the HTTPS address.

2. In your terminal navigate to where you want to download the project and run the command:

git clone [HTTPS address]

3. Once downloaded, open open the project in Visual Studio Code and install all the dependencies in the terminal using this command:

npm install

4. Next you can view the project on a browser by running

npm run dev

This will create a local server at port 5173. Open a browser and enter this as the URL

http://localhost:5173/

5. It is recommended to run the project with Node v20.11.1 or above.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
