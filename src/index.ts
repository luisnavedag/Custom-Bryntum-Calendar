import { Calendar } from "@bryntum/calendar";

const defaultViewConfig = {
    dayStartTime: 6,
    dayEndTime: 21,
    visibleStartTime: 8,
    eventLayout: {
        type: 'fluid',
        gutterWidth: 16,
    },
    showAllDayHeader: false,
    allDayEvents: {
        fullWeek: false,
    },
} as any;
const defaultDayResourceView = {
    type: 'dayview',
    ...defaultViewConfig,
};

const calendar = new Calendar({
    appendTo: document.body,
    resources: createResources(),
    modes: {
        resource: {
            showAvatars: false,
            view: defaultDayResourceView,
            weight: 0,
        },
        week: {
            ...defaultViewConfig,
            weight: 2,
        },
        day: {
            weight: 3,
            ...defaultViewConfig,
        },
        agenda: {
            range: 'day',
            type: 'agenda',
            weight: 4,
        },
        month: null,
        year: null,
    },
    events: createEvents(),
});

calendar.mode = 'resource';

function createResources() {
    const colors = ['blue', 'yellow', 'red', 'green', 'orange'];
    const resources = [];
    for (let i = 0; i < 5; i++) {
        resources.push({
            id: i,
            name: `Resource ${i}`,
            eventColor: colors[i]
        });
    }
    return resources;
}

function createEvents() {
    const events = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const id = i * 10 + j;
            const [startDate, endDate] = createRandomEventDates();
            events.push({
                id,
                name: `Meeting ${id}`,
                startDate: startDate,
                endDate: endDate,
                resourceId: i
            })
        }
    }
    console.log(events)
    return events;
}

function createRandomEventDates() {
    const random = Math.floor(Math.random() * (15 + 1) + 6);
    const startDate = new Date();
    startDate.setHours(random, 0, 0);
    const endDate = new Date();
    endDate.setHours(random, 45, 0);
    return [startDate, endDate];
}
