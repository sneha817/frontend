import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { AppService } from '../services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  title = 'calender';
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  private calendarApi: Calendar | undefined
  events: EventInput[] = [
    {
      title: 'MAKARA SANKRANTI',
      start: '2024-01-15',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'REPUBLIC DAY',
      start: '2024-01-26',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'UGADI',
      start: '2024-04-09',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'MAY DAY',
      start: '2024-05-01',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'BAKRI EID',
      start: '2024-06-17',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'INDEPENDENCE DAY',
      start: '2024-08-15',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'VINAYAKA CHATURTHI',
      start: '2024-09-07',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'GANDHI JAYANTI',
      start: '2024-10-02',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'VIJAYADASHMI',
      start: '2024-10-12',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'DEEPVALI',
      start: '2024-10-31',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'KANNADA RAJYOTSAVA',
      start: '2024-11-01',
      allDay: true,
      backgroundColor: 'green'
    },
    {
      title: 'CHRISTMAS',
      start: '2024-12-25',
      allDay: true,
      backgroundColor: 'green'
    },
    {  id: '1', title: 'event 1', start: '2024-04-15T10:30:00', end: '2024-04-11T12:00:00' },
    {  id: '2', title: 'event 2', start: '2024-04-18T10:30:00', end: '2024-04-18T12:00:00' },
    {  id: '3', title: 'event 3', start: '2024-04-20T10:30:00', end: '2024-04-20T11:30:00' },
    {
      id: '4',
      title: 'event 4',
      start: '2024-03-22T12:30:00',
      end: '2024-03-22T13:30:00',
      allDay: false,
      textColor: 'white',
      backgroundColor: 'blue'
    },
    {
      id: '5',
      title: 'Chillout',
      start: '2024-03-26',
      allDay: true,
      textColor: 'white',
      backgroundColor: 'green',
    },
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrapPlugin],
    contentHeight: '100vh',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    nowIndicator: true,
    selectable: true,
    editable: true,
    // unselectAuto: true,
    navLinks: true,
    eventTextColor: 'white',
    themeSystem: 'bootstrap4',
    eventBackgroundColor: 'blue',
    // eventColor: 'pink',
    // selectMirror: true,
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg: any) => this.handleEventClick(arg),
    events: this.events,
  };
  isMobile: boolean = false;
  constructor(private appService: AppService) { }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
    let currentDate = this.calendarApi.view.currentStart;
    console.log(currentDate);

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }
  eventsPromise!: Promise<EventInput[]>;

  setAvailableSlots() {
    console.log("service call");
    this.appService.fetchAvailableSlots().subscribe(
      (data: any[]) => {
        console.log('Response data:', data);

        this.events = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end
        }));
        // this.calendarComponent.getApi().removeAllEvents();
        this.calendarComponent.getApi().addEventSource(this.events);
        // this.calendarComponent.getApi().render(); 
      },
      (      error: any) => {
        console.error('Error fetching available slots:', error);
      }
    );
  }

  handleDateClick(arg: any) {
    console.log(arg)
    const clickedDate = new Date(arg.date);
    const dayOfWeek = clickedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert('Event creation is not allowed on weekends.');
      return;
    }

    const title = prompt('Enter event title:');
    if (title) {
      let startTime: string | null = null;

      if (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay') {
        startTime = arg.dateStr.split('T')[1].substring(0, 5);
      } else {
        startTime = prompt('Enter start time (HH:mm):');
      }

      const endTime = prompt('Enter end time (HH:mm):');

      if (startTime && endTime && this.isValidTimeFormat(startTime) && this.isValidTimeFormat(endTime)) {
        console.log(arg.dateStr)
        const dateStr = arg.dateStr.split('T')[0];
        console.log(dateStr) //2024-04-17
        const startDateTime = `${dateStr}T${startTime}:00`;
        const endDateTime = `${dateStr}T${endTime}:00`;
        const newEvent: EventInput = {
          title: title,
          start: startDateTime,
          end: endDateTime
        };
        console.log('Clicked date:', arg);
        console.log('New event:', newEvent);

        this.events = [...this.events, newEvent];
        console.log('All events:', this.events);


        this.calendarComponent.getApi().addEvent(newEvent);
        localStorage.setItem('events', JSON.stringify(this.events));
      } else {
        alert('Invalid input. Please enter both start and end times in HH:mm format');
      }
    }
    const clickDate = arg.dateStr;
    console.log(clickDate);
    // this.fetchAvailableSlots(clickDate);
  }

  handleEventClick(arg: any) {
    console.log( arg,"eventclick");
    const eventId = arg.event.id; // Assuming arg.event contains the event object with an ID
    console.log(eventId, "eventID")
    const confirmation = confirm('Do you want to edit this event?');

    if (confirmation) {
      console.log(`Editing event with ID ${eventId}`);
      console.log(arg.event.start)
      const title = prompt('Enter event title:');
      if (title) {
        let startTime: string | null = null;

        if (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay') {
          if (arg.start && arg.startStr.includes('T')) {
            // let date = arg.event.start.split('T')[1].substring(0,5)
            startTime = arg.event.startStr.split('T')[1].substring(0, 5);
          }
        }
        else {
          startTime = prompt('Enter start time (HH:mm):');
        }
        const endTime = prompt('Enter end time (HH:mm):');

        if (startTime && endTime && this.isValidTimeFormat(startTime) && this.isValidTimeFormat(endTime)) {
          const dateStr = arg.event.startStr.split('T')[0];
          console.log(dateStr,'dateStr');
          const startDateTime = `${dateStr}T${startTime}:00`;
          const endDateTime = `${dateStr}T${endTime}:00`;
          console.log(startDateTime);
          console.log(endDateTime);
          console.log('Events in events array:', this.events);

          const index = this.events.findIndex((event: any) => event.id === eventId);

          if (index !== -1) {
            this.events[index].title = title;
            this.events[index].start = startDateTime;
            this.events[index].end = endDateTime;

            console.log('Updated event:', this.events[index]);

            const eventOnCalendar = this.calendarComponent.getApi().getEventById(eventId);
            if (eventOnCalendar) {
              eventOnCalendar.setProp('title', title);
              eventOnCalendar.setStart(startDateTime);
              eventOnCalendar.setEnd(endDateTime);
            } else {
              console.error('Event not found on the calendar');
            }

            localStorage.setItem('events', JSON.stringify(this.events));
          } else {
            console.error('Event not found in events array');
          }
        } else {
          alert('Invalid input. Please enter both start and end times in HH:mm format');
        }
      }
    } else {
      console.log("User cancelled event editing");
    }
  }

  setBlock() {
    const blockedDatesJSON = '["2024-03-12", "2024-03-19", "2024-03-25"]';
    const blockHoursJSON = '["10:30", "12:30", "13:30"]';

    const blockedDates = JSON.parse(blockedDatesJSON);
    const blockedHours = JSON.parse(blockHoursJSON);

    const blockedEvents = blockedDates.map((date: string) => {
      return {
        start: date,
        rendering: 'background',
        backgroundColor: 'black',
        display: 'background'
      };
    });

    if (this.calendarComponent) {
      const calenderApi = this.calendarComponent.getApi();
      calenderApi.render();
      this.calendarComponent.options = this.calendarOptions;
    }

    this.calendarOptions.events = [];

    this.calendarOptions.eventSources = [
      {
        events: [...this.events, ...blockedEvents]
      }
    ];

    this.calendarOptions.selectAllow = (arg) => {
      const clickedDate = arg.startStr.split("T")[0];
      const clickedTime = arg.start.getHours() + ':' + arg.start.getMinutes();
      console.log(clickedDate);
      console.log(clickedTime);
      if (blockedDates.includes(clickedDate) || blockedHours.includes(clickedTime)) {
        alert("you cannot create the event for blocked date!");
      }
      return !blockedDates.includes(clickedDate) || !blockedDates.includes(clickedTime)
    };

  }

  isValidTimeFormat(time: string): boolean {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  }


  checkScreenWidth() {
    this.isMobile = window.innerWidth < 768;

    if (this.isMobile) {
      this.calendarOptions.height = 500;
      this.calendarOptions.headerToolbar = {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,list'
      };
    } else {
      this.calendarOptions.height = '100vh';
      this.calendarOptions.headerToolbar = {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,list'
      };
    }
    this.calendarComponent.getApi().setOption('height', this.calendarOptions.height);
    this.calendarComponent.getApi().setOption('headerToolbar', this.calendarOptions.headerToolbar);
  }

}
