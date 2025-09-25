import { Component } from '@angular/core';
import { CompAppLayout } from './_components/layout/comp-app-layout/comp-app-layout';

@Component({
  selector: 'app-root',
  imports: [CompAppLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isCollapsed = false;
}
