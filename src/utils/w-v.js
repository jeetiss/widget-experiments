
const WatchedValue = initial => {
  let _value = initial;
  let watchers = [];

  const fire = value => watchers.forEach(fn => fn(value));
  
  const unsubscribe = (fn) => {
    watchers = watchers.filter(f => f !== fn);
  };

  return {
    get value() {
      return _value;
    },

    set value(newValue) {
      if (_value !== newValue) {
        _value = newValue;
        fire(_value);
      }
    },

    subscribe(fn) {
      watchers.push(fn);

      return () => unsubscribe(fn);
    },

    unsubscribe
  };
};

export default WatchedValue
