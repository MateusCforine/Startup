import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Procurar } from './procurar';

describe('Procurar', () => {
  let component: Procurar;
  let fixture: ComponentFixture<Procurar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Procurar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Procurar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
