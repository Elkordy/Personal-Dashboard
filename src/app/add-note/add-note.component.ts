import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Note from '../shared/note.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  showMessageError: boolean = false;

  constructor(private noteService: NoteService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showMessageError = true;
    const note = new Note(form.value.title, form.value.content);

    this.noteService.addNote(note);
    this.router.navigateByUrl('/notes');

    this.notificationService.show('Created Note!')
  }


}
