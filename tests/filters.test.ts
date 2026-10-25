import { LowPassFilter, MovingAverageFilter, KalmanFilter } from '../src/filters';

describe('Filters', () => {
  // alpha weights the NEW sample, which is the standard convention:
  //   y = alpha * x + (1 - alpha) * y_prev
  //
  // So alpha = 0.1 is heavy smoothing: after 100 then 0, the output keeps 90%
  // of its history and reads 90, not 10. This test used to assert 10, which is
  // the opposite convention (alpha weighting the previous value). The
  // implementation was right and the test was wrong, so the expectation is
  // corrected rather than the filter.
  it('LowPassFilter weights the new sample by alpha', () => {
    const filter = new LowPassFilter(0.1);
    expect(filter.update(100)).toBe(100);   // first sample passes through
    expect(filter.update(0)).toBeCloseTo(90);
  });

  // A small alpha must smooth MORE than a large one. This is the property that
  // actually matters to a caller, and unlike the arithmetic above it stays true
  // whichever way round the convention is documented, so it is the test that
  // would have caught the confusion in the first place.
  it('a smaller alpha smooths more', () => {
    const slow = new LowPassFilter(0.1);
    const fast = new LowPassFilter(0.9);
    slow.update(100);
    fast.update(100);
    const slowOut = slow.update(0);
    const fastOut = fast.update(0);
    expect(slowOut).toBeGreaterThan(fastOut);
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