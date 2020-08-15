import React, { useEffect } from "react";
import { loadCss } from "esri-loader";
import { WebMap } from "@esri/react-arcgis";
import { webMapId } from "../../config";
import "./WebMapView.scss";

const WebMapView = () => {
  useEffect(() => {
    loadCss();
  }, []);

  return <WebMap className="webmap" id={webMapId} />;
};

export default WebMapView;
