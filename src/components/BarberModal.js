import React from 'react';
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import ExpandIcon from  '../assets/images/expand.svg'

import NavNextIcon from '../assets/images/nav_next.svg'
import NavPrevIcon from '../assets/images/nav_prev.svg'

import Api from '../Api'

const Modal = styled.Modal``;
const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;
const ModalBody = styled.View`
    background-color: #83d6e3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`;
const CloseButton = styled.TouchableOpacity`
`;
const ModalItem = styled.View`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`;
const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;
const UserName = styled.Text`
    font-size: 18px;
    color: #000000;
    font-weight: bold;
`;
const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;

`;
const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #268596;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    
`;

const FinishButtonText = styled.Text`
    color: #ffffff;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;

`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1px;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`;

const DateNextArea = styled.TouchableOpacity`
    flex: 1px;
    align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;
 
const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const TimeList = styled.ScrollView`

`;

const TimeItem = styled.TouchableOpacity`
    height: 40px;
    width: 75px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TimeItemText = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;
    const moths = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]
    const days = [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
    ]
const BarberModal = ({show, setShow, user, service}) => {
    const navigation = useNavigation()

    const [selectedYear, setSelectedYear] = React.useState()
    const [selectedMonth, setSelectedMonth] = React.useState()
    const [selectedDay, setSelectedDay] = React.useState()
    const [selectedHour, setSelectedHour] = React.useState(null)
    const [listDays, setListDays] = React.useState([])
    const [listHours, setListHours] = React.useState([])


    
    const handleCloseButton = () => {
        setShow(false)
        setSelectedDay(0)
        setSelectedHour(null)
    }
    const handleFinishClick = async () => {
        if(
            user.id &&
            service != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null

        ){
            // let res = await Api.setAppointment(
            //     user.id,
            //     service,
            //     selectedYear,
            //     selectedMonth,
            //     selectedDay,
            //     selectedHour
            // )
            // if(res.error == ''){
            //     setShow(false)
            //     navigation.navigate('Appointments')
            // }else{
            //     alert("Erro:", res.error)
            // }
            setShow(false)
            navigation.navigate('Appointments')
        }else{
            alert("Preencha Todos os Campos")
        }
    }

    //MONITORAÇÃO DATA  
    React.useEffect(() => {
        if(user.available){
            let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate()
            let newListDays = []

            for( let i=1;i<=daysInMonth; i++){
                let d = new Date(selectedYear, selectedMonth, i)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                month = month < 10 ? '0'+month : month
                day = day < 10 ? '0'+day : day
                let selDate = `${year}-${month}-${day}`

                let availability = user.available.filter(e=>e.date === selDate)

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days [d.getDay()],
                    number: i
                })
            }
            setListDays(newListDays)
            setSelectedDay(0)
            setListHours([])
            setSelectedHour(0)
        }

    }, [user,selectedMonth,selectedYear])

    //SETANDO CALENDÁRIO
    React.useEffect(() => {
        let today = new Date()
        setSelectedYear( today.getFullYear() )
        setSelectedMonth( today.getMonth() )
        setSelectedDay ( today.getDay() )
    },[])

    //PREENCHER HORAS
    React.useEffect(()=>{
            if(user.available && selectedDay > 0 ){
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0'+month : month
            day = day < 10 ? '0'+day : day
            let selDate = `${year}-${month}-${day}`

            let availability = user.available.filter(e=>e.date === selDate)
            if(availability.length > 0 ){
                setListHours(availability[0].hours)
            }
        }
        setSelectedHour(null)
    },[user, selectedDay])
    //AUTERAR O MES
        const handleLeftDateClick = () => {
            let mouthDate = new Date(selectedYear, selectedMonth, 1)
            mouthDate.setMonth( mouthDate.getMonth() - 1 )
            setSelectedYear( mouthDate.getFullYear() )
            setSelectedMonth( mouthDate.getMonth() )
            setSelectedDay(0)
        }        
        const handleRightDateClick = () => {
            let mouthDate = new Date(selectedYear, selectedMonth, 1)
            mouthDate.setMonth(mouthDate.getMonth() + 1)
            setSelectedYear(mouthDate.getFullYear())
            setSelectedMonth(mouthDate.getMonth())
            setSelectedDay(0)
            
        }
  return (
      <Modal
        transparent={true}
        visible={show}
        animationType="slide"
      >
          <ModalArea>
            <ModalBody>

                <CloseButton onPress={handleCloseButton}>
                    <ExpandIcon 
                        whidth="40"
                        height="40"
                        fill="#000000"
                    />
                </CloseButton>
                <ModalItem>
                    <UserInfo>
                        <UserAvatar 
                        source={{uri: user.avatar}}
                        />
                        <UserName>{user.name}</UserName>
                    </UserInfo>
                </ModalItem>
                
                {service != null &&
                <ModalItem>
                    <ServiceInfo>
                        <ServiceName>{user.services[service].name}</ServiceName>
                        <ServicePrice>R${user.services[service].price.toFixed(2)}</ServicePrice>
                    </ServiceInfo>
                </ModalItem>
                }
                <ModalItem>
                    <DateInfo>
                        <DatePrevArea 
                        onPress={handleLeftDateClick}
                        >
                            <NavPrevIcon 
                            whidth="35" 
                            height="35" 
                            fill="#000000" 
                            />
                        </DatePrevArea>
                        <DateTitleArea>
                            <DateTitle>{moths[selectedMonth]}{selectedYear}</DateTitle>
                        </DateTitleArea>
                        <DateNextArea onPress={handleRightDateClick}>
                            <NavNextIcon 
                            whidth="35" 
                            height="35" 
                            fill="#000000" 
                            />
                        </DateNextArea>
                    </DateInfo>
                    <DateList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {listDays.map((item, key)=>(
                            <DateItem 
                            key={key}
                            onPress={()=> item.status ? setSelectedDay(item.number) : null}
                            style={{
                                opacity: item.status ? 1 : 0.5,
                                backgroundColor: item.number === selectedDay ? '#4eadb8' : '#ffffff'
                            }}
                            >
                                <DateItemWeekDay
                                    style={{
                                        color: item.number === selectedDay ? '#ffffff' : '#000000'
                                    }}
                                >{item.weekday}</DateItemWeekDay>
                                <DateItemNumber
                                    style={{
                                        color: item.number === selectedDay ? '#ffffff' : '#000000'
                                    }}
                                >{item.number}</DateItemNumber>
                            </DateItem>
                        ))}
                    </DateList>
                </ModalItem>
                
                    {selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <TimeList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}  
                            >
                                {listHours.map((item, key)=>(
                                    <TimeItem
                                        key={key}
                                        onPress={()=>setSelectedHour(item)}
                                        style= {{
                                            backgroundColor: item === selectedHour ? '#4eadbe' : '#ffffff'
                                        }}
                                    >
                                        <TimeItemText
                                            style ={{
                                                color: item === selectedHour ? '#ffffff' : '#000000'

                                            }}
                                        >{item}</TimeItemText>
                                    </TimeItem>
                                ))}
                            </TimeList>
                        </ModalItem>
                    }
                

                <FinishButton onPress={handleFinishClick}>
                    <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                </FinishButton>
            </ModalBody>
          </ModalArea>

      </Modal>
  )
}

export default BarberModal;