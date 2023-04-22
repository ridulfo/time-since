//@ts-nocheck
import { createHashHistory } from "history";
import type { HistorySource } from "svelte-navigator";

export function createHashSource(): HistorySource {
  const history = createHashHistory();
  let listeners = [];

  history.listen((location) => {
    if (history.action === "POP") {
      listeners.forEach((listener) => listener(location));
    }
  });

  return {
    get location() {
      return history.location;
    },
    addEventListener(name, handler) {
      if (name !== "popstate") return;
      listeners.push(handler);
    },
    removeEventListener(name, handler) {
      if (name !== "popstate") return;
      listeners = listeners.filter((fn) => fn !== handler);
    },
    history: {
      get state() {
        return history.location.state;
      },
      pushState(state, title, uri) {
        history.push(uri, state);
      },
      replaceState(state, title, uri) {
        history.replace(uri, state);
      },
      go(to) {
        history.go(to);
      },
    },
  };
}

export function searchParams(){
  const search = "?" + window.location.hash.split('?')[1];
  const params = new URLSearchParams(search);
  return params;
}
