import React from 'react';
import { Platform, RefreshControl } from 'react-native'
import {request, PERMISSIONS} from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'
import Api from '../../Api'
import BarberItem from '../../components/BarberItem'
import { 
  Container,
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,

  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea


} from './style';
import {useNavigation} from '@react-navigation/native'
import { useUser } from '../../store/user'

import SearchIcon from '../../assets/images/search.svg'
import MyLocationIcon from '../../assets/images/my_location.svg'

const HomeScreen = () => {
  const {setToken} = useUser()
  const navigation = useNavigation('')
  
  const [locationText, setLocationText] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [list, setList] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  //Get Location
  const [coords, setCoords] = React.useState(null)

  const handleLocationFinder = async() =>{  
    setCoords(null)
      let result = await request(
        Platform.OS === 'ios' ?
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          :
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      )
      if(result == 'granted'){
        setLoading(true)
        setLocationText('')
        setList([])
        Geolocation.getCurrentPosition((info) =>{
          setCoords(info.coords)
          getBarbers()
        })
    }
  }
  
  const getBarbers = async() => {
    setLoading(true)
    setList([])
    let res = await Api.getBarbers()
    if(res.error == ''){
      if(res.loc){
        setLocationText(res.loc)
      }
      setList(res.data)
    }else{
      alert('Erro:' +res.error)
    }
    setLoading(false)
  }
  React.useEffect(() => {
    getBarbers()
  }, [])

  const onRefresh = () => {
    setRefreshing(false)
    getBarbers()
  } 

  // return <TouchableOpacity style={{height: 80, width: 80, backgroundColor: 'red'}} onPress={async() => {
  //   await AsyncStorage.removeItem('token')
  //   setToken(null)
  // }}>
  //   <Text>Hme</Text>
  // </TouchableOpacity>;
  return (
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
        
          <SearchButton onPress={() =>navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#ffffff"/>
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput 
            placeholder="Onde você está"
            placeholderTextColor="#ffffff"
            value= {locationText}
            onChangeText={t =>setLocationText(t)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#ffffff"/>
          </LocationFinder>
        </LocationArea>
        {loading &&
          <LoadingIcon size="large" color="#ffffff"/>
        }
        <ListArea>
          {list.map((item, K) => (
            <BarberItem key={K} data={item}/> 
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )

}

export default HomeScreen;