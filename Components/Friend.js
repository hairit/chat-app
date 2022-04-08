import React from 'react'
import { View , Text ,StyleSheet , Image ,Pressable} from 'react-native'
import {useState , useEffect} from 'react'
import { db } from '../Firebase' 
import { collection , getDocs , query ,where } from 'firebase/firestore';
import nullAvatar from '../Images/null-avatar.png'

export default function Friend(props) {
    const [friend, setFriend] = useState(null);
    const [messages, setMessages] = useState(props.messages);
    const userRef = collection(db , "users");
    const messagesRef = collection(db , "messages");
    useEffect( async () => {
        const q = query(userRef, where("_id","==",props._id));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0) {
            setFriend(querySnapshot.docs[0].data());
        }else{
          console.log("Get Friend failed");
        }
    }, [])
    useEffect(async () => {
        const q = query(messagesRef , where("idRoom","==" ,props.idRoom))
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0){
            var arrayMessages = [];
            querySnapshot.docs.forEach((doc)=>{
                arrayMessages.push({
                    _id : doc.data()._id,
                    createdAt : doc.data().createdAt.toDate(),
                    text : doc.data().text,
                    idRoom : doc.data().idRoom,
                    user : doc.data().user
                });
            })
            arrayMessages.sort((a,b) => b.createdAt - a.createdAt);
            setMessages(arrayMessages);
        }
    }, [props.messages])
  return(
    <Pressable style={styles.friend} onPress={()=>props.navigation.navigate('Chat', {idRoom : props.idRoom , user : props.user , navigation : props.navigation , messages : messages } )}>
        <Image style={styles.avatarFriend} source={nullAvatar}/>
        <View style={{ justifyContent : 'center' , flex : 1}}>
            <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={{ marginLeft : 7 , fontWeight : "700" }}>{friend ? friend.name + " " : ''}</Text>
            <Text style={{fontWeight:"300", fontStyle:"italic"}}>{friend?'('+ friend._id + ')' : ""}</Text>
            </View>
            {
                messages.length > 0 ? <Text style={{ marginLeft : 7 , marginTop : 7 , fontSize : 13}}>{messages[0].text}</Text> : null
            }
        </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    friend : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        padding : 10,
        borderBottomWidth : 0.5 ,
        borderColor : '#D0D0D0'
    },
    avatarFriend : {
        height : 50,
        width : 50 ,
        borderRadius : 50
    }
})