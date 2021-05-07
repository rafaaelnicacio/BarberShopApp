import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import { 
  Container,
  Scroller,
  BackButtom,
  LoadingIcon,

  SwipeDot,
  SwipeDotActive,
  SwipeItem,  
  SwipeImage,
  FakeSwiper,

  PageBody,

  UserInforArea,
  UserAvatar,
  UserInfor,
  UserInfoName,
  UserFavButtom,

  ServiceArea,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicesTitle,
  ServicePrice,
  ServiceChooseButtom,
  ServiceChooseBntText,

  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody

} from './style';
import Api from '../../Api';
import Swiper from 'react-native-swiper'
import Stars from '../../components/Stars'
import BarberModal from '../../components/BarberModal'

import FavoriteFullIcon from '../../assets/images/favorite_full.svg'
import FavoriteIcon from '../../assets/images/favorite.svg'
import BackIcon from '../../assets/images/back.svg'
import NavPrevIcon from '../../assets/images/nav_prev.svg'
import NavNextIcon from '../../assets/images/nav_next.svg'

const Barber = () => {
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route)

  const [userInfo, setUserInfo] = React.useState({
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  })
  
  const [loading, setLoading] = React.useState(false)
  const [favorited, setFavorited] = React.useState(false)
  const [selectedService, setSelectService] = React.useState(null)
  const [showModal, setShowModal] = React.useState(false)

  const handleFavClick = () =>{
    setFavorited(!favorited)
    Api.setFavorite(userInfo.id)
  }

    const handleBackButton = () => {
    navigation.goBack()
  }


  React.useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true)
      if(route.params.id){
        let json = await Api.getBarber(route.params.id)
      if(json.error == ''){
        setUserInfo(json.data)
        setFavorited(json.data.favorited)
      }else{
        alert('Erro: '+json.error)
      }
      }
      setLoading(false)
    }
    getBarberInfo()
  },[route])
  const handleServiceChoose = (key) => {
    setSelectService(key)
    setShowModal(true)
  }
  return (
    <Container>
      <Scroller>
        {userInfo?.photos && userInfo.photos.length > 0 ?
          <Swiper
            style = {{height: 240}}
            dot = {<SwipeDot/>}
            activeDot= {<SwipeDotActive/>}
            paginationStyle= {{top: 15, right: 15, bottom: null, left: null}}
            autoplay = {true}
          >
            {userInfo?.photos.map((item, key) => (
              <SwipeItem 
                key={key} 
              >
                <SwipeImage 
                  source={{uri: item.url}} 
                  resizeMode= "cover"
                />
              </SwipeItem> 
            ))}
          </Swiper>  
          :
          <FakeSwiper></FakeSwiper>
      }
        <PageBody>
          <UserInforArea>
            <UserAvatar 
              source={{uri: userInfo.avatar}} 
            />
            <UserInfor>
              <UserInfoName>
                {userInfo.name}
              </UserInfoName>
              <Stars 
                stars={userInfo.stars} 
                showNumber={true}
              />
            </UserInfor>
            <UserFavButtom onPress={handleFavClick}>
              {favorited ?
                <FavoriteFullIcon 
                height="24" 
                width="24" 
                fill= "#FF0000"
              />
                :
                <FavoriteIcon 
                height="24" 
                width="24" 
                fill= "#FF0000"
              />
              }
              
            </UserFavButtom>
          </UserInforArea>
          {loading &&
            <LoadingIcon
              size="large"
              color="#000000"
            />
          }
          {!loading && userInfo.services &&
          <ServiceArea>
            <ServicesTitle>Lista de serviços</ServicesTitle>
            {userInfo.services.map((item, key) => (
              <ServiceItem key={key}>
                <ServiceInfo>
                <ServiceName>{item.name}</ServiceName>
                <ServicePrice>R${item.price.toFixed(2)}</ServicePrice>
                </ServiceInfo>
                <ServiceChooseButtom onPress={() => handleServiceChoose(key)}>
                  <ServiceChooseBntText>Agendar</ServiceChooseBntText>
                </ServiceChooseButtom>
              </ServiceItem>
            ))}
          </ServiceArea>
          }
          {!loading && userInfo.testimonials && userInfo.testimonials.length > 0 &&
          
            <TestimonialArea>
                <Swiper
                  style={{height: 110}}
                  showsPagination={false}
                  showsButtons={true}
                  prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                  nextButton={<NavNextIcon width="35" height="35" fill="#000000"/>}
                >
                  {userInfo.testimonials.map((item,key) => (
                    <TestimonialItem key={key}>
                      <TestimonialInfo>
                        <TestimonialName>{item.name}</TestimonialName>
                        <Stars stars={item.rate} showNumber={false}/>
                        <TestimonialBody>{item.body}</TestimonialBody>
                      </TestimonialInfo>  
                    </TestimonialItem>
                  ))}
                </Swiper>
            </TestimonialArea>
          }
        </PageBody>
      </Scroller>
      <BackButtom 
        onPress={handleBackButton}
      >
        <BackIcon
          width="44"
          height="44" 
          fill="#FFFFFF"/>
      </BackButtom>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  )
}

export default Barber;