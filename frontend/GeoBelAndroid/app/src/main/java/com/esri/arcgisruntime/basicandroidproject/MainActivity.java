package com.esri.arcgisruntime.basicandroidproject;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

import com.esri.arcgisruntime.ArcGISRuntimeEnvironment;
import com.esri.arcgisruntime.mapping.ArcGISMap;
import com.esri.arcgisruntime.mapping.Basemap;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.esri.arcgisruntime.portal.Portal;
import com.esri.arcgisruntime.portal.PortalItem;

public class MainActivity extends AppCompatActivity {

    private MapView mMapView;

//    private void setupMap() {
//        if (mMapView != null) {
//            ArcGISRuntimeEnvironment.setLicense(getResources().getString(R.string.arcgis_license_key));
//            Basemap.Type basemapType = Basemap.Type.STREETS_VECTOR;
//            double latitude = 34.0270;
//            double longitude = -118.8050;
//            int levelOfDetail = 13;
//            ArcGISMap map = new ArcGISMap(basemapType, latitude, longitude, levelOfDetail);
//            mMapView.setMap(map);
//        }
//    }

    private void setupMap() {
        if (mMapView != null) {
//            String itemId = "41281c51f9de45edaf1c8ed44bb10e30"; // default
//            Portal portal = new Portal("https://www.arcgis.com", false); // default
            String itemId = "72a0768dfb46419fbcb85608ed3db671";
            Portal portal = new Portal("https://geobel.maps.arcgis.com", false);
            PortalItem portalItem = new PortalItem(portal, itemId);
            ArcGISMap map = new ArcGISMap(portalItem);
            mMapView.setMap(map);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mMapView = findViewById(R.id.mapView);
        setupMap();
    }

    @Override
    protected void onPause() {
        if (mMapView != null) {
            mMapView.pause();
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mMapView != null) {
            mMapView.resume();
        }
    }

    @Override
    protected void onDestroy() {
        if (mMapView != null) {
            mMapView.dispose();
        }
        super.onDestroy();
    }
}
