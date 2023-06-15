import React, {useCallback, useRef, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import BottomSheetComponent from './components/BottomSheet'
import BottomSheetModalComponent from './components/BottomSheetModal'
import MapViewDirections from 'react-native-maps-directions'
import RNConfig from 'react-native-config'

const DetailScreen = () => {
  const mapRef = useRef(null)
  const [coordinates] = useState([
    {
      latitude: 1.378629,
      longitude: 103.839391,
    },
    {
      latitude: 1.375121,
      longitude: 103.838543,
    },
  ])

  const [loading, setLoading] = useState(false)
  const modalRef = useRef(null)
  const onHandleModal = useCallback(() => {
    modalRef.current?.openModal()
  }, [])

  const handleLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const onPressLocation = useCallback(() => {
    const initialRegion = {
      latitude: coordinates[0].latitude,
      longitude: coordinates[0].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    mapRef.current.animateToRegion(initialRegion, 1000)
  }, [coordinates])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={[{...StyleSheet.absoluteFill}]}
        showsTraffic={false}
        showsUserLocation={true}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={RNConfig.GOOGLE_API_KEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        {/* <Polyline
          coordinates={[
            {
              latitude: 1.378629,
              longitude: 103.839391,
            },
            {
              latitude: 1.375121,
              longitude: 103.838543,
            },
            // { latitude: 37.8025259, longitude: -122.4351431 }
          ]}
          lineDashPattern={[5, 5, 5, 5, 5]}
          strokeColor="yellow" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            // '#7F0000'
          ]}
          strokeWidth={5}
        /> */}
      </MapView>
      <BottomSheetComponent
        onPressLocation={onPressLocation}
        loading={loading}
        onSwipe={onHandleModal}
        handleLoading={handleLoading}
      />
      <BottomSheetModalComponent ref={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: 'red',
  },
})

export default DetailScreen
