import { PIDConfig, PIDState } from './types';
export * from './types';
export * from './adaptive-pid';
export * from './cascade-pid';
export * from './filters';

export class PIDController {
  public kp: number;
  public ki: number;
  public kd: number;
  public setpoint: number;
  public outputMin: number;
  public outputMax: number;
  public integralMax: number;

  private integral: number = 0;
  private previousError: number = 0;
  private lastOutput: number = 0;

  constructor(config: PIDConfig) {
    this.kp = config.kp;
    this.ki = config.ki;
    this.kd = config.kd;
    this.setpoint = config.setpoint ?? 0;
    this.outputMin = config.outputMin ?? -Infinity;
    this.outputMax = config.outputMax ?? Infinity;
    this.integralMax = config.integralMax ?? Infinity;
  }

  update(currentValue: number, dt: number): number {
    if (dt <= 0) return this.lastOutput;

    const error = this.setpoint - currentValue;
    
    // Proportional
    const pOut = this.kp * error;
    
    // Integral with anti-windup
    this.integral += error * dt;
    if (this.integral > this.integralMax) this.integral = this.integralMax;
    if (this.integral < -this.integralMax) this.integral = -this.integralMax;
    const iOut = this.ki * this.integral;
    
    // Derivative
    const derivative = (error - this.previousError) / dt;
    const dOut = this.kd * derivative;
    
    let output = pOut + iOut + dOut;
    
    // Output clamping
    if (output > this.outputMax) output = this.outputMax;
    if (output < this.outputMin) output = this.outputMin;
    
    this.previousError = error;
    this.lastOutput = output;
    
    return output;
  }

  reset(): void {
    this.integral = 0;
    this.previousError = 0;
    this.lastOutput = 0;
  }

  setTunings(kp: number, ki: number, kd: number): void {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
  }

  setOutputLimits(min: number, max: number): void {
    this.outputMin = min;
    this.outputMax = max;
  }

  getState(): PIDState {
    return {
      error: this.previousError,
      integral: this.integral,
      derivative: (this.previousError) / 1, // approximate
      output: this.lastOutput
    };
  }
}