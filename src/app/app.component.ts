import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gate-pass';
  // userData;

  visible = false;



  constructor(private router: Router
  ) {

  } // endof constructor();

}


// end OF LOGOUT SECTION
