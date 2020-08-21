import React, { Component } from "react";
import AddToHomescreen from 'react-add-to-homescreen';

// import WebMapView from "./components/WebMapView/WebMapView";
import "./App.scss";
import TELEGRAM_ICON from './assets/telegram-app-48.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telegramFolded: true,s
      telegramClicked: false
    }
  }

  tapOnTelegramButton(e) {
    e.stopPropagation();
    if (this.state.telegramClicked) {

    }
  }

  launchTelegram() {

  }

  handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };

  render() {
    return (
      <div className="App" style={{margin: 0, padding: 0, height: '100%', border: 'none'}}>
        {/*<WebMapView />*/}
        <iframe
          style={{
            margin: 0,
            padding: 0,
            height: "100%",
            border: "none",
            display: "block",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          id="arcgis_iframe"
          src="https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=d20dff912ddd4af6a265dad0d0d782fb"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          scrolling="auto"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title={'GeoBel'}
        />
        <a
          onClick={(e) => this.tapOnTelegramButton(e)}
          className="button support-button"
          target="_blank"
          href="https://t.me/joinchat/CVMoxBKG8TGpZZy74Ren3g">
          <img src={TELEGRAM_ICON} height={30} width={30}/>
          &nbsp;&nbsp;Техподдержка
        </a>
        <AddToHomescreen onAddToHomescreenClick={this.handleAddToHomescreenClick} />
      </div>
    );
  }
}
