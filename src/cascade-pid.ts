import { PIDController } from './index';

export class CascadePID {
  public outerController: PIDController;
  public innerController: PIDController;

  constructor(outer: PIDController, inner: PIDController) {
    this.outerController = outer;
    this.innerController = inner;
  }

  update(outerMeasurement: number, innerMeasurement: number, dt: number): number {
    // Outer loop calculates the setpoint for the inner loop
    const innerSetpoint = this.outerController.update(outerMeasurement, dt);
    
    this.innerController.setpoint = innerSetpoint;
    
    // Inner loop calculates the final control output
    return this.innerController.update(innerMeasurement, dt);
  }

  reset(): void {
    this.outerController.reset();
    this.innerController.reset();
  }
}