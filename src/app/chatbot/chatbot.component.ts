import { Component } from '@angular/core';
import { Message, ChatService } from '../services/chatservice/chatbot.service'
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: Message[] = [];
  value: any;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }
  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

  clearMessages() {
    this.messages = []; // Clears the messages array
  }
}
