/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {WebView, Linking} from 'react-native-webview';
// import ArcGISMapView from 'react-native-arcgis-mapview';

// const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=1a81ea9392954fbfa3eb6cec81f4da55'; // dev
const arcgisURL = 'https://geobel.maps.arcgis.com/apps/webappviewer/index.html?id=d20dff912ddd4af6a265dad0d0d782fb'; // prod
type Props = {};
export default class App extends Component<Props> {
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
          style={{flex: 1, alignSelf: 'stretch'}}
          source={{uri: arcgisURL}}
          allowUniversalAccessFromFileURLs
          mixedContentMode={'compatibility'}
          useWebKit
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

// onNavigationStateChange={(event) => {
//   if (event.url !== arcgisURL && event.navigationType === 'click') {
//     this.webview.stopLoading();
//     Linking.openURL(event.url);
//   }
// }}
