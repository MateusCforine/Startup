import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'likes', standalone: true })
export class LikesPipe implements PipeTransform {
  // Exibe 1.2K / 1.5M etc
  transform(value: number): string {
    if (value == null) return '0';
    const abs = Math.abs(value);
    if (abs >= 1_000_000)
      return (value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'M';
    if (abs >= 1_000)
      return (value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'K';
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }
}
