import { Message, ChatService } from './services/chatservice/chatbot.service'
import {Component, ViewChild,  Inject} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}