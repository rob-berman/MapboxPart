(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

      	showMap: function () {
            if (!this.checkSimulator()) {
              	Mapbox.show(
                  {
                    style: 'emerald', // light|dark|emerald|satellite|hybrid|streets , default 'streets'
                    margins: {
                      left: 0, // default 0
                      right: 0, // default 0
                      // our demo apps have a different layout for Android (tabs at the top)
                      top: navigator.userAgent.indexOf("Android") == -1 ? 316 : 340, // default 0
                      bottom: navigator.userAgent.indexOf("Android") == -1 ? 50 : 0 // default 0
                    },
                    center: { // optional, without a default
                      lat: 42.730857,
                      lng: -73.682494
                    },
                    zoomLevel: 12, // 0 (the entire world) to 20, default 10
                    showUserLocation: true, // default false
                    hideAttribution: true, // default false, which is required by Mapbox if you're on a free plan
                    hideLogo: true, // default false, which is required by Mapbox if you're on a free plan
                    hideCompass: false, // default false
                    disableRotation: false, // default false
                    disableScroll: false, // default false
                    disableZoom: false, // default false
                    disablePitch: false, // default false
                    markers: [
                      {
                        lat: 42.730857,
                        lng: -73.682494,
                        title: 'Nice location',
                        subtitle: 'Hello World!'
                      }
                    ]
                  },
                  function() {
                    // let's add an click handler to the marker callouts
                    Mapbox.addMarkerCallback(function (selectedMarker) {
                      //alert("Marker selected: " + JSON.stringify(selectedMarker));
                      alert("Hello World!");
                    });
                  },
                  this.onError
            )}
        },

        hideMap: function () {
            if (!this.checkSimulator()) {
              	Mapbox.hide(
                  {},
                  this.onSuccess,
                  this.onError
                );
            }
        },

        addMarkers: function () {
            if (!this.checkSimulator()) {
              	Mapbox.addMarkers(
	                [
                    {
                      'lat': 42.730857,
                      'lng': -73.682494,
                      'title': 'One-line title here', // no popup unless set
                      'subtitle': 'This text can span multiple lines on Android only.'
                    },
                    {
                      'lat': 42.730857,
                      'lng': -73.682494,
                      'title': 'Nu subtitle for this one' // iOS: no popup unless set, Android: an empty popup -- so please add something
                    }
                  ],
                  this.onSuccess,
                  this.onError
                );
            }
        },
      
      
        setCenter: function () {
            if (!this.checkSimulator()) {
              	Mapbox.setCenter(
                  {
                    lat: 42.730857,
                    lng: -73.682494,
                    animated: true
                  },
                  this.onSuccess,
                  this.onError
                );
            }
        },

        getCenter: function () {
            if (!this.checkSimulator()) {
              	Mapbox.getCenter(
                  this.onSuccessWithAlert
                );
            }
        },

        zoomOut: function () {
            if (!this.checkSimulator()) {
              	Mapbox.setZoomLevel(
                  {
                    level: 10,
					animated: true
                  },
                  this.onSuccess,
                  this.onError
                );
            }
        },

        zoomIn: function () {
            if (!this.checkSimulator()) {
              	Mapbox.setZoomLevel(
                {
                  level: 12,
                  animated: true
                }
            );
                this.onSuccess,
                this.onError
            }
        },

	      checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.Mapbox === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            console.log('Mapbox success: ' + msg);
        },

        onSuccessWithAlert: function(msg) {
            alert(JSON.stringify(msg));
        },

        onError: function(msg) {
            alert('Mapbox error: ' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);