import React from 'react';
import  {
  Container,
  SearchArea,
  SearchInput,
  LoadingIcon,
  Scroller,
  ListArea
  
}  from './style';
import Api from '../../Api';

import BarberItem from '../../components/BarberItem'

const Search = () => {
  const [loading, setLoading] = React.useState(false)
  const [list, setList] = React.useState([])
  const [newList, setNewList] = React.useState([])
  const onFilter = (text) => {

      let newArray = list.filter((el) => {
        return el.name.toString().toLowerCase().indexOf(text.toLowerCase()) > -1;

      })
      setNewList(newArray)
      console.log('new', newArray)
    // }
  }
  const getBarbers = async() => {
    setLoading(true)
    setList([])
    setNewList([])

  let res = await Api.getBarbers()
  if(res.error == ''){
    console.log(res)
    setList(res.data)
    setNewList(res.data)
  }else{''
    alert('Error: ', +res.error)
  }
  setLoading(false)
  }
  React.useEffect(() => {
    getBarbers()
  },[])
  return (
    <Container>
      <Scroller>
      <SearchArea>
        <SearchInput 
          placeholder="Encontre seu barbeiro favorito"  
          placeholderTextColor="#ffffff"
          onChangeText={(text) => onFilter(text)}
        />
      </SearchArea>
      {loading &&
          <LoadingIcon size="large" color="#ffffff"/>
        }
        <ListArea>
      {newList.map((item, K) => (
        <BarberItem key={K} data ={item}/>
      ))}
      </ListArea>
      </Scroller>
    </Container>
  );
}

export default Search;