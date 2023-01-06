import React ,{ useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import AuthService from '../../services/auth.service';
import ConversationService from '../../services/conver.service';

function SendMessage({socket, increaseRenderValue, currentConversation, room}) {

	const user = AuthService.getCurrentUser();

	const [messageInput,setMessageInput] = useState("");

	const sendMessage = (event) => {
		
		if (event.key === 'Enter') {
			if(!messageInput){
				alert("please fill in field!!")
			}
			else{
				var reply = messageInput;
				var conversationReplyTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();
				var conversation = currentConversation;
				const status = 0
				var ConversationReply = {reply, conversationReplyTime, status, user, conversation}
		
				ConversationService.createConversationReply(ConversationReply)
					.then(res => {
						increaseRenderValue();
					})
					.catch((err)=>{
						console.log(err)
					});
				ConversationService.readOthersUserID(currentConversation.id, user.id)
					.then(res => {
						socket.emit("sendMessage",{
							senderID: user.id,
							text: messageInput,
							room: room
						})
		
						/* socket.emit("sendMessNotification",{		
							otherUserList:res.data
						
						}) */
		
						
					})
		
					ConversationService.getOtherMemIDs(currentConversation.id, user.id).then(result => {
						socket.emit("sendMessNotification",{		
							otherUserList:result.data
						})
					})
				
				setMessageInput('');
		
			}
		  }
			
		
		
		
		

	}

	return (
		<div className="input_msg_write">
			<TextareaAutosize

				className="write_msg" 
				placeholder="Type a message" 
				autoFocus
				id="TextAreaResizeable"
				name="inputComment" 
				value = {messageInput}
				onChange= {(e)=> setMessageInput(e.target.value)}  
				onKeyDown = {(e) => sendMessage(e)} 
			/>
		
		</div>
	);
}

export default SendMessage
