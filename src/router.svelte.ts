// Simple hash-based router for Svelte 5
import { createHashHistory } from "history";

interface Route {
  path: string;
  component: any;
}

function createRouter() {
  const history = createHashHistory();
  let currentPath = $state(history.location.pathname);
  let currentSearch = $state(history.location.search);
  let currentParams = $state<Record<string, string>>({});

  // Listen to hash changes
  history.listen((update) => {
    currentPath = update.location.pathname;
    currentSearch = update.location.search;
    matchRoute();
  });

  let routes: Route[] = [];

  function registerRoutes(routeList: Route[]) {
    routes = routeList;
    matchRoute();
  }

  function matchRoute() {
    const path = currentPath;
    for (const route of routes) {
      const match = matchPath(route.path, path);
      if (match) {
        currentParams = match.params;
        return;
      }
    }
    currentParams = {};
  }

  function matchPath(pattern: string, path: string) {
    // Exact match for root
    if (pattern === "/" && path === "/") {
      return { params: {} };
    }

    // Don't match root path with dynamic routes
    if (path === "/" && pattern.includes(":")) {
      return null;
    }

    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    // Different lengths - only match if pattern has dynamic segments
    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart.startsWith(":")) {
        params[patternPart.slice(1)] = pathPart;
      } else if (patternPart !== pathPart) {
        return null;
      }
    }

    return { params };
  }

  function navigate(to: string) {
    history.push(to);
  }

  function getComponent(routeList: Route[]) {
    const path = currentPath;
    for (const route of routeList) {
      const match = matchPath(route.path, path);
      if (match) {
        return route.component;
      }
    }
    return null;
  }

  return {
    registerRoutes,
    navigate,
    getComponent,
    get path() {
      return currentPath;
    },
    get search() {
      return currentSearch;
    },
    get params() {
      return currentParams;
    },
  };
}

export const router = createRouter();
