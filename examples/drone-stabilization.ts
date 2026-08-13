import { PIDController } from '../src/index';
import { CascadePID } from '../src/cascade-pid';

// Outer loop: Position/Angle
const anglePID = new PIDController({
  kp: 2.0,
  ki: 0.1,
  kd: 0.5
});

// Inner loop: Angular Rate (Gyroscope)
const ratePID = new PIDController({
  kp: 1.5,
  ki: 0.0,
  kd: 0.1,
  outputMin: -100,
  outputMax: 100
});

const cascade = new CascadePID(anglePID, ratePID);
anglePID.setpoint = 0; // Desired angle is 0 (level)

let currentAngle = 10;
let currentRate = 5;

// Simulate drone loop
for (let i = 0; i < 50; i++) {
  const motorOutput = cascade.update(currentAngle, currentRate, 0.01);
  console.log(`Motor adjustment: ${motorOutput}`);
  
  // Simulate physics
  currentRate += motorOutput * 0.1;
  currentAngle += currentRate * 0.01;
}