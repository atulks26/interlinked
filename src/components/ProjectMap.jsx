import React, { useEffect, useRef, useState } from "react";

const GoogleMapComponent = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (
                window.google &&
                window.google.maps &&
                window.google.maps.places
            ) {
                setApiLoaded(true);
                initMap();
            } else {
                const script = document.createElement("script");
                script.src =
                    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`;
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

            const center = { lat: 28.5991277, lng: 77.120252 };
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: 13,
                mapId: "DEMO_MAP_ID",
            });
            setMap(newMap);

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
                    message:
                        "Water pipeline maintainance in Janakpuri. Department: Water",
                },
                {
                    projectCoordinates: [
                        { lat: 28.599519, lng: 77.029954 },
                        { lat: 28.595043, lng: 77.036569 },
                        { lat: 28.597298, lng: 77.03848 },
                        { lat: 28.595556, lng: 77.041078 },
                        { lat: 28.597932, lng: 77.043099 },
                        { lat: 28.597995, lng: 77.045156 },
                        { lat: 28.599136, lng: 77.046167 },
                        { lat: 28.606257, lng: 77.035586 },
                        { lat: 28.599519, lng: 77.029954 },
                    ],
                    message:
                        "Road renovation in Dwarka Sector-13. Department: Roadways",
                },
                {
                    projectCoordinates: [
                        { lat: 28.621001, lng: 77.063501 },
                        { lat: 28.617719, lng: 77.06055 },
                        { lat: 28.617373, lng: 77.059251 },
                        { lat: 28.614575, lng: 77.059133 },
                        { lat: 28.614471, lng: 77.067496 },
                        { lat: 28.615162, lng: 77.068755 },
                        { lat: 28.618513, lng: 77.068873 },
                        { lat: 28.621001, lng: 77.063501 },
                    ],
                    message:
                        "Health camps for BPL citizens. Department: Public Health",
                },
            ];

            const redPolygons = [
                {
                    projectCoordinates: [
                        { lat: 28.62346, lng: 77.061881 },
                        { lat: 28.627869, lng: 77.059532 },
                        { lat: 28.632011, lng: 77.058519 },
                        { lat: 28.633397, lng: 77.057324 },
                        { lat: 28.633486, lng: 77.056595 },
                        { lat: 28.624064, lng: 77.046874 },
                        { lat: 28.622073, lng: 77.041243 },
                        { lat: 28.620224, lng: 77.041162 },
                        { lat: 28.620423, lng: 77.046966 },
                        { lat: 28.62154, lng: 77.055137 },
                        { lat: 28.62346, lng: 77.061881 },
                    ],
                    message:
                        "Government construction and electical work in Uttam Nagar West. Department: Building, Electrical and Mechanical",
                },
            ];

            greenPolygons.forEach((polygonData) => {
                const polygon = new window.google.maps.Polygon({
                    paths: polygonData.projectCoordinates,
                    strokeColor: "#3FC047",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    fillColor: "#3FC047",
                    fillOpacity: 0.35,
                });

                polygon.setMap(newMap);

                polygon.addListener("mouseover", (event) => {
                    infoWindow.setContent(polygonData.message);
                    infoWindow.setPosition(event.latLng);
                    infoWindow.open(newMap);
                });

                polygon.addListener("mouseout", () => {
                    infoWindow.close();
                });
            });

            redPolygons.forEach((polygonData) => {
                const polygon = new window.google.maps.Polygon({
                    paths: polygonData.projectCoordinates,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                });

                polygon.setMap(newMap);

                polygon.addListener("mouseover", (event) => {
                    infoWindow.setContent(polygonData.message);
                    infoWindow.setPosition(event.latLng);
                    infoWindow.open(newMap);
                });

                polygon.addListener("mouseout", () => {
                    infoWindow.close();
                });
            });
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
                center: { lat: 28.5991277, lng: 77.120252 },
            },
        };

        service.textSearch(request, (results, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
            ) {
                const bounds = new window.google.maps.LatLngBounds();

                results.forEach((place) => {
                    if (place.geometry && place.geometry.location) {
                        const marker = new window.google.maps.Marker({
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
        <div className="relative flex justify-center ">
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
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for places..."
                        className="p-2 border-black-200"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!apiLoaded}
                        className="bg-[#005da3] p-2 border-black-200 text-white"
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
