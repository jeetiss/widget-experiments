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

export default WatchedValue;
