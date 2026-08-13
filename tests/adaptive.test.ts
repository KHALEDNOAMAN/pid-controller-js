import { AdaptivePIDController } from '../src/adaptive-pid';

describe('AdaptivePIDController', () => {
  it('should tune parameters using Ziegler-Nichols', () => {
    const pid = new AdaptivePIDController({ kp: 0, ki: 0, kd: 0 });
    pid.autoTune(2, 10);
    // kp = 0.6 * 10 = 6
    // ki = 1.2 * 10 / 2 = 6
    // kd = 0.075 * 10 * 2 = 1.5
    expect(pid.kp).toBeCloseTo(6);
    expect(pid.ki).toBeCloseTo(6);
    expect(pid.kd).toBeCloseTo(1.5);
  });
});