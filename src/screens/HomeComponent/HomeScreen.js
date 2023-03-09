import React, {useCallback, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import SearchBar from '../../components/SearchBar'
import {StyleSheet, View, TouchableOpacity, Button} from 'react-native'
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import {responsiveHeight} from '../../themes'
import {FlatList} from 'react-native-gesture-handler'
import InvoiceItem from '../../components/InvoiceItem'
import {navigate} from '../../navigation/NavigationService'
import RouteKey from '../../navigation/RouteKey'

const data = [
  {id: 1, name: '123123'},
  {id: 2, name: '123123'},
  {id: 3, name: '123123'},
]

const HomeScreen = () => {
  const [textSearch, setSearchText] = useState('')
  const onCreateInvoice = useCallback(() => {
    navigate(RouteKey.CreateInvoiceScreen)
  }, [])

  const renderItem = ({item}) => {
    const {} = item
    return <InvoiceItem />
  }

  const onChangeText = useCallback(text => {
    setSearchText(text)
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.searchSection}>
        <SearchBar value={textSearch} onChangeText={onChangeText} style={styles.searchBar} />
        <TouchableOpacity onPress={onCreateInvoice} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <OcticonsIcon name="diff-added" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.sortSection}>
        <Button title="Sort by latest" />
        <Button title="Sort by amount" />
      </View>
      <View>
        <FlatList
          contentInset={{bottom: 20}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item?.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
    justifyContent: 'space-around',
  },
  searchBar: {
    width: '90%',
  },
})

export default HomeScreen
