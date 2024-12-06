export function Provider<T>(instance: T) {
  abstract class Provider {
    private static instance = instance;

    public static getInstance(): T {
      return Provider.instance;
    }
  }

  return Provider;
}
