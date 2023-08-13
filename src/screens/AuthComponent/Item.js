import {Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors, responsiveWidth} from '../../themes'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Item = ({item, setName, setUuId}) => {
  console.log('item rendered', item)
  const {name, email, picture, id} = item
  return (
    <Pressable style={styles.container} onPress={() => setUuId(id?.value ?? '')}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          style={styles.image}
          source={{
            uri: picture?.thumbnail ?? '',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.name} onPress={() => setName(name?.first)}>
            {name?.first ?? ''}
          </Text>
          <Text style={styles.name}>{email ?? ''}</Text>
        </View>
      </View>
      <AntDesign name="right" size={20} color={'white'} />
    </Pressable>
  )
}

export default React.memo(Item)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: colors.white,
  },
  image: {
    width: responsiveWidth(50),
    aspectRatio: 1,
    borderRadius: 50 * 2,
  },
})
