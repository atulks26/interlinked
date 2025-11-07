import React, { useEffect, useRef, useState } from "react";

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const initMap = () => {
    if (window.google) {
      const infoWindow = new window.google.maps.InfoWindow();

      const center = { lat: 28.6139, lng: 77.209 };
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 11.5,
        mapId: "DELHI_MAP_ID",
      });
      setMap(newMap);

      // ---------------------
      // ✅ GREEN PROJECTS (Public Works, Health, Water)
      // ---------------------
      const greenPolygons = [
        {
          projectCoordinates: [
            { lat: 28.630989, lng: 77.082103 },
            { lat: 28.635966, lng: 77.096779 },
            { lat: 28.625353, lng: 77.101282 },
            { lat: 28.622628, lng: 77.094719 },
            { lat: 28.622006, lng: 77.087798 },
            { lat: 28.630989, lng: 77.082103 },
          ],
          message: "Water pipeline maintenance in Janakpuri. Dept: Water",
        },
        {
          projectCoordinates: [
            { lat: 28.599519, lng: 77.029954 },
            { lat: 28.595043, lng: 77.036569 },
            { lat: 28.597298, lng: 77.03848 },
            { lat: 28.595556, lng: 77.041078 },
            { lat: 28.597932, lng: 77.043099 },
            { lat: 28.606257, lng: 77.035586 },
            { lat: 28.599519, lng: 77.029954 },
          ],
          message: "Road renovation in Dwarka Sec-13. Dept: Roadways",
        },
        {
          projectCoordinates: [
            { lat: 28.621001, lng: 77.063501 },
            { lat: 28.617719, lng: 77.06055 },
            { lat: 28.614471, lng: 77.067496 },
            { lat: 28.618513, lng: 77.068873 },
            { lat: 28.621001, lng: 77.063501 },
          ],
          message: "Health camp for BPL citizens. Dept: Health",
        },
        {
          projectCoordinates: [
            { lat: 28.7041, lng: 77.1025 },
            { lat: 28.7081, lng: 77.1105 },
            { lat: 28.7031, lng: 77.1185 },
            { lat: 28.6991, lng: 77.1125 },
          ],
          message: "Tree plantation in Rohini Sec-11. Dept: Environment",
        },
        {
          projectCoordinates: [
            { lat: 28.6462, lng: 77.2204 },
            { lat: 28.6492, lng: 77.2264 },
            { lat: 28.6442, lng: 77.2304 },
            { lat: 28.6412, lng: 77.2244 },
          ],
          message: "Footpath improvement near Connaught Place. Dept: PWD",
        },
        {
          projectCoordinates: [
            { lat: 28.6771, lng: 77.2214 },
            { lat: 28.6801, lng: 77.2264 },
            { lat: 28.6751, lng: 77.2304 },
            { lat: 28.6721, lng: 77.2264 },
          ],
          message: "Public park redevelopment in Civil Lines. Dept: NDMC",
        },
      ];

      // ---------------------
      // 🔴 RED PROJECTS (Construction, Power, Drainage)
      // ---------------------
      const redPolygons = [
        {
          projectCoordinates: [
            { lat: 28.62346, lng: 77.061881 },
            { lat: 28.627869, lng: 77.059532 },
            { lat: 28.633486, lng: 77.056595 },
            { lat: 28.624064, lng: 77.046874 },
            { lat: 28.62346, lng: 77.061881 },
          ],
          message: "Building & electrical work in Uttam Nagar. Dept: E&M",
        },
        {
          projectCoordinates: [
            { lat: 28.6531, lng: 77.302 },
            { lat: 28.6571, lng: 77.308 },
            { lat: 28.6521, lng: 77.312 },
            { lat: 28.6481, lng: 77.306 },
          ],
          message: "Drain repair in Laxmi Nagar. Dept: DJB",
        },
        {
          projectCoordinates: [
            { lat: 28.6291, lng: 77.212 },
            { lat: 28.6321, lng: 77.218 },
            { lat: 28.6271, lng: 77.221 },
            { lat: 28.6241, lng: 77.216 },
          ],
          message: "Power line upgrade in Karol Bagh. Dept: Electricity",
        },
        {
          projectCoordinates: [
            { lat: 28.5441, lng: 77.2405 },
            { lat: 28.5481, lng: 77.2465 },
            { lat: 28.5431, lng: 77.2505 },
            { lat: 28.5391, lng: 77.2445 },
          ],
          message: "Metro expansion near Saket. Dept: DMRC",
        },
        {
          projectCoordinates: [
            { lat: 28.6941, lng: 77.1605 },
            { lat: 28.6981, lng: 77.1655 },
            { lat: 28.6921, lng: 77.1705 },
            { lat: 28.6881, lng: 77.1655 },
          ],
          message: "Sewage work in Pitampura. Dept: Water & Sanitation",
        },
      ];

      // ---------------------
      // 🟣 BLUE PROJECTS (Smart City, Digital Infra, Lighting)
      // ---------------------
      const bluePolygons = [
        {
          projectCoordinates: [
            { lat: 28.5601, lng: 77.185 },
            { lat: 28.5641, lng: 77.191 },
            { lat: 28.5581, lng: 77.195 },
            { lat: 28.5541, lng: 77.189 },
          ],
          message: "Smart lighting installation in Vasant Vihar. Dept: NDMC",
        },
        {
          projectCoordinates: [
            { lat: 28.7131, lng: 77.284 },
            { lat: 28.7171, lng: 77.289 },
            { lat: 28.7111, lng: 77.293 },
            { lat: 28.7071, lng: 77.288 },
          ],
          message: "Public WiFi setup in Yamuna Vihar. Dept: Smart City",
        },
        {
          projectCoordinates: [
            { lat: 28.5891, lng: 77.315 },
            { lat: 28.5931, lng: 77.321 },
            { lat: 28.5871, lng: 77.325 },
            { lat: 28.5831, lng: 77.319 },
          ],
          message: "Digital kiosk setup in Mayur Vihar. Dept: IT & Tech",
        },
      ];

      const addPolygons = (polygonList, color) => {
        polygonList.forEach((polygonData) => {
          const polygon = new window.google.maps.Polygon({
            paths: polygonData.projectCoordinates,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: color,
            fillOpacity: 0.35,
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

      addPolygons(greenPolygons, "#3FC047");
      addPolygons(redPolygons, "#FF0000");
      addPolygons(bluePolygons, "#0077FF");
    }
  };

  const findPlaces = (query) => {
    if (!map || !window.google || !window.google.maps.places || !query) {
      console.log("Map error");
      return;
    }

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      query: query,
      fields: ["name", "geometry", "business_status"],
      locationBias: {
        radius: 5000,
        center: { lat: 28.6139, lng: 77.209 },
      },
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const bounds = new window.google.maps.LatLngBounds();

        results.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            new window.google.maps.Marker({
              map: map,
              position: place.geometry.location,
              title: place.name,
            });

            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
      } else {
        console.log("No results found");
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    findPlaces(searchQuery);
  };

  return (
    <div className="relative flex justify-center">
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 88,
            left: 10,
            zIndex: 4,
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for places..."
            className="p-2 border border-gray-300 rounded-l"
          />
          <button
            onClick={handleSearch}
            disabled={!apiLoaded}
            className="bg-[#005da3] p-2 text-white rounded-r hover:bg-[#00447a]"
          >
            Search
          </button>
        </div>

        <div
          ref={mapRef}
          style={{
            height: "100vh",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default GoogleMapComponent;
