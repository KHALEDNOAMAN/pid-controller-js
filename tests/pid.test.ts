import { PIDController } from '../src/index';

describe('PIDController', () => {
  it('should calculate proportional response correctly', () => {
    const pid = new PIDController({ kp: 2, ki: 0, kd: 0 });
    pid.setpoint = 10;
    const out = pid.update(5, 1);
    expect(out).toBe(10); // kp(2) * err(5)
  });

  it('should accumulate integral', () => {
    const pid = new PIDController({ kp: 0, ki: 1, kd: 0 });
    pid.setpoint = 10;
    pid.update(5, 1); // err = 5, int = 5, out = 5
    const out2 = pid.update(5, 1); // err = 5, int = 10, out = 10
    expect(out2).toBe(10);
  });

  it('should calculate derivative kick', () => {
    const pid = new PIDController({ kp: 0, ki: 0, kd: 1 });
    pid.setpoint = 10;
    pid.update(5, 1); // err = 5, prevErr = 0 -> deriv = 5, out = 5
    const out2 = pid.update(8, 1); // err = 2, prevErr = 5 -> deriv = -3, out = -3
    expect(out2).toBe(-3);
  });

  it('should respect output limits', () => {
    const pid = new PIDController({ kp: 10, ki: 0, kd: 0, outputMin: -10, outputMax: 10 });
    pid.setpoint = 100;
    const out = pid.update(0, 1);
    expect(out).toBe(10); // normally 1000, clamped to 10
  });

  it('should respect anti-windup (integral limits)', () => {
    const pid = new PIDController({ kp: 0, ki: 1, kd: 0, integralMax: 5 });
    pid.setpoint = 100;
    const out = pid.update(0, 1);
    expect(out).toBe(5); // normally 100, clamped to 5
  });

  it('should reset state', () => {
    const pid = new PIDController({ kp: 1, ki: 1, kd: 1 });
    pid.setpoint = 10;
    pid.update(0, 1);
    pid.reset();
    const state = pid.getState();
    expect(state.error).toBe(0);
    expect(state.integral).toBe(0);
    expect(state.output).toBe(0);
  });
});