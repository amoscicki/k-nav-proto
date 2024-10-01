import { Container } from "inversify";
import "reflect-metadata";
import { ServiceConfig, TYPES } from "./types";

export type AppConfig = {
  [key in keyof Partial<typeof TYPES>]: ServiceConfig<key>;
};

function bindConfig(cfg: AppConfig) {
  // Initialize container
  const container = new Container();

  Object.entries(cfg).forEach(([key, { _type, impl, scope }]) => {
    const symbol = TYPES[key as keyof typeof TYPES].s;
    switch (scope) {
      case "Singleton":
        container.bind<typeof _type>(symbol).to(impl).inSingletonScope();
        break;
      case "Transient":
        container.bind<typeof _type>(symbol).to(impl).inTransientScope();
        break;
      case "Request":
        container.bind<typeof _type>(symbol).to(impl).inRequestScope();
        break;
      default:
        throw new Error(`Invalid scope: ${scope}`);
    }
  });
  return function getService<
    K extends keyof typeof TYPES,
    T extends (typeof TYPES)[K]["type"],
  >(key: K) {
    const symbol = TYPES[key as keyof typeof TYPES]?.s ?? Symbol.for(key);
    if (!container.isBound(symbol)) {
      throw new Error(`Service ${key} is not bound to the container`);
    }
    const service = container.get<T>(symbol);
    return service;
  };
}

export { bindConfig };
