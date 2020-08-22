// Copyright 2017 Esri.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import UIKit
import ArcGIS


class ViewController: UIViewController {

    @IBOutlet weak var mapView: AGSMapView!
    
    private func setupMap() {
        
        let portal = AGSPortal (url: URL(string: "https://geobel.maps.arcgis.com")!, loginRequired: false)
         // create a PortalItem based on a pre-defined portal id
        let portalItem = AGSPortalItem(portal: portal, itemID: "72a0768dfb46419fbcb85608ed3db671")
         // create a map from a PortalItem
        let map = AGSMap(item: portalItem)
         // set the map to be displayed in an AGSMapView
        mapView.map = map
        
        
//        // Build Trailheads Item.
//        let trailheadsItem: AGSPortalItem = {
//            let portal = AGSPortal.arcGISOnline(withLoginRequired: false)
//            return AGSPortalItem(portal: portal, itemID: "41281c51f9de45edaf1c8ed44bb10e30")
//        }()
//        // Set the trailheads web map.
//        mapView.map = AGSMap(item: trailheadsItem)
//        mapView.map?.load { (error) in
//            if let error = error {
//                print(error.localizedDescription)
//            }
//        }
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMap()
    }
}
