import { Component } from '@angular/core';
import { FormOrcamentoComponent } from './components/form-orcamento/form-orcamento';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormOrcamentoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'alvo-site';
}