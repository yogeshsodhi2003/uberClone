import React, { useRef, useEffect, useState, useContext } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
import { MapPin, Search, CarFront } from "lucide-react";
import polyline from "@mapbox/polyline";
import { UserContext } from "../context/UserContext";

const Ride = () => {
  const user = useContext(UserContext);
  console.log("loged in user", user);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const location = { lng: 75.721123, lat: 29.151861 };
  const zoom = 16;
  maptilersdk.config.apiKey = "rOeb51xP3Jwrlp8bndQd";

  //get the location of the user
  const [userLocation, setUserLocation] = useState(null);

  const [rideBooked, setRideBooked] = useState(true);

  //handle the pickup and drop
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 });
  const Distance = (routeInfo.distance / 1000).toFixed(2); // km
  const Duration = Math.ceil(routeInfo.duration / 60); // minutes
  const [price, setPrice] = useState();
  const calculatePrice = () => {
    if (Distance < 15) {
      const comanPrice = Distance * 8;
      setPrice(comanPrice);
    } else {
      const comanPrice = Disttance * 6;
      setPrice(comanPrice);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pickupPoint = await geocodeAddress(pickup);
    const dropPoint = await geocodeAddress(drop);
    drawRoute(pickupPoint, dropPoint);
  };

  //convert the address into the coordinates
  const geocodeAddress = async (address) => {
    const res = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        address
      )}.json?key=rOeb51xP3Jwrlp8bndQd`
    );
    const data = await res.json();
    return data.features[0]?.geometry?.coordinates; // [lng, lat]
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log({ lat: latitude, lng: longitude });

      console.log("latitude", latitude);
      if (map.current) return;
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [longitude, latitude],
        zoom: zoom,
      });

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      const gc = new GeocodingControl({
        proximity: [{ type: "map-center" }],
      });
      map.current.addControl(gc);
    });
  }, []);

  const drawRoute = async (pickupCoords, dropCoords) => {
    const res = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        method: "POST",
        headers: {
          Authorization:
            "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImVlOGUyMjI2NWJhYTQ0NmNhNmQ0NDFlMjgzYTQ0MmQ1IiwiaCI6Im11cm11cjY0In0=", // not in query string!
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [pickupCoords, dropCoords], // e.g., [[lng1, lat1], [lng2, lat2]]
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    const summary = data.routes[0].summary;
    setRouteInfo({
      distance: summary.distance, // meters
      duration: summary.duration, // seconds
    });
    const encoded = data.routes[0].geometry;

    const decodedCoords = polyline.decode(encoded); // [ [lat, lng], ... ]
    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: decodedCoords.map(([lat, lng]) => [lng, lat]),
      },
    };

    // Add to map
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geojson);
    } else {
      map.current.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      map.current.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#FFD700",
          "line-width": 4,
        },
      });
    }
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="absolute bottom-10 left-10">
        {!rideBooked && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 font-semibold">Pickup Point</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Drop Point</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="pl-10 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
            >
              Confirm Locations
            </button>
          </form>
        )}

        {rideBooked && (
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full border border-gray-100">
            <div className="flex items-center gap-4">
              {/* Car Icon */}
              <div className="bg-yellow-100 p-3 rounded-full">
                <CarFront className="w-6 h-6 text-yellow-500" />
              </div>

              {/* Info */}
              <div>
                <p className="text-gray-800 font-semibold text-lg">Uber Go</p>
                <p className="text-sm text-gray-500">
                  Affordable everyday rides
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 text-center text-sm text-gray-700">
              <div>
                <p className="font-semibold">{Distance} km</p>
                <p>Distance</p>
              </div>
              <div>
                <p className="font-semibold">{Duration} min</p>
                <p>Duration</p>
              </div>
              <div>
                <p className="font-semibold">₹{price}</p>
                <p>Price</p>
              </div>
            </div>

            <button
              // onClick={onBook}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-3 w-full rounded-xl"
            >
              Book Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ride;
