# PID Controller JS

![npm](https://img.shields.io/npm/v/@khalednoaman/pid-controller)
![license](https://img.shields.io/npm/l/@khalednoaman/pid-controller)
![typescript](https://img.shields.io/badge/language-TypeScript-blue)

A robust, enterprise-grade PID controller implementation in TypeScript for Node.js and the browser. Perfect for robotics, IoT, and control systems.

## Features

- **Standard PID Control**: Classic Proportional-Integral-Derivative algorithm.
- **Anti-Windup**: Integral term clamping to prevent windup.
- **Output Limits**: Clamp the output to a specific range.
- **Adaptive PID**: Auto-tuning capabilities using the Ziegler-Nichols method.
- **Cascade PID**: Nested control loops for complex systems.
- **Signal Filters**: Includes Low-Pass, Moving Average, and Kalman filters for noisy sensor data.

## Installation

```bash
npm install @khalednoaman/pid-controller
```

## Usage

### Simple Motor Speed Control
```typescript
import { PIDController } from '@khalednoaman/pid-controller';

const pid = new PIDController({
  kp: 1.5,
  ki: 0.2,
  kd: 0.05,
  outputMin: -255,
  outputMax: 255
});

pid.setpoint = 1000; // Target RPM
let currentRpm = 0;

setInterval(() => {
  const control = pid.update(currentRpm, 0.1); // 100ms dt
  // apply control to motor
  currentRpm += control * 0.1; 
}, 100);
```

### Advanced Features
Check out the `/examples` directory for:
- Drone stabilization (Cascade Control)
- Temperature regulation (Low-pass filtering + PID)
- Motor speed control (Standard PID)

## API Reference

### `PIDController`
- `constructor(config: PIDConfig)`
- `update(currentValue: number, dt: number): number`
- `reset(): void`
- `setTunings(kp: number, ki: number, kd: number): void`
- `setOutputLimits(min: number, max: number): void`
- `getState(): PIDState`