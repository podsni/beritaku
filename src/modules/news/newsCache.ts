export class TimedCache<T> {
  private readonly values = new Map<string, { expiresAt: number; value: T }>();

  constructor(private readonly ttlMs: number) {}

  get(key: string): T | undefined {
    if (this.ttlMs <= 0) {
      return undefined;
    }

    const cached = this.values.get(key);
    if (cached === undefined) {
      return undefined;
    }

    if (cached.expiresAt <= Date.now()) {
      this.values.delete(key);
      return undefined;
    }

    return cached.value;
  }

  set(key: string, value: T): void {
    if (this.ttlMs <= 0) {
      return;
    }

    this.values.set(key, {
      expiresAt: Date.now() + this.ttlMs,
      value,
    });
  }
}
