import React, { useEffect, useRef, useState } from "react";

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setApiLoaded(true);
        initMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`;
        script.async = true;
        script.onload = () => {
          setApiLoaded(true);
          initMap();
        };
        document.body.appendChild(script);
      }
    };

    loadGoogleMaps();
  }, []);

  // Expand coordinates slightly to prevent exact overlap
  const expandCoords = (coords, expandFactor = 0.0015) => {
    return coords.map((c) => ({
      lat: c.lat + (Math.random() - 0.5) * expandFactor,
      lng: c.lng + (Math.random() - 0.5) * expandFactor,
    }));
  };

  // Initialize map and polygons
  const initMap = () => {
    if (!window.google) return;

    const center = { lat: 28.6139, lng: 77.209 };
    const newMap = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 11,
    });
    setMap(newMap);

    const infoWindow = new window.google.maps.InfoWindow();

    const addPolygons = (polygonList, color) => {
      polygonList.forEach((polygonData) => {
        const polygon = new window.google.maps.Polygon({
          paths: expandCoords(polygonData.projectCoordinates),
          strokeColor: color,
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: color,
          fillOpacity: 0.4,
        });

        polygon.setMap(newMap);

        polygon.addListener("mouseover", (event) => {
          infoWindow.setContent(polygonData.message);
          infoWindow.setPosition(event.latLng);
          infoWindow.open(newMap);
        });
        polygon.addListener("mouseout", () => infoWindow.close());
      });
    };

    // Polygons: Green
    const greenPolygons = [
      {
        projectCoordinates: [
          { lat: 28.630989, lng: 77.082103 },
          { lat: 28.635966, lng: 77.096779 },
          { lat: 28.625353, lng: 77.101282 },
          { lat: 28.622628, lng: 77.094719 },
        ],
        message: "Water pipeline maintenance in Janakpuri. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.595043, lng: 77.036569 },
          { lat: 28.607298, lng: 77.04348 },
          { lat: 28.599932, lng: 77.053099 },
          { lat: 28.590257, lng: 77.045586 },
        ],
        message: "Road renovation in Dwarka Sec-13. Dept: Roadways",
      },
      {
        projectCoordinates: [
          { lat: 28.648, lng: 77.220 },
          { lat: 28.655, lng: 77.230 },
          { lat: 28.645, lng: 77.240 },
          { lat: 28.638, lng: 77.228 },
        ],
        message: "Sewer line overhaul near Civil Lines. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.590, lng: 77.170 },
          { lat: 28.598, lng: 77.182 },
          { lat: 28.584, lng: 77.192 },
          { lat: 28.576, lng: 77.180 },
        ],
        message: "Water main upgrade near R.K. Puram. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.690, lng: 77.030 },
          { lat: 28.700, lng: 77.045 },
          { lat: 28.685, lng: 77.055 },
          { lat: 28.675, lng: 77.040 },
        ],
        message: "Canal cleaning near Najafgarh. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.550, lng: 77.290 },
          { lat: 28.560, lng: 77.300 },
          { lat: 28.545, lng: 77.312 },
          { lat: 28.535, lng: 77.298 },
        ],
        message: "Drainage improvement in Okhla Phase-II. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.710, lng: 77.180 },
          { lat: 28.720, lng: 77.195 },
          { lat: 28.708, lng: 77.205 },
          { lat: 28.698, lng: 77.190 },
        ],
        message: "Water storage upgrade in Bawana. Dept: Water",
      },
      {
        projectCoordinates: [
          { lat: 28.580, lng: 77.090 },
          { lat: 28.585, lng: 77.100 },
          { lat: 28.572, lng: 77.105 },
          { lat: 28.568, lng: 77.092 },
        ],
        message: "Pipeline junction reinforcement in Mahipalpur. Dept: Water",
      },
    ];

    // Polygons: Red
    const redPolygons = [
      {
        projectCoordinates: [
          { lat: 28.62346, lng: 77.061881 },
          { lat: 28.633869, lng: 77.059532 },
          { lat: 28.636486, lng: 77.066595 },
          { lat: 28.624064, lng: 77.076874 },
        ],
        message: "Building & electrical work in Uttam Nagar. Dept: E&M",
      },
      {
        projectCoordinates: [
          { lat: 28.672, lng: 77.120 },
          { lat: 28.675, lng: 77.130 },
          { lat: 28.668, lng: 77.140 },
          { lat: 28.662, lng: 77.128 },
        ],
        message: "Substation upgrade in Rohini. Dept: Power",
      },
      {
        projectCoordinates: [
          { lat: 28.540, lng: 77.240 },
          { lat: 28.550, lng: 77.255 },
          { lat: 28.538, lng: 77.260 },
          { lat: 28.532, lng: 77.245 },
        ],
        message: "Underground wiring project in Saket. Dept: E&M",
      },
      {
        projectCoordinates: [
          { lat: 28.635, lng: 77.260 },
          { lat: 28.640, lng: 77.272 },
          { lat: 28.630, lng: 77.280 },
          { lat: 28.625, lng: 77.268 },
        ],
        message: "Transformer relocation in Patparganj. Dept: Power",
      },
      {
        projectCoordinates: [
          { lat: 28.580, lng: 77.210 },
          { lat: 28.588, lng: 77.222 },
          { lat: 28.575, lng: 77.228 },
          { lat: 28.565, lng: 77.215 },
        ],
        message: "Streetlight expansion in Green Park. Dept: E&M",
      },
      {
        projectCoordinates: [
          { lat: 28.700, lng: 77.160 },
          { lat: 28.705, lng: 77.172 },
          { lat: 28.692, lng: 77.180 },
          { lat: 28.686, lng: 77.165 },
        ],
        message: "Electrical cabling in Shalimar Bagh. Dept: Power",
      },
      {
        projectCoordinates: [
          { lat: 28.612, lng: 77.050 },
          { lat: 28.618, lng: 77.060 },
          { lat: 28.605, lng: 77.065 },
          { lat: 28.598, lng: 77.054 },
        ],
        message: "Solar panel maintenance near Palam. Dept: Renewable Energy",
      },
      {
        projectCoordinates: [
          { lat: 28.670, lng: 77.280 },
          { lat: 28.675, lng: 77.290 },
          { lat: 28.662, lng: 77.295 },
          { lat: 28.655, lng: 77.285 },
        ],
        message: "LED replacement project in Preet Vihar. Dept: E&M",
      },
    ];

    // Polygons: Blue
    const bluePolygons = [
      {
        projectCoordinates: [
          { lat: 28.5601, lng: 77.185 },
          { lat: 28.5651, lng: 77.195 },
          { lat: 28.5571, lng: 77.205 },
          { lat: 28.5501, lng: 77.193 },
        ],
        message: "Smart lighting installation in Vasant Vihar. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.630, lng: 77.270 },
          { lat: 28.640, lng: 77.280 },
          { lat: 28.625, lng: 77.290 },
          { lat: 28.620, lng: 77.275 },
        ],
        message: "Rainwater harvesting expansion in Laxmi Nagar. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.670, lng: 77.210 },
          { lat: 28.680, lng: 77.222 },
          { lat: 28.665, lng: 77.230 },
          { lat: 28.655, lng: 77.218 },
        ],
        message:
          "Metro feeder line road enhancement near Mukherjee Nagar. Dept: PWD",
      },
      {
        projectCoordinates: [
          { lat: 28.590, lng: 77.250 },
          { lat: 28.598, lng: 77.265 },
          { lat: 28.585, lng: 77.272 },
          { lat: 28.575, lng: 77.260 },
        ],
        message: "Public park beautification in Nehru Place. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.705, lng: 77.100 },
          { lat: 28.712, lng: 77.112 },
          { lat: 28.698, lng: 77.120 },
          { lat: 28.690, lng: 77.108 },
        ],
        message: "Smart pole installation in Pitampura. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.650, lng: 77.160 },
          { lat: 28.657, lng: 77.172 },
          { lat: 28.642, lng: 77.178 },
          { lat: 28.635, lng: 77.166 },
        ],
        message: "CCTV network expansion in Karol Bagh. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.600, lng: 77.130 },
          { lat: 28.610, lng: 77.140 },
          { lat: 28.598, lng: 77.152 },
          { lat: 28.588, lng: 77.138 },
        ],
        message: "Park solar light setup in AIIMS Area. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.720, lng: 77.220 },
          { lat: 28.730, lng: 77.235 },
          { lat: 28.715, lng: 77.242 },
          { lat: 28.705, lng: 77.225 },
        ],
        message: "Digital signage setup in Narela Zone. Dept: NDMC",
      },
      {
        projectCoordinates: [
          { lat: 28.520, lng: 77.280 },
          { lat: 28.530, lng: 77.295 },
          { lat: 28.518, lng: 77.305 },
          { lat: 28.508, lng: 77.290 },
        ],
        message: "Roadside green cover initiative near Badarpur. Dept: NDMC",
      },
    ];

    // Add polygons to map
    addPolygons(greenPolygons, "#3FC047");
    addPolygons(redPolygons, "#FF0000");
    addPolygons(bluePolygons, "#0077FF");
  };

  // Place search function
  const findPlaces = (query) => {
    if (!map || !window.google || !window.google.maps.places || !query) return;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      query,
      fields: ["name", "geometry"],
      locationBias: map.getCenter(),
    };

    service.textSearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        const bounds = new window.google.maps.LatLngBounds();
        results.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            new window.google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name,
            });
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      } else {
        alert("No results found");
      }
    });
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Box */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col sm:flex-row items-center bg-white p-2 rounded-lg shadow-md w-11/12 max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for places..."
          className="p-2 border border-gray-300 rounded-md w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0"
        />
        <button
          onClick={() => findPlaces(searchQuery)}
          disabled={!apiLoaded}
          className="bg-[#005da3] text-white px-4 py-2 rounded-md sm:ml-2 w-full sm:w-auto hover:bg-[#00447a]"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-full rounded-md"
        style={{ minHeight: "100vh" }}
      />
    </div>
  );
};

export default GoogleMapComponent;
