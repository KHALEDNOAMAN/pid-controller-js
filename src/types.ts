export interface PIDConfig {
  kp: number;
  ki: number;
  kd: number;
  setpoint?: number;
  outputMin?: number;
  outputMax?: number;
  integralMax?: number;
}

export interface PIDState {
  error: number;
  integral: number;
  derivative: number;
  output: number;
}