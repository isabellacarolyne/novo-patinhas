import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAgendamentoComponent } from './cadastrar-agendamento.component';

describe('CadastrarAgendamentoComponent', () => {
  let component: CadastrarAgendamentoComponent;
  let fixture: ComponentFixture<CadastrarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAgendamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
