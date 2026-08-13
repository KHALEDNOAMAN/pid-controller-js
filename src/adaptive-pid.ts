import { PIDController } from './index';
import { PIDConfig } from './types';

export class AdaptivePIDController extends PIDController {
  constructor(config: PIDConfig) {
    super(config);
  }

  /**
   * Basic Ziegler-Nichols auto-tuning implementation.
   */
  autoTune(oscillationPeriod: number, ultimateGain: number): void {
    const ku = ultimateGain;
    const tu = oscillationPeriod;

    // Classic PID Z-N tuning parameters
    const kp = 0.6 * ku;
    const ki = 1.2 * ku / tu;
    const kd = 0.075 * ku * tu;

    this.setTunings(kp, ki, kd);
  }
}