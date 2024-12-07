import { ConfigKeysMap } from "#types/config-keys-map.type";
import { Path } from "#types/path.type";
import { PathValue } from "../../types/path-value.type";

export type ConfigPath = Path<ConfigKeysMap> | null | undefined;

export type ConfigReturnType<K> = K extends null | undefined
  ? ConfigKeysMap
  : K extends Path<ConfigKeysMap>
    ? PathValue<ConfigKeysMap, K>
    : never;

export abstract class Configurator {
  private readonly config: ConfigKeysMap;

  constructor() {
    this.config = this.load();
  }

  /**
   * Initialize/Load the configuration from the environment.
   */
  protected abstract load(): ConfigKeysMap;

  /**
   * @param name The name of the configuration key.
   * @example
   * get('database.url')
   */
  get<K extends ConfigPath = undefined>(name?: K): ConfigReturnType<K> {
    if (!name) return this.config as ConfigReturnType<K>;

    const keys = name.split(".");

    const keyValue = keys.reduce<ConfigReturnType<K>>((previousValue, currentKey) => {
      const nextValue = previousValue[
        currentKey as keyof ConfigReturnType<K>
      ] as ConfigReturnType<K>;

      if (!nextValue) return previousValue;

      return nextValue;
    }, this.config as ConfigReturnType<K>);

    return keyValue;
  }
}
