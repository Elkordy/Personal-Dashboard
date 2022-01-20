import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import Note from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListSub: Subscription;
  constructor() {
    this.loadState();
    this.storageListSub = fromEvent<StorageEvent>(window, 'storage').subscribe((event: StorageEvent) => {
      if (event.key === 'notes') {
        this.loadState()
      }
    });

  }
  ngOnDestroy(): void {
    this.storageListSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') || '{}');
      if (!notesInStorage) return
      this.notes.length = 0
      this.notes.push(...notesInStorage);
    } catch (e) {
      console.log('There was an error retrieveing the notes from localStorage');
      console.log(e);
    }
  }

}
