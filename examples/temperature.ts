import { PIDController } from '../src/index';
import { LowPassFilter } from '../src/filters';

const pid = new PIDController({
  kp: 5.0,
  ki: 0.2,
  kd: 1.0,
  outputMin: 0,
  outputMax: 100 // Heater power 0-100%
});

const sensorFilter = new LowPassFilter(0.2);
pid.setpoint = 200; // Target temperature 200 degrees

let temperature = 25; // Ambient

for (let i = 0; i < 30; i++) {
  // Add noise to sensor
  const noisyTemp = temperature + (Math.random() * 4 - 2);
  const filteredTemp = sensorFilter.update(noisyTemp);
  
  const heaterPower = pid.update(filteredTemp, 1.0); // 1s intervals
  
  // Simulate oven heating up and cooling down
  temperature += (heaterPower * 0.5) - ((temperature - 25) * 0.1);
  
  console.log(`Temp: ${temperature.toFixed(1)} | Filtered: ${filteredTemp.toFixed(1)} | Power: ${heaterPower.toFixed(1)}%`);
}