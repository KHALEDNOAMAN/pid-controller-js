/*
 * Public entry point. Re-exports only.
 *
 * PIDController used to be declared in this file, below `export * from
 * './adaptive-pid'`. That made the package impossible to import: adaptive-pid
 * imports PIDController from './index', so loading index ran adaptive-pid
 * first, which asked for a class this file had not declared yet and got
 * undefined. The base class lives in pid-controller.ts now.
 *
 * Keeping the entry point as re-exports only is what stops that happening
 * again. A barrel file that also declares something can always be re-entered
 * before the declaration runs.
 */
export * from './types';
export * from './pid-controller';
export * from './adaptive-pid';
export * from './cascade-pid';
export * from './filters';
