import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu';
import { LikesPipe } from '../shared/likes.pipe';

type Post = {
  _id?: string;
  autor: string;
  tag: string;
  tempo: string;
  img: string;
  like: boolean;
  bookmark?: boolean;
  likes: number;
  comments: number;
  commentsList?: string[];
  showCommentBox?: boolean;
  newComment?: string;
};

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent, LikesPipe],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
})
export class FeedComponent implements OnInit {
  stories = Array.from({ length: 9 }).map((_, i) => `story-${i + 1}`);
  avatar = '/avatar.png';

  posts: Post[] = [];
  loading = true;
  private defaultPosts: Post[] = [
    {
      autor: 'Outback',
      tag: '#promo',
      tempo: '2 h',
      img: '/Outback.jpeg',
      like: false,
      bookmark: false,
      likes: 53200,
      comments: 2,
      commentsList: ['Bora!', 'Quero muito provar.'],
    },
    {
      autor: 'Coco Bambu',
      tag: '#seafood',
      tempo: '3 h',
      img: '/cocobambu.png',
      like: false,
      bookmark: false,
      likes: 27400,
      comments: 2,
      commentsList: ['Incrível!', 'Melhor camarão da cidade'],
    },
  ];
  private API = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts() {
    this.http.get<any[]>(`${this.API}/posts`).subscribe({
      next: (items) => {
        this.posts = (items || []).map((p) => ({
          _id: p._id,
          autor: p.autor,
          tag: p.tag,
          tempo: p.tempo || 'agora',
          img: p.img,
          like: false,
          bookmark: false,
          likes: p.likes ?? 0,
          comments: p.comments ?? 0,
          commentsList: p.commentsList ?? [],
        }));
        if (!this.posts.length) {
          this.posts = [...this.defaultPosts];
        }
        this.loading = false;
      },
      error: () => {
        this.posts = [...this.defaultPosts];
        this.loading = false;
      },
    });
  }

  toggleLike(p: Post) {
    const newLike = !p.like;
    const delta = newLike ? 1 : -1;
    if (!p._id) {
      p.like = newLike;
      p.likes += delta;
      return;
    }
    this.http.post<{ likes: number }>(`${this.API}/posts/${p._id}/like`, { delta }).subscribe({
      next: (res) => {
        p.like = newLike;
        p.likes = res?.likes ?? p.likes + delta;
      },
      error: () => {
        p.like = newLike;
        p.likes += delta;
      },
    });
  }

  toggleComments(p: Post) {
    p.showCommentBox = !p.showCommentBox;
  }

  addComment(p: Post) {
    const txt = (p.newComment || '').trim();
    if (!txt) return;
    if (!p._id) {
      if (!p.commentsList) p.commentsList = [];
      p.commentsList.push(txt);
      p.comments += 1;
      p.newComment = '';
      return;
    }
    this.http
      .post<{ comments: number; commentsList: string[] }>(`${this.API}/posts/${p._id}/comments`, { text: txt })
      .subscribe({
        next: (res) => {
          p.commentsList = res?.commentsList ?? [...(p.commentsList || []), txt];
          p.comments = res?.comments ?? p.comments + 1;
          p.newComment = '';
        },
        error: () => {
          if (!p.commentsList) p.commentsList = [];
          p.commentsList.push(txt);
          p.comments += 1;
          p.newComment = '';
        },
      });
  }

  toggleBookmark(p: Post) {
    p.bookmark = !p.bookmark;
  }

  async copyLink(p: Post) {
    try {
      const base = window.location.origin;
      const id = p._id || 'local';
      const url = `${base}/feed#post-${id}`;
      await navigator.clipboard.writeText(url);
      this.showAutoDismissNotice('Link do post copiado!');
    } catch {
      this.showAutoDismissNotice('Nao foi possivel copiar o link.', 'error');
    }
  }

  showScrollTop = false;
  @HostListener('window:scroll') onScroll() {
    this.showScrollTop = (window.scrollY || 0) > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url || '');
  }

  private showAutoDismissNotice(message: string, type: 'info' | 'error' = 'info') {
    if (typeof document === 'undefined') {
      console.log(message);
      return;
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '16px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 20px';
    toast.style.background = type === 'error' ? '#b00020' : '#323232';
    toast.style.color = '#fff';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}
