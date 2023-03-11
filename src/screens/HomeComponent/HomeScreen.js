import React, {useCallback, useEffect, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import SearchBar from '../../components/SearchBar'
import {StyleSheet, View, TouchableOpacity, Button} from 'react-native'
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import {responsiveHeight} from '../../themes'
import {FlatList} from 'react-native-gesture-handler'
import InvoiceItem from '../../components/InvoiceItem'
import {navigate} from '../../navigation/NavigationService'
import RouteKey from '../../navigation/RouteKey'
import {useDispatch, useSelector} from 'react-redux'
import {userActions, appActions} from '../../store/reducers'
import {getInvoiceList, getIsCreateScreen} from '../../store/selectors'
import RadioGroup from 'react-native-radio-buttons-group'
import {useIsFocused} from '@react-navigation/native'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [textSearch, setSearchText] = useState('')
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Paid',
      value: 'Paid',
    },
    {
      id: '2', // acts as primary key, should be unique and non-empty string
      label: 'Due',
      value: 'Due',
    },
    {
      id: '3',
      label: 'Overdue',
      value: 'Overdue',
    },
  ])

  const invoiceData = useSelector(getInvoiceList) || []
  const isFromCreate = useSelector(getIsCreateScreen) || false

  const data = invoiceData?.data ?? []

  useEffect(() => {
    dispatch(
      userActions.updateUserInfo({
        onSuccess: () => {
          // only call when have token from user profile
          onFetchListInvoice({})
        },
      }),
    )
  }, [dispatch, onFetchListInvoice])

  useEffect(() => {
    // Calling api again to refresh new data after created
    // To ensure search, sort, filter work normal with new item
    if (isFromCreate) {
      onFetchListInvoice({})
      dispatch(appActions.setIsFromCreateScreen(false))
    }
  }, [isFocused, isFromCreate])

  // Fetch list invoices
  const onFetchListInvoice = useCallback(
    params => {
      dispatch(appActions.getInvoiceListHandle(params))
    },
    [dispatch],
  )

  // navigate to create invoice screen
  const onCreateInvoice = useCallback(() => {
    navigate(RouteKey.CreateInvoiceScreen)
  }, [])

  const renderItem = ({item}) => {
    const {referenceNo, dueDate, balanceAmount, description} = item
    return (
      <InvoiceItem reference={referenceNo} date={dueDate} amount={balanceAmount} description={description} />
    )
  }

  // Handle press radio button
  function onPressRadioButton(radioButtonsArray) {
    const selectedObj = radioButtonsArray.find(obj => obj.selected === true)
    setRadioButtons(radioButtonsArray)
    dispatch(appActions.getInvoiceListHandle({status: selectedObj.label}))
  }

  // Handle search items
  const onChangeSearch = useCallback(
    text => {
      setSearchText(text)
      onFetchListInvoice({keyword: text})
    },
    [onFetchListInvoice],
  )

  // Handle ordering items
  const onChangeOrder = useCallback(
    type => {
      onFetchListInvoice({ordering: type})
    },
    [onFetchListInvoice],
  )

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.searchSection}>
        <SearchBar value={textSearch} onChangeText={onChangeSearch} style={styles.searchBar} />
        <TouchableOpacity onPress={onCreateInvoice} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <OcticonsIcon name="diff-added" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <RadioGroup containerStyle={styles.row} radioButtons={radioButtons} onPress={onPressRadioButton} />
      </View>
      <View style={styles.sortSection}>
        <Button
          onPress={() => {
            onChangeOrder('ASCENDING')
          }}
          title="ASCENDING"
        />
        <Button
          onPress={() => {
            onChangeOrder('DESCENDING')
          }}
          title="DESCENDING"
        />
      </View>
      <View>
        <FlatList
          contentInset={{bottom: 20}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item?.invoiceId}`}
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
  row: {
    flexDirection: 'row',
  },
})

export default HomeScreen
