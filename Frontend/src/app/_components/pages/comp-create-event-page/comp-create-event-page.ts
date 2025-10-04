import { Component } from '@angular/core';
import { CompEventForm } from "../../components/events/comp-event-form/comp-event-form";

@Component({
  selector: 'app-comp-create-event-page',
  imports: [CompEventForm],
  templateUrl: './comp-create-event-page.html',
  styleUrl: './comp-create-event-page.scss'
})
export class CompCreateEventPage {

}
