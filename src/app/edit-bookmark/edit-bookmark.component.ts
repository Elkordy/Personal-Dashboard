import { NotificationService } from './../shared/notification.service';
import { BookmarkService } from './../shared/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import Bookmark from '../shared/bookmark.model';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {
  bookmark: Bookmark
  constructor(private router: Router, private route: ActivatedRoute, private bookmarkService: BookmarkService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      let idParam = ParamMap.get('id')!;
      this.bookmark = this.bookmarkService.getBookmark(idParam)!;
      console.log(idParam, this.bookmark)
    })
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    const { name, url } = form.value
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    });
    // this.router.navigateByUrl('/bookmarks');

    this.notificationService.show('Bookmark Updated!');

  }
  onDeleteBookmark() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    this.notificationService.show('Bookmark Deleted!');


  }

}
