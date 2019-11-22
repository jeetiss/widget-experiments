
let listen = (el, event, handler) => {
  el.addEventListener(event, handler);

  return () => el.removeEventListener(event, handler);
};

export default listen
