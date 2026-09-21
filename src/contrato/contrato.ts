import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ContractData = Record<'internName'|'internCpf'|'internRg'|'birthDate'|'internAddress'|'internEmail'|'internPhone'|'course'|'registration'|'educationInstitution'|'institutionCnpj'|'companyName'|'companyCnpj'|'companyAddress'|'supervisor'|'supervisorRole'|'startDate'|'endDate'|'weeklyHours'|'dailySchedule'|'scholarship'|'transportAllowance'|'activities'|'city'|'signatureDate', string>;

@Component({ selector: 'contrato-root', imports: [FormsModule], templateUrl: './contrato.html', styleUrl: './contrato.css' })
export class Contrato {
  activeSection = 'estagiario';
  folderOpen = true;
  mobileMenuOpen = false;
  data: ContractData = {
    internName:'', internCpf:'', internRg:'', birthDate:'', internAddress:'', internEmail:'', internPhone:'', course:'', registration:'', educationInstitution:'', institutionCnpj:'', companyName:'', companyCnpj:'', companyAddress:'', supervisor:'', supervisorRole:'', startDate:'', endDate:'', weeklyHours:'30', dailySchedule:'Das 09h às 16h, com 1 hora de intervalo', scholarship:'', transportAllowance:'', activities:'', city:'', signatureDate:''
  };
  sections = [
    { id:'estagiario', label:'Estágio', icon:'01' }, { id:'instituicao', label:'Instituição', icon:'02' },
    { id:'empresa', label:'Empresa', icon:'03' }, { id:'estagio', label:'Condições', icon:'04' }
  ];
  get completedFields(): number {
    const required: (keyof ContractData)[] = ['internName','internCpf','internAddress','course','educationInstitution','companyName','companyCnpj','companyAddress','supervisor','startDate','endDate','weeklyHours','dailySchedule','scholarship','activities','city','signatureDate'];
    return required.filter(key => this.data[key].trim()).length;
  }
  get progress(): number { return Math.round(this.completedFields / 17 * 100); }
  goTo(section: string): void { this.activeSection = section; this.mobileMenuOpen = false; document.getElementById(section)?.scrollIntoView({ behavior:'smooth', block:'start' }); }
  next(section: string): void { this.goTo(section); }
  printContract(): void { window.print(); }
  clearForm(): void {
    if (!confirm('Deseja limpar todos os campos do contrato?')) return;
    Object.keys(this.data).forEach(key => this.data[key as keyof ContractData] = '');
    this.data.weeklyHours = '30'; this.data.dailySchedule = 'Das 09h às 16h, com 1 hora de intervalo'; this.goTo('estagiario');
  }
  value(value: string, fallback = '________________________________'): string { return value?.trim() || fallback; }
  date(value: string): string { if (!value) return '____/____/________'; const [year,month,day] = value.split('-'); return `${day}/${month}/${year}`; }
  longDate(value: string): string { if (!value) return '____ de ______________ de ________'; return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR',{ day:'2-digit', month:'long', year:'numeric' }); }
  money(value: string): string { if (!value) return 'R$ _________'; const amount=Number(value.replace(',','.')); return Number.isFinite(amount) ? amount.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : `R$ ${value}`; }
}
