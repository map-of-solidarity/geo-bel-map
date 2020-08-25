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
  dsn: 'https://381b55a8bc4d4c499edb140a16a8ab0b@o382492.ingest.sentry.io/5403567',
});


// const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=1a81ea9392954fbfa3eb6cec81f4da55'; // dev
const domain = 'https://geobel.online'; // prod
type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    this.requestUserPermission().catch(e => console.warn('err requesting notification permission', e))
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
          // { messageId: '1598359895614975',
          //   data: {},
          //   sentTime: '1598359895',
          //     mutableContent: true,
          //   notification: { ios: {}, title: 'dsf', sound: 'default', body: 'dfds' } }
          //
          console.log('push msg', msg);

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


