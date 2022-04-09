import React, { useState, useCallback, useEffect } from 'react'
import {Button , View} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {db} from '../Firebase'
import { collection, addDoc, onSnapshot} from 'firebase/firestore';
export function Chat({route}) {
  const [messages, setMessages] = useState([]);
  const idRoom = route.params.idRoom;
  const user = route.params.user;
  const messagesRef = collection(db,"messages");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (snapshot) => {
        var arrayMessages = [];
        snapshot.docs.forEach(doc => {
          if(doc.data().idRoom === idRoom) arrayMessages.push({
              _id : doc.data()._id,
              createdAt : doc.data().createdAt.toDate(),
              idRoom : doc.data().idRoom,
              text : doc.data().text,
              user : doc.data().user
          })
        })
        arrayMessages.sort((a,b) => b.createdAt - a.createdAt)
        setMessages(arrayMessages);
    });
  }, [])
  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) 
    const {_id,createdAt,text,user} = messages[0];
    await addDoc(messagesRef, {
        _id  : _id,
        createdAt : createdAt,
        idRoom : idRoom ,
        text : text,
        user : user,
      });
  }, [])
  return(
    <>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={user}
    />
     </>
  )
}

