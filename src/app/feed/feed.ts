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
  showCommentBox?: boolean;
  newComment?: string;
  commentsList?: string[];
};

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, LikesPipe], // ✅ removido NgIf e NgFor
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent {
  stories = Array.from({ length: 8 }).map((_, i) => `story-${i + 1}`);

  brands = ['brand1.png', 'brand2.png', 'brand3.png', 'brand4.png', 'brand5.png'];

  posts: Post[] = [
    {
      autor: 'Outback',
      tag: '#promo',
      tempo: '2 h',
      img: 'outback.jpg',
      like: false,
      likes: 53200,
      comments: 168,
      commentsList: ['Bora!', 'Quero muito provar.']
    },
    {
      autor: 'Corbucci',
      tag: '#desafio',
      tempo: '3 h',
      img: 'corbucci.jpg',
      like: false,
      likes: 20100,
      comments: 92
    },
    {
      autor: 'Masterchef',
      tag: '#tv',
      tempo: 'ontem',
      img: 'masterchef.jpg',
      like: false,
      likes: 20100,
      comments: 47
    }
  ];

  toggleLikeAndComment(p: Post) {
    p.like = !p.like;
    p.likes += p.like ? 1 : -1;
    p.showCommentBox = true;
  }

  addComment(p: Post) {
    const txt = (p.newComment || '').trim();
    if (!txt) return;
    if (!p.commentsList) p.commentsList = [];
    p.commentsList.push(txt);
    p.comments += 1;
    p.newComment = '';
  }
}
