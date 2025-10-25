import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criar } from './criar';

describe('Criar', () => {
  let component: Criar;
  let fixture: ComponentFixture<Criar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Criar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Criar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
