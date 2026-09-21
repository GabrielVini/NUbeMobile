import { TestBed } from '@angular/core/testing';
import { Contrato } from './contrato';

describe('Contrato', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Contrato] }).compileComponents();
  });

  it('deve criar o gerador de contratos', () => {
    const fixture = TestBed.createComponent(Contrato);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir o título da página', async () => {
    const fixture = TestBed.createComponent(Contrato);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Dados do estágio');
  });
});
