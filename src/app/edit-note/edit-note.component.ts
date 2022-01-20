import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Note from '../shared/note.model';
import { NotificationService } from '../shared/notification.service';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  showMessageError: boolean = false;

  note: Note


  constructor(private route: ActivatedRoute, private noteservice: NoteService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      let idParam = ParamMap.get('id')!;
      this.note = this.noteservice.getNote(idParam)!;
    })
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    this.noteservice.updateNote(this.note.id, form.value);
    this.router.navigateByUrl('/notes');

    this.notificationService.show('Note Updated!')
  }
  onDeleteNote() {
    this.noteservice.deleteNote(this.note.id);
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Note Deleted!')



  }
}
