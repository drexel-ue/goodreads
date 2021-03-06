# BADREADS

## Background and Overview

[Badreads](https://quiet-shore-31528.herokuapp.com/#/) is a clone of [Goodreads](https://goodreads.com) world’s largest site for readers and book recommendations. Our mission is to help people find and share books they love. Badreads launched in AppAcademy Online Cohort 04/22.

## Technologies

- User Auth

  - Passwords are secured using BCrypt to generate a passord_digest. A user session_token is stored in the database to keep track of each user session. When a user successfully logs in, a session token is generated, stored in the database, and stored on the client-side as a browser cookie.

- MongoDB

  - The application will be utilizing MongoDB for it database. MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.

- Express

  - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- React

  - ReactJS is an open-source JavaScript library which is used for building user interfaces specifically for single page applications. It’s used for handling view layer for web and mobile apps. React also allows us to create reusable UI components.

- Node

  - Node.js is an open-source, cross-platform, JavaScript run-time environment that executes JavaScript code outside of a browser.

- Apollo

  - A frontend framework providing GraphQL integrated React Components.

- GraphQL

  - GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL will be used to fetch data from the database.

- Docker

  - Docker is a set of platform-as-a-service products that use operating-system-level virtualization to deliver software in packages called containers. Docker images will be deployed to the Heroku Container Registry.

- Heroku

  - Heroku is a cloud platform as a service supporting several programming languages. Badreads will be deployed to Heroku for production in the form of a Docker image.

![home](https://github.com/drexel-ue/goodreads/blob/master/home.png)

![book_show](https://github.com/drexel-ue/goodreads/blob/master/book_show.png)

![my_books](https://github.com/drexel-ue/goodreads/blob/master/my_books.png)

### A Simple Lazy Loader

```javascript
// img elements placed onto the page are done so with the source url stored in an attribute called `data_lazy`.
const lazyLoad = target => {
  // takes in an HTML DOM element as the target.
  const io = new IntersectionObserver((enteries, observer) => {
    // provides a list of observed events (entries) and an observer of those events.
    enteries.forEach(entry => {
      if (entry.isIntersecting) {
        // if the entry occured on screen.
        const img = entry.target; // grab the img element.
        const src = img.getAttribute("data_lazy"); // grab the url to be assigned to source.

        if (src) img.setAttribute("src", src); // move the url to src to "activiate/load" the image.

        observer.disconnect(); // stop listening for events and garbage collect the observer.
      }
    });
  });

  io.observe(target); // begin observation.
};

export default lazyLoad;
```
