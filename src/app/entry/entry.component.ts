import { Component } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './entry.component.html',
})
export class EntryComponent {}