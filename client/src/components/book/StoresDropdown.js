import React, { Component } from "react";
import "./BookShow.scss";

export default class StoresDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false
    };

    this.timeOut = undefined;

    this.show = this.show.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.timerHide = this.timerHide.bind(this);
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.timeOut);
    this.setState({ showing: true });
  }

  toggleShow(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showing: !this.state.showing });
  }

  timerHide(event) {
    event.preventDefault();
    event.stopPropagation();
    const that = this;
    this.timeOut = setTimeout(() => {
      that.setState({ showing: false });
    }, 250);
  }

  render() {
    const stores = [
      "Powell's Books",
      "Better World Books",
      "BookMooch",
      "Skyo",
      "Thrift Books",
      "Alibris",
      "The Strand",
      "AbeBooks"
    ];

    const classList = this.state.showing ? "stores" : "hide";

    return (
      <div
        className="option dropdown"
        onMouseEnter={this.show}
        onMouseLeave={this.timerHide}
      >
        Stores <i className="fas fa-caret-down"></i>
        <div
          className={classList}
          onMouseEnter={this.show}
          onMouseLeave={this.timerHide}
        >
          {stores.map(store => (
            <div key={store} className="store">
              {store}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
