import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {Text, StyleSheet, FlatList, View, Alert} from 'react-native'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import Item from './Item'
import {FlashList, useBenchmark} from '@shopify/flash-list'

const ITEM_HEIGHT = 75

export const LoginScreen = () => {
  const [isGreen, setIsGreen] = useState(false)
  const [data, setData] = useState([])
  const [uuid, setUuId] = useState('')
  const [title, setTitle] = useState('Demo Flatlist')
  // const flashListRef = useRef(null)
  // const [onBlankArea] = useBenchmark(flashListRef, results => {
  //   Alert.alert('Benchmark result', results.formattedString)
  // })

  // const setName = name => {
  //   for (let i = 0; i <= 1000000; i++) {

  //   }
  //   setTitle(name)
  // }

  const setName = useCallback(name => {
    for (let i = 0; i <= 1000000; i++) {}
    setTitle(name)
  }, [])

  // const id = () => {
  //   console.log('function was called ')
  //   for (let i = 0; i <= 1000000; i++) {}
  //   return uuid
  // }

  const memoriseId = useMemo(() => {
    console.log('function was called ')
    for (let i = 0; i <= 1000000; i++) {}
    return uuid
  }, [uuid])

  useEffect(() => {
    makeRemoteRequest()
  }, [])

  const makeRemoteRequest = useCallback(() => {
    const url = `https://randomuser.me/api/?seed=${1}&page=${1}&results=50`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res?.results ?? [])
      })
      .catch(error => {
        // TODO
      })
  }, [])

  const renderItem = ({item, index}) => <Item item={item} setName={setName} setUuId={setUuId} />

  return (
    <ScreenContainer style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={[styles.titleText, {color: isGreen ? '#16c784' : 'white'}]}
          onPress={() => {
            setIsGreen(!isGreen)
          }}>
          {title}
        </Text>
        <Text style={styles.titleText}>{memoriseId}</Text>
      </View>
      <FlatList
        // onBlankArea={onBlankArea}
        // ref={flashListRef}
        style={styles.contentSection}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.email}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        windowSize={15}
        initialNumToRender={12}
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(10),
    backgroundColor: colors.black,
  },
  contentSection: {
    width: '100%',
  },
  titleText: {
    fontSize: responsiveHeight(25),
    fontWeight: '600',
    marginVertical: responsiveHeight(20),
    color: colors.white,
    marginTop: responsiveHeight(30),
  },
  passwordSection: {
    marginTop: responsiveHeight(10),
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: responsiveHeight(40),
    marginTop: responsiveHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})
