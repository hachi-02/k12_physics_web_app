import { describe, it, expect } from 'vitest';
import {
  calculatePendulumPeriod,
  calculatePendulumKineticEnergy,
  calculatePendulumPotentialEnergy,
  stepPendulum,
  calculateCriticalAngle,
  calculateRefraction,
  calculateCircuitMetrics,
} from '@/lib/simulations';

describe('Simulations Physics Calculations Suite', () => {
  // ==========================================
  // 1. SIMPLE PENDULUM (Con lắc đơn)
  // ==========================================
  describe('Simple Pendulum Dynamics', () => {
    it('calculates theoretical period T = 2*pi*sqrt(L/g) on Earth (g = 9.8 m/s^2)', () => {
      const length = 1.0; // 1 meter
      const gravity = 9.8;
      const period = calculatePendulumPeriod(length, gravity);

      // T = 2 * pi * sqrt(1 / 9.8) ≈ 2.007 s
      expect(period).toBeCloseTo(2.007, 2);
    });

    it('calculates pendulum period across different celestial gravities (Moon, Mars, Jupiter)', () => {
      const length = 2.0;

      const tMoon = calculatePendulumPeriod(length, 1.6);
      const tMars = calculatePendulumPeriod(length, 3.7);
      const tEarth = calculatePendulumPeriod(length, 9.8);
      const tJupiter = calculatePendulumPeriod(length, 24.8);

      // Lower gravity results in longer period
      expect(tMoon).toBeGreaterThan(tMars);
      expect(tMars).toBeGreaterThan(tEarth);
      expect(tEarth).toBeGreaterThan(tJupiter);

      // Verify analytical values
      expect(tMoon).toBeCloseTo(2 * Math.PI * Math.sqrt(2 / 1.6), 4);
      expect(tJupiter).toBeCloseTo(2 * Math.PI * Math.sqrt(2 / 24.8), 4);
    });

    it('demonstrates mechanical energy conservation (W = Ek + Ep)', () => {
      const mass = 1.0; // 1 kg
      const length = 1.5; // 1.5 m
      const gravity = 9.8;
      const thetaMax = Math.PI / 6; // 30 degrees initial amplitude

      // At max deflection (v = 0, omega = 0)
      const epMax = calculatePendulumPotentialEnergy(mass, gravity, length, thetaMax);
      const ekAtMax = calculatePendulumKineticEnergy(mass, length, 0);
      const totalEnergyAtMax = epMax + ekAtMax;

      expect(ekAtMax).toBe(0);
      expect(epMax).toBeCloseTo(mass * gravity * length * (1 - Math.cos(thetaMax)), 4);

      // At lowest point (theta = 0, Ep = 0, all energy converted to kinetic)
      // By conservation: 0.5 * m * v^2 = W_total => v = sqrt(2 * W_total / m)
      const vBottom = Math.sqrt((2 * totalEnergyAtMax) / mass);
      const omegaBottom = vBottom / length;

      const epBottom = calculatePendulumPotentialEnergy(mass, gravity, length, 0);
      const ekBottom = calculatePendulumKineticEnergy(mass, length, omegaBottom);
      const totalEnergyAtBottom = epBottom + ekBottom;

      expect(epBottom).toBe(0);
      expect(totalEnergyAtBottom).toBeCloseTo(totalEnergyAtMax, 4);
    });

    it('simulates pendulum numerical step with damping and verifies amplitude decay', () => {
      const length = 1.0;
      const gravity = 9.8;
      const damping = 0.05;
      const dt = 0.02; // 20ms

      let state = { theta: 0.5, omega: 0.0, alpha: 0.0 };
      const initialTheta = state.theta;

      // Run 200 time steps (4 seconds)
      for (let i = 0; i < 200; i++) {
        state = stepPendulum(state.theta, state.omega, length, gravity, damping, dt);
      }

      // With damping, peak amplitude must be smaller than initial
      expect(Math.abs(state.theta)).toBeLessThan(initialTheta);
    });

    it('handles invalid or non-positive pendulum parameters gracefully', () => {
      expect(calculatePendulumPeriod(0, 9.8)).toBe(0);
      expect(calculatePendulumPeriod(-1, 9.8)).toBe(0);
      expect(calculatePendulumPeriod(1, -9.8)).toBe(0);
      expect(calculatePendulumKineticEnergy(-1, 1, 2)).toBe(0);
      expect(calculatePendulumPotentialEnergy(1, 9.8, -1, 0.5)).toBe(0);
    });
  });

  // ==========================================
  // 2. RAY OPTICS (Khúc xạ ánh sáng)
  // ==========================================
  describe('Ray Optics & Total Internal Reflection', () => {
    it('applies Snells Law correctly from Air (n1=1.0) into Water (n2=1.33)', () => {
      const n1 = 1.0;
      const n2 = 1.33;
      const incidentAngle = 30; // 30 degrees

      const result = calculateRefraction(n1, n2, incidentAngle);

      expect(result.isTotalInternalReflection).toBe(false);
      expect(result.refractedAngleDeg).not.toBeNull();

      // n1 * sin(30) = n2 * sin(r)
      // sin(r) = 1.0 * 0.5 / 1.33 = 0.3759
      // r ≈ 22.08 degrees
      expect(result.refractedAngleDeg!).toBeCloseTo(22.08, 1);
      // Ray bends towards the normal (r < i when n1 < n2)
      expect(result.refractedAngleDeg!).toBeLessThan(incidentAngle);
    });

    it('passes along normal without deflection at incident angle 0 degrees', () => {
      const result = calculateRefraction(1.0, 1.5, 0);
      expect(result.refractedAngleDeg).toBeCloseTo(0, 4);
      expect(result.isTotalInternalReflection).toBe(false);
    });

    it('calculates critical angle for Total Internal Reflection (n1 > n2)', () => {
      // Water (1.33) to Air (1.0)
      const ighWater = calculateCriticalAngle(1.33, 1.0);
      expect(ighWater).not.toBeNull();
      // asin(1.0 / 1.33) ≈ 48.75 degrees
      expect(ighWater!).toBeCloseTo(48.75, 1);

      // Diamond (2.42) to Air (1.0)
      const ighDiamond = calculateCriticalAngle(2.42, 1.0);
      expect(ighDiamond).not.toBeNull();
      // asin(1.0 / 2.42) ≈ 24.41 degrees
      expect(ighDiamond!).toBeCloseTo(24.41, 1);

      // Rare-to-dense (n1 <= n2) has no critical angle
      expect(calculateCriticalAngle(1.0, 1.5)).toBeNull();
      expect(calculateCriticalAngle(1.5, 1.5)).toBeNull();
    });

    it('detects Total Internal Reflection (TIR) when incident angle exceeds critical angle', () => {
      const n1 = 1.5; // Glass
      const n2 = 1.0; // Air
      // igh = asin(1 / 1.5) = 41.81 degrees

      // Angle below critical: 30 degrees -> Refraction occurs
      const subCritical = calculateRefraction(n1, n2, 30);
      expect(subCritical.isTotalInternalReflection).toBe(false);
      expect(subCritical.refractedAngleDeg).not.toBeNull();
      expect(subCritical.refractedAngleDeg!).toBeGreaterThan(30); // Bends away from normal

      // Angle above critical: 60 degrees -> Total Internal Reflection
      const superCritical = calculateRefraction(n1, n2, 60);
      expect(superCritical.isTotalInternalReflection).toBe(true);
      expect(superCritical.refractedAngleDeg).toBeNull();
      expect(superCritical.sinR).toBeGreaterThan(1.0);
    });
  });

  // ==========================================
  // 3. DC CIRCUIT SIMULATION (Mạch điện một chiều)
  // ==========================================
  describe('DC Circuit Equations (Ohms Law & Power)', () => {
    it('calculates current I = U / R and power P = U * I accurately', () => {
      const voltage = 12; // 12 Volts
      const resistance = 10; // 10 Ohms
      const isSwitchClosed = true;

      const metrics = calculateCircuitMetrics(voltage, resistance, isSwitchClosed);

      expect(metrics.current).toBeCloseTo(1.2, 4); // 12 / 10 = 1.2 A
      expect(metrics.power).toBeCloseTo(14.4, 4); // 12 * 1.2 = 14.4 W
      expect(metrics.luminosity).toBeCloseTo(14.4 / 40, 2);
    });

    it('zeros all metrics when circuit switch is open', () => {
      const metrics = calculateCircuitMetrics(24, 5, false);

      expect(metrics.current).toBe(0);
      expect(metrics.power).toBe(0);
      expect(metrics.luminosity).toBe(0);
    });

    it('caps bulb luminosity at 1.0 when power exceeds saturation limit', () => {
      // 24V on 2 Ohms => I = 12A, P = 288W >> 40W saturation
      const metrics = calculateCircuitMetrics(24, 2, true);

      expect(metrics.current).toBe(12);
      expect(metrics.power).toBe(288);
      expect(metrics.luminosity).toBe(1.0);
    });

    it('handles zero or non-positive resistance without throwing division by zero', () => {
      const metricsZero = calculateCircuitMetrics(12, 0, true);
      expect(metricsZero.current).toBe(0);
      expect(metricsZero.power).toBe(0);

      const metricsNeg = calculateCircuitMetrics(12, -5, true);
      expect(metricsNeg.current).toBe(0);
      expect(metricsNeg.power).toBe(0);
    });
  });
});
