import { PIDController } from '../src/index';

const pid = new PIDController({
  kp: 1.2,
  ki: 0.5,
  kd: 0.01,
  outputMin: -255,
  outputMax: 255,
  integralMax: 100
});

pid.setpoint = 3000; // 3000 RPM
let currentRPM = 0;

console.log('Starting motor...');
for (let i = 0; i < 20; i++) {
  const dt = 0.1; // 100ms
  const pwm = pid.update(currentRPM, dt);
  
  // Simulate motor inertia and response
  currentRPM += (pwm * 10) * dt;
  
  console.log(`Time: ${(i * dt).toFixed(1)}s | Target: 3000 | Current RPM: ${currentRPM.toFixed(2)} | PWM: ${pwm.toFixed(2)}`);
}