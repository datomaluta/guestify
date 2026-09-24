import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface ProblemQuestion {
  icon: string;
  key: string;
}

/**
 * "The problem" სექცია — hero-ს შემდეგ, თუ რა ტკივილს ხსნის Guestify (სტუმრები
 * ერთსა და იმავე კითხვებს ისევ და ისევ სვამენ). :host { display: contents } იმავე
 * მიზეზით, რაც hero-section-ს — თავად .problem ელემენტი უნდა იყოს landing-ის
 * section-ების ნაკადში, არა custom element-ი მის გარშემო.
 */
@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RevealDirective],
  templateUrl: './problem-section.component.html',
  styleUrl: './problem-section.component.scss',
})
export class ProblemSectionComponent {
  protected readonly questions: ProblemQuestion[] = [
    { icon: 'wifi', key: 'landing_problem_q1' },
    { icon: 'schedule', key: 'landing_problem_q2' },
    { icon: 'local_parking', key: 'landing_problem_q3' },
    { icon: 'contact_support', key: 'landing_problem_q4' },
  ];
}
