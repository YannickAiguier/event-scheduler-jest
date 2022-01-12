
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
       const events = this._eventRepository.getAll();
       let firstEvent = events[0];
       events.forEach(event => {
          if (event.getStartTime() < firstEvent.getStartTime()) {
            firstEvent = event;
          }
       });
        return firstEvent;
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
      const events = this._eventRepository.getAll();
      let lastEvent = events[0];
      events.forEach(event => {
         if (event.getStartTime() > lastEvent.getStartTime()) {
           lastEvent = event;
         }
      });
       return lastEvent;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
       const events = this._eventRepository.getAll();
       let longestEvent = null;
       events.forEach(event => {
           if (this.getEventDuration(event) >= 0 && this.getEventDuration(event) > longestEvent) {
               longestEvent = event;
           }
       })
       return longestEvent;
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

    /**
     * Get an event duration
     * @param Event
     * @return int
     */
    getEventDuration(event) {
        return event.getEndTime() - event.getStartTime()
    }
    
}