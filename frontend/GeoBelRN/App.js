/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
// import ArcGISMapView from 'react-native-arcgis-mapview';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://381b55a8bc4d4c499edb140a16a8ab0b@o382492.ingest.sentry.io/5403567',
});


// const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=1a81ea9392954fbfa3eb6cec81f4da55'; // dev
const domain = 'https://geobel.online'; // prod
type Props = {};
export default class App extends Component<Props> {
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


