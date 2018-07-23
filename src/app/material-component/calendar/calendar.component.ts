import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef
} from '@angular/core';
import {
    CalendarEvent,
    CalendarDateFormatter,
    DAYS_OF_WEEK
} from 'angular-calendar';
import {
    isSameDay,
    isSameMonth,
    startOfDay,
    endOfDay
} from 'date-fns';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { colors } from '../calendar-utils/colors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'calendar.component.html',
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})
export class CalendarComponent {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    constructor(private modal: NgbModal) { }

    modalData: {
        event: CalendarEvent;
    };

    view: string = 'month';

    viewDate: Date = new Date();


    locale: string = 'es';

    events: any[] = [
        {
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            title: 'A day event',
            color: colors.red,
            description: "Test"
        }];

    activeDayIsOpen: boolean = true;

    handleEvent(event: CalendarEvent): void {
        this.modalData = { event };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
}