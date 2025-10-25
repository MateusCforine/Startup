import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarLista } from './procurar-lista';

describe('ProcurarLista', () => {
  let component: ProcurarLista;
  let fixture: ComponentFixture<ProcurarLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurarLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurarLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
