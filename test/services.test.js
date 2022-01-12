import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world.."),
        new Event(new Date('2019-12-17T10:30:00'),new Date('2019-12-17T18:00:00'),"New Event by Yannick","Campus Numerique","This is NOT an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 results', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(4);
    })

    test('getFirst event shall return event with 2018-12-17 start date', async() => {
       let eventService = new EventService(new EventRepository());
       expect(eventService.getFirstEvent().getStartTime()).toEqual(new Date('2018-12-17T03:24:00'));
    })

    test('getLastEvent shall return event with 2020-04-01 start date', async() => {
       let eventService = new EventService(new EventRepository());
       expect(eventService.getLastEvent().getStartTime()).toEqual(new Date('2020-04-01T09:00:00'));
    })

    test('getLongestEvent shall return event with "Hello World" title', async() => {
       let eventService = new EventService(new EventRepository());
       expect(eventService.getLongestEvent().getTitle()).toEqual("Hello World");
    })

    test('getShortestEvent shall return event with "Hello World" title', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent().getTitle()).toEqual("Hello World");
    })

    test('hasEventOn shall return array of 2 events', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2019-12-17T12:00:00')).length).toBe(2);
    })

    test('getEventByTitle shall return event with "New Event by Yannick" title', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("New Event by Yannick")).toEqual( new Event(new Date('2019-12-17T10:30:00'),new Date('2019-12-17T18:00:00'),"New Event by Yannick","Campus Numerique","This is NOT an hello world.."));
    })

    test('isLocationAvailable shall return false', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2019-12-17T14:45:00'))).toBe(false);
    })
    test('isLocationAvailable shall return true', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2017-12-17T14:45:00'))).toBe(true);
    })
});