import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';
import { LikesPipe } from '../shared/likes.pipe';

type Post = {
  autor: string;
  tag: string;
  tempo: string;
  img: string;
  like: boolean;
  likes: number;
  comments: number;
  commentsList?: string[];
  // 🔽 campos para comentário
  showCommentBox?: boolean;
  newComment?: string;
};

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, LikesPipe],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
})
export class FeedComponent {
  stories = Array.from({ length: 9 }).map((_, i) => `story-${i + 1}`);
  avatar = '/avatar.png';

  posts: Post[] = [
    {
      autor: 'Outback',
      tag: '#promo',
      tempo: '2 h',
      img: 'Outback.jpeg',          // ou '/assets/prints/Outback.jpeg'
      like: false,
      likes: 53200,
      comments: 168,
      commentsList: ['Bora!', 'Quero muito provar.'],
    },
    {
      autor: 'Coco Bambu',
      tag: '#seafood',
      tempo: '3 h',
      img: 'cocobambu.png',         // ou '/assets/prints/cocobambu.png'
      like: false,
      likes: 27400,
      comments: 89,
      commentsList: ['Incrível!', 'Melhor camarão da cidade 😍'],
    },
  ];

  toggleLike(p: Post) {
    p.like = !p.like;
    p.likes += p.like ? 1 : -1;
  }

  // 🔽 abre/fecha a caixinha de comentário
  toggleComments(p: Post) {
    p.showCommentBox = !p.showCommentBox;
  }

  // 🔽 envia comentário (usa o campo newComment do próprio post)
  addComment(p: Post) {
    const txt = (p.newComment || '').trim();
    if (!txt) return;
    if (!p.commentsList) p.commentsList = [];
    p.commentsList.push(txt);
    p.comments += 1;
    p.newComment = '';
  }
}
