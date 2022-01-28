class Emitter {
    
    constructor() {
        this._events = {};
    }

    on(event_name, callback) {
        if (!this._events[event_name]) this._events[event_name] = [];
        this._events[event_name].push(callback);
    }
    off(event_name, callback) {
        const events = this._events[event_name] || [];
        const index = events.indexOf(callback);
        events.splice(index, 1);
    }
    emit(event_name, data) {
        const events = this._events[event_name] || [];
        events.forEach(event => {
            event(data);
        });
    }
}

export { Emitter };