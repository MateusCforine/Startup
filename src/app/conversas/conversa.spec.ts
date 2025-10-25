import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversa } from './conversa';

describe('Conversa', () => {
  let component: Conversa;
  let fixture: ComponentFixture<Conversa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conversa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
