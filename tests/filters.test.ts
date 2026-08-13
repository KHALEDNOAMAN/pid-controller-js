import { LowPassFilter, MovingAverageFilter, KalmanFilter } from '../src/filters';

describe('Filters', () => {
  it('LowPassFilter should smooth values', () => {
    const filter = new LowPassFilter(0.1);
    expect(filter.update(100)).toBe(100);
    expect(filter.update(0)).toBe(10);
  });

  it('MovingAverageFilter should average values', () => {
    const filter = new MovingAverageFilter(3);
    filter.update(10);
    filter.update(20);
    expect(filter.update(30)).toBe(20);
  });

  it('KalmanFilter should filter noise', () => {
    const filter = new KalmanFilter(0.01, 0.1);
    const v1 = filter.update(10);
    const v2 = filter.update(12);
    expect(v1).toBe(10);
    expect(v2).toBeGreaterThan(10);
    expect(v2).toBeLessThan(12);
  });
});