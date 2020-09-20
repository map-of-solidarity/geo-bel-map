/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
// import ArcGISMapView from 'react-native-arcgis-mapview';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import _ from 'lodash';
import * as Sentry from '@sentry/react-native';
import Button from './components/Button';
import TELEGRAM_ICON from './assets/telegram-app-48.png';
import Colors from './constants/colors';
Sentry.init({
  dsn:
    'https://dca7f48213f54bad920551dad66fdad7@o382492.ingest.sentry.io/5404561',
});

const arcgisURL =
  'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=d20dff912ddd4af6a265dad0d0d782fb&locale=ru'; // prod
// const domain = 'https://geobel.online'; // prod
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      telegramFolded: true,
      telegramHidden: false,
    };
  }

  componentDidMount() {
    this.requestUserPermission().catch((e) =>
      console.warn('err requesting notification permission', e),
    );
    this.getInitialNotification().catch((e) =>
      console.warn('getInitialNotification', e),
    );
    // throw new Error("My first Sentry error!");
  }

  tapOnTelegramButton() {
    analytics().logEvent('tap_telegram_button');
    if (!this.state.telegramFolded) {
      this.setState({telegramFolded: true});
      // join support chat
      this.openURL('https://t.me/joinchat/CVMoxBKG8TGpZZy74Ren3g');
    } else {
      this.setState({telegramFolded: false});
    }
  }

  hideTelegramBubble(e) {
    e.stopPropagation();
    this.setState({telegramHidden: true});
  }

  async getInitialNotification() {
    const msg = await messaging().getInitialNotification();

    // when tapped on notification from a terminated\quit state
    if (msg) {
      Alert.alert(
        _.get(msg, 'notification.title'),
        _.get(msg, 'notification.body'),
      );
    }
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      if (token) {
        console.log('push token ', token);
        messaging().onMessage((msg) => {
          // when the app is open
          Alert.alert(
            _.get(msg, 'notification.title'),
            _.get(msg, 'notification.body'),
          );
        });
        messaging().onNotificationOpenedApp((msg) => {
          // when tapping on notification and it's in the background
          Alert.alert(
            _.get(msg, 'notification.title'),
            _.get(msg, 'notification.body'),
          );
        });
      }
      console.log('Authorization status:', authStatus);
    }
  }

  openURL(url) {
    try {
      Linking.openURL(url).catch((e) => console.warn(e));
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const {telegramFolded, telegramHidden} = this.state;
    // return (
    //   <ArcGISMapView
    //     ref={mapView => this.mapView = mapView}
    //     initialMapCenter={[{latitude: 53.900566, longitude: 27.558931}]}
    //     basemapUrl={arcgisURL}
    //     // your props here
    //   />
    // );
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          ref={(ref) => (this.webViewRef = ref)}
          style={{flex: 1, alignSelf: 'stretch'}}
          source={{uri: arcgisURL}}
          allowUniversalAccessFromFileURLs
          mixedContentMode={'compatibility'}
          useWebKit
          originWhitelist={['https://', 'tg://']}
          onNavigationStateChange={(event) => {
            if (!event.url.includes(arcgisURL)) {
              this.webViewRef.stopLoading();
              this.openURL(event.url);
            }
          }}
        />
        {!telegramHidden ? (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}>
            <Button
              onPress={() => this.tapOnTelegramButton()}
              containerStyle={{opacity: 0.7, paddingHorizontal: 5}}
              label={!telegramFolded ? 'Техподдержка' : null}
              IconComponent={
                <Image resizeMode={'cover'} source={TELEGRAM_ICON} />
              }>
              {!telegramFolded ? (
                <View style={{alignSelf: 'flex-start'}}>
                  <TouchableOpacity
                    onPress={(e) => this.hideTelegramBubble(e)}
                    style={{padding: 6}}>
                    <Text style={{ color: Colors.darkBlue }}>{'X'}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </Button>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '',
    // paddingVertical: 30
  },
});
