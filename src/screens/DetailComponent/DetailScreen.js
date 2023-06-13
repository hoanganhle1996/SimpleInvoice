import React from 'react'
import {View, StyleSheet} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import BottomSheetComponent from './components/BottomSheet'

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={[{...StyleSheet.absoluteFill}]}
        showsTraffic={false}
        showsUserLocation={true}
        loadingEnabled={true}>
        <Marker coordinate={{latitude: 21.0278, longitude: 105.8342}} />
      </MapView>
      <BottomSheetComponent />
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
