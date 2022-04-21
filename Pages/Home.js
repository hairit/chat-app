import {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image ,Pressable ,FlatList ,TextInput , Button, LogBox, Dimensions, Platform, StatusBar  } from 'react-native';
import nullAvatar from '../Images/null-avatar.png';
import { db } from '../Firebase';
import { collection, getDocs , query , where , addDoc , onSnapshot, getDoc} from "firebase/firestore";
import Friend from '../Components/Friend';
import { useHeaderHeight } from '@react-navigation/elements';;
import Icon from 'react-native-vector-icons/Feather';


export default function Home({navigation,route}){
  const [sdt, setSdt] = useState('');
  const [searchUser, setSearchUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([])
  const roomsRef = collection(db ,"rooms");
  const usersRef = collection(db,"users");
  const messagesRef = collection(db, "messages");
  const user = route.params;
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const windowHeight = Dimensions.get('window').height;

  const headerHeight = useHeaderHeight();

  useEffect(async () => {
    const unsub = onSnapshot(collection(db, "messages"),async () => {
      getData();
      const q = query(messagesRef);
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length > 0 ){
          var arrayMessages = [];
          querySnapshot.docs.forEach((doc) => {
              arrayMessages.push(doc.data());
          })
          setMessages(arrayMessages)
      }
  });
  }, [])
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"),async () => {
      getData();
  });
  }, [])
  const getData = async () => {
    const q = query(roomsRef , where("users","array-contains",user._id));
      const querySnapshot = await getDocs(q);
      var arrayRooms = [];
      var arrayFriends = [];
      if(querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach((room)=>{
          arrayRooms.push({id : room.id , users  : room.data().users});
          if(room.data().users[0] === user._id) {
              arrayFriends.push({
                    _id : room.data().users[1],
                    idRoom : room.id
             })
          }else arrayFriends.push({
              _id : room.data().users[0],
              idRoom : room.id
          })
        })
      }
      setRooms(arrayRooms);
      setFriends(arrayFriends);
  }
  const searchFriend = async () => {
      const q = query(usersRef , where("_id","==",sdt));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length > 0){
        if(querySnapshot.docs[0].data()._id !== user._id)  setSearchUser(querySnapshot.docs[0].data());
      }
  }
  const getIdRoom = (_id) => {
      var idRoom = null;
      friends.forEach((friend) => {
         if(_id === friend._id) idRoom = friend.idRoom;
      })
      return idRoom;
  }
  const createRoom = async () =>{
    const idRoom = getIdRoom(searchUser._id);
    if(idRoom){
        navigation.navigate('Chat',{idRoom : idRoom , user : user , navigation : navigation})
    }else{
      const newRoom = await addDoc(roomsRef, {
        users : [user._id , searchUser._id]
      });
        navigation.navigate('Chat',{ idRoom : newRoom.id , user : user , navigation : navigation})
    }
    setSearchUser(null);
  }
  const checkMessage =  (idRoom) => {
      var result = false;
      messages.forEach(element => {
          if(element.idRoom === idRoom) result = true;
      });
      return result;
  }
  return(
    <View style={styles.container}>
          <View style={styles.header}>
                <View style={{display : 'flex' ,flexDirection :'row',alignItems :'center'}}>
                    <Image style={styles.avatar} resizeMode='center' source={nullAvatar} />
                    <Text style={styles.nameUser}>{user.name + '(' +user._id + ')'}</Text>
                </View>
                <Icon style={styles.logOut} name='log-out' size={35} onPress={()=>navigation.navigate('Login')}></Icon>
          </View>
          <View style={styles.search}>
              <TextInput style={styles.inputSearch} keyboardType='numeric' placeholder='Tìm bạn bè' onChangeText= {(val) => {setSdt(val); /[^0-9]/.test(val)?alert('Vui lòng chỉ nhập số!'):" "}  }></TextInput>
              <Icon style={styles.iconSearch} size={35} name='search' onPress={()=>searchFriend()}></Icon>
          </View>
          {
            searchUser ? 
              <View style={ styles.userSeacrh}>
                   <View style={{flexDirection : 'row',alignItems :'center'}}>
                      <Image style={styles.avatar} source={nullAvatar} />
                      <Text style={{marginLeft : 7}} >{searchUser.name}</Text>
                  </View>
                  <View style={{flexDirection : 'row',alignItems : 'center'}}>
                      <Pressable onPress={()=>createRoom()} style={{ backgroundColor : '#596CE5',borderRadius :7 , padding : 10 , marginRight : 10}}>
                                <Text style={{color :'#FFFFFF'}}>Nhắn tin</Text>
                      </Pressable>
                      <Pressable onPress={()=>setSearchUser(null)} style={{ backgroundColor : '#C72016',borderRadius :7 , padding : 10}}>
                                <Text style={{color :'#FFFFFF'}}>Xóa</Text>
                      </Pressable>
                  </View>

              </View>
              : null
          }
          <View style={styles.body}>
              <FlatList  
                      data={rooms}
                      renderItem={({item}) =>
                        checkMessage(item.id) ? <Friend _id={item.users[0] === user._id ? item.users[1] : item.users[0]} _idUser={user._id} navigation={navigation} idRoom={item.id} user={user} messages={messages}/>
                          : null
                      }
                      style={styles.listUser}>
              </FlatList>
          </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9C9C9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header : {
    flexDirection : 'row',
    backgroundColor : '#FFFFFF',
    width : '100%',
    alignItems : 'center',
    justifyContent : 'space-between',
    padding : 20
  },
  avatar : {
    width : 50 ,
    height :50 ,
    borderRadius : 50
  },
  nameUser : {
    fontSize : 15,
    fontWeight : "500",
    marginLeft : 10
  },
  body : {
    width : '100%',
    flex : 1,
  },
  listUser : {
    width : '100%',
    backgroundColor : '#FFFFFF',
    flex : 1 
  },
  search : {
    margin : 10,
    backgroundColor: '#F8F8FC',
    padding : 15 ,
    justifyContent : 'space-between',
    width : '100%',
    flexDirection : 'row',
  },
  inputSearch : {
    backgroundColor : '#FFFFFF',
    padding : 7 ,
    width : '85%',
    borderRadius : 10
  },
  userSeacrh : {
    padding  : 10 ,
    backgroundColor : '#FFFFFF',
    width : '100%',
    margin : 10 ,
    borderRadius : 10 ,
    alignItems : 'center',
    justifyContent : 'space-between',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  iconSearch : {
    height: '100%',
    alignContent: 'flex-start',
    color: 'blue',

  },
  logOut : {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red'
  }
});
