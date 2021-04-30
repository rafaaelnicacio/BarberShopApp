import React from 'react'
import { TabBarIOSItem } from 'react-native';
import styled from 'styled-components/native'


import HomeIcon from '../assets/images/home.svg'
import SearchIcon from '../assets/images/search.svg'
import TodayIcon from '../assets/images/today.svg'
import FavoriteIcon from '../assets/images/favorite.svg'
import AccountIcon from '../assets/images/account.svg'
import { useUser } from '../store/user';



const TabArea = styled.View`
    height: 60px;
    background-color: #4eadbe;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 35px;
    border: 3px solid #4eadbe;
    margin-top: -25px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation}) => {
    const {avatar} = useUser()
    const goTo = (screenName) =>{
        navigation.navigate(screenName)
    }
    React.useEffect(()=>{
        console.log()
    },[])

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('HomeScreen')}>
                <HomeIcon style={{opacity: state.index=== 0 ? 1 : 0.5 }} width="24" height="24" fill="#ffffff"/>
            </TabItem>
            
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index=== 1 ? 1 : 0.5 }} width="24" height="24" fill="#ffffff"/>
            </TabItem>
            
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon style={{opacity: state.index=== 2 ? 1 : 0.5 }} width="32" height="32" fill="#4eadbe"/>
            </TabItemCenter>
            
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon style={{opacity: state.index=== 3 ? 1 : 0.5 }} width="24" height="24" fill="#ffffff"/>
            </TabItem>
            
            <TabItem onPress={()=>goTo('Profile')}>
                {avatar != '' ?
                    <AvatarIcon source={{uri: avatar}}/>
                    
                    :    
                    <AccountIcon style={{opacity: state.index=== 4 ? 1 : 0.5 }} width="24" height="24" fill="#ffffff"/>
            }   
            
                
            </TabItem>
            
        </TabArea>
        
    )
}