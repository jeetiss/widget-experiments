import WatchedValue from "./utils/w-v";

import { Hello, Counter, Tabs, BindedInput, UrlForm, Lazy, Uploader } from "./components";

let root = document.querySelector("#root");
let locale = WatchedValue({ header: "Привет Мир" });

let react = element =>
  new Lazy(
    { factory: () => import("./components/react"), options: {} },
    element
  );

let tabs = new Tabs(
  {
    tabs: [
      ["Hello World", element => new Hello({}, element)],
      ["Counter", element => new Counter({ locale }, element)],
      ["Input", element => new BindedInput({}, element)],
      ["Url Form", element => new UrlForm({}, element)],
      ["React ⚛️", react],
      ["Uploader", element => new Uploader({}, element)]
    ]
  },
  root
);

tabs.mount();
