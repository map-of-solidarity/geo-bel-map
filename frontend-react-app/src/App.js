import React, { Component } from "react";
import AddToHomescreen from "react-add-to-homescreen";
import firebase from './helpers/Firebase';
// import WebMapView from "./components/WebMapView/WebMapView";
import "./App.scss";
import * as serviceWorker from './serviceWorker';

import TELEGRAM_ICON from "./assets/telegram-app-48.png";
const TELEGRAM_SUPPORT_GROUP = process.env.REACT_APP_TELEGRAM_SUPPORT_URL;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telegramFolded: true,
      telegramHidden: false,
    };
  }

  componentDidMount() {
    this.getPushToken().catch(e => console.warn('err in getPushToken', e))
  }

  async getPushToken() {
    const token = await firebase.messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_WEB_NOTIFICATIONS_KEY});
    console.log('token', token)
  }

  tapOnTelegramButton(e) {
    e.stopPropagation();
    firebase.analytics.logEvent('tap_telegram_button');
    if (!this.state.telegramFolded) {
      this.setState({ telegramFolded: true });
      this.launchTelegram();
    } else {
      this.setState({ telegramFolded: false });
    }
  }

  hideTelegramBubble(e) {
    e.stopPropagation();
    this.setState({ telegramHidden: true });
  }

  launchTelegram() {
    firebase.analytics.logEvent('launched_telegram_support');
    window.open(TELEGRAM_SUPPORT_GROUP);
  }

  handleAddToHomescreenClick = () => {
    alert(`Нажмите «Поделится» а потом «На экран "Домой"»`);
  };

  render() {
    const { telegramFolded, telegramHidden } = this.state;
    return (
      <div
        className="App"
        style={{
          margin: 0,
          padding: 0,
          height: "100%",
          border: "none",
          position: "relative",
        }}
      >
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
          src={process.env.REACT_APP_ARC_GIS_URL}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          scrolling="auto"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title={"GeoBel"}
        />
        {!telegramHidden ? (
          <div
            onClick={(e) => this.tapOnTelegramButton(e)}
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              right: 20,
              cursor: 'default'
            }}
            className="button support-button"
            target="_blank"
          >
            <img src={TELEGRAM_ICON} height={30} width={30} />
            {!telegramFolded ? (
              <>
                <div style={{ marginRight: 20 }}>&nbsp;&nbsp;Техподдержка</div>
                <div
                  onClick={(e) => this.hideTelegramBubble(e)}
                  style={{ position: "absolute", right: 10, top: 10, cursor: 'default' }}
                >
                  X
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        <AddToHomescreen
          onAddToHomescreenClick={this.handleAddToHomescreenClick}
          title={'Добавить «ГеоБел» на главный экран'}
        />
      </div>
    );
  }
}
