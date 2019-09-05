import React from "react";
import { withRouter, Link } from "react-router-dom";

const NewReleases = (props) => (
    <div className='releases-container'>
        <div className='releases'>
            <div className='releases-float'>
                <div className='left-container'>
                    <h1>New Releases for September 2019</h1>

                    <div className='new-releases'>
                        <table>
                            <tbody>
                                {/* each genre: tr */}
                                {/* inside tr: td, div(genre), h3 with genre name */}
                                {/* inside tr: td, each book: div(new-book), div(new-book-cover), Link, img */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='right-container'>
                    <div className='popular-releases'>
                        <div className='release-head-container'>
                            <h2>Popular new releases</h2>
                        </div>
                        <div className='popular-release-body'>
                            <div className='popular-release-content'>
                                <div className='popular'>
                                    {/* Links with images inside them */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default withRouter(NewReleases);