/**
 * First-order low-pass filter.
 *
 *     y = alpha * x + (1 - alpha) * y_prev
 *
 * `alpha` weights the NEW sample, which is the standard convention. So a
 * SMALL alpha smooths more: 0.1 keeps 90% of the history each step, and 0.9
 * barely filters at all. The first sample passes through unchanged rather
 * than being pulled toward zero from a cold start.
 *
 * Documented explicitly because the two conventions are easy to swap and the
 * package's own test asserted the other one, which is how a correct filter
 * ended up looking broken.
 *
 * @param alpha smoothing factor in (0, 1]
 */
export class LowPassFilter {
  private alpha: number;
  private lastVal: number | null = null;

  constructor(alpha: number) {
    this.alpha = alpha;
  }

  update(val: number): number {
    if (this.lastVal === null) {
      this.lastVal = val;
      return val;
    }
    this.lastVal = this.alpha * val + (1 - this.alpha) * this.lastVal;
    return this.lastVal;
  }
}

export class MovingAverageFilter {
  private size: number;
  private values: number[] = [];

  constructor(size: number) {
    this.size = size;
  }

  update(val: number): number {
    this.values.push(val);
    if (this.values.length > this.size) {
      this.values.shift();
    }
    return this.values.reduce((a, b) => a + b, 0) / this.values.length;
  }
}

export class KalmanFilter {
  private q: number;
  private r: number;
  private x: number = 0;
  private p: number = 1;
  private k: number = 0;
  private initialized: boolean = false;

  constructor(q: number, r: number) {
    this.q = q;
    this.r = r;
  }

  update(measurement: number): number {
    if (!this.initialized) {
      this.x = measurement;
      this.initialized = true;
      return this.x;
    }

    // Prediction update
    this.p = this.p + this.q;

    // Measurement update
    this.k = this.p / (this.p + this.r);
    this.x = this.x + this.k * (measurement - this.x);
    this.p = (1 - this.k) * this.p;

    return this.x;
  }
}