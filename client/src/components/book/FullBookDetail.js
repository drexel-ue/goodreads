import React, { Component } from "react";
import "./FullBookDetail.scss";

export default class FullBookDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false
    };

    this.book = this.props.book;

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showing: !this.state.showing });
  }

  render() {
    const display = !this.state.showing ? "hide" : "details";

    return (
      <div>
        <div className="full_book_detail">
          <div className={display}>
            <div className="line">
              <div className="label">Original Title</div>
              <div className="reg">{this.book.title}</div>
            </div>
            <div className="line">
              <div className="label">ISBN</div>
              <div className="reg">{this.book.isbn}</div>
            </div>
            <div className="line">
              <div className="label">Edition Language</div>
              <div className="reg">English</div>
            </div>
            <div className="line">
              <div className="label">Series</div>
              <div className="link">{this.book.series}</div>
            </div>
            <div className="line">
              <div className="label">Characters</div>
              <div>
                {this.book.characters.map(char => (
                  <div key={char._id} className="link">
                    {char.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="line">
              <div className="label">Settings</div>
              <div>
                {this.book.settings.map((setting, index) => (
                  <div key={index} className="link">
                    {setting}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="details_expander" onClick={this.toggle}>
          {this.state.showing ? "...Less Detail" : "More Details..."}
        </div>
      </div>
    );
  }
}
