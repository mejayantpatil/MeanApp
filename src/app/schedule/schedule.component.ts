import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule',  // <home></home>
  styleUrls: [ './schedule.component.scss' ],
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
  events: any[];

    header: any;

  ngOnInit() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
  };
    this.events = [
      {
          "title": "All Day Event",
          "start": "2018-05-05"
      },
      {
          "title": "Long Event",
          "start": "2017-02-07",
          "end": "2017-02-10"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
      }
  ];
  }

}