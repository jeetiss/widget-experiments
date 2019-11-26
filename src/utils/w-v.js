const WatchedValue = initial => {
  let _value = initial;
  let watchers = [];

  const fire = value => watchers.forEach(fn => fn(value));

  const unsubscribe = fn => {
    watchers = watchers.filter(f => f !== fn);
  };

  return {
    value(newValue) {
      if (typeof newValue !== "undefined" && _value !== newValue) {
        _value = newValue;
        fire(_value);
      }

      return _value;
    },

    subscribe(fn) {
      watchers.push(fn);

      return () => unsubscribe(fn);
    },

    unsubscribe
  };
};

let computed = (fn, ...watched) => {
  let getValues = () => watched.map(value => value.value());
  let _computed = WatchedValue(fn(...getValues()));

  let watchers = [];
  let off = null;

  let fire = value => watchers.forEach(fn => fn(value));
  let on = () => {
    let unsub = watched.map(w =>
      w.subscribe(() => {
        fire(_computed.value(fn(...getValues())));
      })
    );

    return () => unsub.forEach(fn => fn());
  };

  let unsubscribe = fn => {
    watchers = watchers.filter(f => f !== fn);

    if (watchers.length === 0 && off) {
      off();
    }
  };

  return {
    value: _computed.value,

    subscribe: fn => {
      watchers.push(fn);

      if (watchers.length === 1) {
        off = on();
      }

      return () => unsubscribe(fn);
    },

    unsubscribe
  };
};

export { computed };
export default WatchedValue;
