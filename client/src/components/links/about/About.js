import React from "react";
import "./About.css";

const About = props => (
  <div className="about">
    <h1>Meet the Developers</h1>
    <div className="column">
      <h2>Eugene Birondo</h2>
      <img
        src="https://avatars0.githubusercontent.com/u/45781495?s=460&v=4"
        alt="eugene"
      ></img>
      <div>
        <p>
          Early in my career I sought to help those with mental illness develop
          action plans and problem-solve. Now, as a software developer I am
          looking for new problems to tackle.
        </p>
      </div>
      <div className="social-links">
        <a href="https://github.com/jbirondo">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/eugene-birondo-702637192/">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://angel.co/eugene-birondo">
          <i className="fab fa-angellist"></i>
        </a>
      </div>
    </div>
    <div className="column">
      <h2>Ikesh Pack</h2>
      <img
        src="https://avatars1.githubusercontent.com/u/21110560?s=460&v=4"
        alt="ikesh"
      ></img>
      <div>
        <p>
        Mobile Developer since my first MIT AppMaker 2 app. Web Developer since I realized I could open the browser Developer Tools and rebuilt my high school's website. For the past six months I've been polishing my skills in React, Redux, Flutter, Firebase, Ruby, Rails, GraphQL, NoSQL, SQL, JavaScript. When I'm not behind a keyboard, you can find me in the gym, on the tennis court, or relaxing with family. 
        </p>
      </div>
      <div className="social-links">
        <a href="https://github.com/drexel-ue">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ikesh-pack-96262b192/">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://angel.co/ikesh-pack">
          <i className="fab fa-angellist"></i>
        </a>
      </div>
    </div>
    <div className="column">
      <h2>Savannah Musladin</h2>
      <img
        src="https://avatars1.githubusercontent.com/u/49349891?s=460&v=4"
        alt="savannah"
      ></img>
      <div>
        <p>
          I'm a software engineer experienced in working with JavaScript, React,
          Redux, and Rails. I'm passionate about problem solving and am happiest
          when completely immersed in a complex problem.
        </p>
      </div>
      <div className="social-links">
        <a href="https://github.com/savmus">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/savannah-musladin-525948193/">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://angel.co/savmus">
          <i className="fab fa-angellist"></i>
        </a>
      </div>
    </div>
  </div>
);

export default About;
