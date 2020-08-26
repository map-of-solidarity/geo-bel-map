/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Linking, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
// import ArcGISMapView from 'react-native-arcgis-mapview';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://dca7f48213f54bad920551dad66fdad7@o382492.ingest.sentry.io/5404561",
});


// const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=1a81ea9392954fbfa3eb6cec81f4da55'; // dev
const domain = 'https://geobel.online'; // prod
type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    this.requestUserPermission().catch(e => console.warn('err requesting notification permission', e));
    this.getInitialNotification().catch(e => console.warn('getInitialNotification', e));
    // throw new Error("My first Sentry error!");
  }

  async getInitialNotification() {
    const msg = await messaging().getInitialNotification();

      // when tapped on notification from a terminated\quit state
    if (msg) {
      Alert.alert(_.get(msg, 'notification.title'), _.get(msg, 'notification.body'));
    }

  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken()
      if (token) {
        console.log('push token ', token);
        messaging().onMessage((msg) => {
          // when the app is open
          Alert.alert(_.get(msg, 'notification.title'), _.get(msg, 'notification.body'));
        })
        messaging().onNotificationOpenedApp((msg) => {
          // when tapping on notification and it's in the background
          Alert.alert(_.get(msg, 'notification.title'), _.get(msg, 'notification.body'));
        })
      }
      console.log('Authorization status:', authStatus);
    }
  }

  openURL(url) {
    try {
      Linking.openURL(url).catch(e => console.warn(e));
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
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
          source={{uri: domain}}
          allowUniversalAccessFromFileURLs
          mixedContentMode={'compatibility'}
          useWebKit
          originWhitelist={['https://']}
          onNavigationStateChange={(event) => {
            if (event.url !== domain && event.navigationType === 'click') {
              this.webViewRef.stopLoading();
              this.openURL(event.url);
            }
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // backgroundColor: '',
    // paddingVertical: 30
  }
});


