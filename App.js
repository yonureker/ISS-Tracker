import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

import issStationIcon from "./assets/space_station.png";

export default function App() {
  const [issPosition, setIssPosition] = useState({
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(responseJson =>
          setIssPosition({
            latitude: parseFloat(responseJson.iss_position.latitude),
            longitude: parseFloat(responseJson.iss_position.longitude)
          })
        )
    }, 1000);

    return () => clearInterval(intervalId);
  });

    if (issPosition.latitude === null) {
      return(
        <View style={styles.container}>
          <Text>Receiving Data...</Text>
          <ActivityIndicator size='large'/></View>
      )
    } else {
      return(
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={"google"}
        mapType={"standard"}
        initialRegion={{
          latitude: issPosition.latitude,
          longitude: issPosition.longitude,
          latitudeDelta: 70,
          longitudeDelta: 70
        }}
      >
        <Marker coordinate={issPosition} icon={issStationIcon} />
      </MapView>
    </View>
      )}
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 2
  },
  infoContainer: {
    flex: 1
  }
});