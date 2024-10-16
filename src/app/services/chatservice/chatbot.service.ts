import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
  constructor() {}
  conversation = new Subject<Message[]>();
  messageMap:any = {
    "Hi": "Welcome to digitalConcierge! How can I assist you today?",
    "hi": "Welcome to digitalConcierge! How can I help you?",
    "Hello": "Welcome to digitalConcierge! How can I assist you today?",
    "hello": "Welcome to digitalConcierge! How can I help you?",
    "Who are you?": "My name is Test Sat Bot, your digitalConcierge.",
    "who are you?": "I'm Test Sat Bot, your virtual assistant for digitalConcierge.",
    "What is your role?": "I am here to provide assistance and make your life easier.",
    "what is your role?": "My role is to guide you through digitalConcierge features and help you with tasks.",
    "What can you do?": "I can help with tasks, answer your questions, and be your virtual assistant.",
    "what can you do?": "I can assist with daily tasks, scheduling, reminders, and more.",
    "Tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "tell me a joke": "Here's a fun one: Why do we never tell secrets on a farm? Because the potatoes have eyes, and the corn has ears!",
    "What is digitalConcierge?": "digitalConcierge is an AI assistant app designed to help you manage tasks, find information, and more.",
    "what is digitalConcierge?": "digitalConcierge is your personal AI assistant for helping with everyday tasks.",
    "How can you help me?": "I can assist with scheduling, reminders, and answering questions.",
    "how can you help me?": "I'm here to help you manage tasks, set reminders, and find information quickly.",
    "Can you set a reminder?": "Absolutely! What would you like me to remind you about?",
    "can you set a reminder?": "Sure! Please tell me what you want to be reminded of.",
    "What time is it?": "I'm sorry, but I can't check the current time. You might want to look at your device.",
    "what time is it?": "Unfortunately, I don't have the capability to check the time. Please check your device.",
    "What's the weather like?": "I can't provide real-time weather updates. You can check a weather app for the latest.",
    "what's the weather like?": "I can't access weather data right now. Please use a weather app.",
    "Help!": "I'm here to help! What do you need assistance with?",
    "help!": "Of course! Just let me know how I can assist you.",
    "Bye": "Goodbye! Let me know if you need anything else.",
    "bye": "Take care! Reach out whenever you need assistance.",
    "Thank you": "You're welcome! Happy to help.",
    "thank you": "No problem! I'm always here to assist you.",
    "What is your name?": "I am Test Sat Bot, your assistant.",
    "what is your name?": "I'm Test Sat Bot, your digitalConcierge assistant.",
    "Can you schedule a meeting?": "Yes, I can help with that! Please provide the details.",
    "can you schedule a meeting?": "Absolutely! Just let me know the time and date.",
    "What are your features?": "I offer task management, reminders, scheduling, and general information.",
    "what are your features?": "I can help with scheduling, reminders, answering questions, and managing tasks.",
    "defaultmsg": "I can't understand your text. Can you please repeat?"
}


  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string){
    let answer = this.messageMap[question];
    return answer || this.messageMap['defaultmsg'];
  }
}