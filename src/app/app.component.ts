import { Component } from '@angular/core';
import { CheckboxComponent } from '../../projects/checkbox/src/lib/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected toppings = {
    pepperoni: false,
    extracheese: false,
    mushrooms: false
  }
}