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
  imports: [CommonModule, FormsModule, MenuComponent, LikesPipe],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent {
  avatar = 'assets/prints/avatar.png';

  stories = Array.from({ length: 8 });

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
      img: 'Corbucci.jpeg', // nome exato do arquivo
      like: false,
      likes: 20100,
      comments: 92
    },
    {
      autor: 'Masterchef',
      tag: '#tv',
      tempo: 'ontem',
      img: 'masterchef.png', // nome exato do arquivo
      like: false,
      likes: 20100,
      comments: 47
    }
  ];

  imgUrl(path?: string | null): string {
    if (!path) return 'assets/prints/gusto.jpg';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('assets/')) return path;
    return `assets/prints/${path}`;
  }

  useFallback(ev: Event, file = 'gusto.jpg') {
    const img = ev.target as HTMLImageElement;
    img.onerror = null;
    img.src = `assets/prints/${file}`;
  }

  toggleLike(p: Post) {
    p.like = !p.like;
    p.likes += p.like ? 1 : -1;
  }

  toggleComments(p: Post) {
    p.showCommentBox = !p.showCommentBox;
  }

  addComment(p: Post) {
    const txt = (p.newComment || '').trim();
    if (!txt) return;
    (p.commentsList ??= []).push(txt);
    p.comments += 1;
    p.newComment = '';
  }
}
