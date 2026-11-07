/**
 * lib/simulations.ts
 * Pure physics calculations and mathematical engines for K-12 Physics simulations.
 * Free of browser DOM/Canvas dependencies for 100% deterministic unit testing.
 */

// ==========================================
// 1. SIMPLE PENDULUM (Con lắc đơn)
// ==========================================

export interface PendulumState {
  theta: number; // Angular position (rad)
  omega: number; // Angular velocity (rad/s)
  alpha: number; // Angular acceleration (rad/s^2)
}

/**
 * Calculates theoretical period of a simple pendulum: T = 2 * pi * sqrt(L / g)
 */
export function calculatePendulumPeriod(length: number, gravity: number): number {
  if (length <= 0 || gravity <= 0) return 0;
  return 2 * Math.PI * Math.sqrt(length / gravity);
}

/**
 * Calculates pendulum kinetic energy: E_k = 0.5 * m * v^2 = 0.5 * m * (L * omega)^2
 */
export function calculatePendulumKineticEnergy(mass: number, length: number, omega: number): number {
  if (mass <= 0 || length <= 0) return 0;
  const v = length * omega;
  return 0.5 * mass * v * v;
}

/**
 * Calculates pendulum potential energy (reference at lowest point):
 * E_p = m * g * h = m * g * L * (1 - cos(theta))
 */
export function calculatePendulumPotentialEnergy(mass: number, gravity: number, length: number, theta: number): number {
  if (mass <= 0 || gravity <= 0 || length <= 0) return 0;
  const h = length * (1 - Math.cos(theta));
  return mass * gravity * h;
}

/**
 * Advance pendulum state by dt using Euler-Cromer integration with damping:
 * alpha = -(g / L) * sin(theta) - damping * omega
 */
export function stepPendulum(
  theta: number,
  omega: number,
  length: number,
  gravity: number,
  damping: number,
  dt: number
): PendulumState {
  if (length <= 0 || gravity <= 0 || dt <= 0) {
    return { theta, omega, alpha: 0 };
  }
  const alpha = -(gravity / length) * Math.sin(theta) - damping * omega;
  const newOmega = omega + alpha * dt;
  const newTheta = theta + newOmega * dt;
  return { theta: newTheta, omega: newOmega, alpha };
}

// ==========================================
// 2. RAY OPTICS REFRACTION (Khúc xạ ánh sáng & Phản xạ toàn phần)
// ==========================================

export interface RefractionResult {
  sinR: number;
  refractedAngleDeg: number | null;
  isTotalInternalReflection: boolean;
  criticalAngleDeg: number | null;
}

/**
 * Calculates critical angle for total internal reflection:
 * i_gh = arcsin(n2 / n1) when n1 > n2
 */
export function calculateCriticalAngle(n1: number, n2: number): number | null {
  if (n1 <= 0 || n2 <= 0) return null;
  if (n1 <= n2) return null; // Only occurs when light travels from denser to rarer medium
  return (Math.asin(n2 / n1) * 180) / Math.PI;
}

/**
 * Snell's Law calculation: n1 * sin(i) = n2 * sin(r)
 * => sin(r) = (n1 / n2) * sin(i)
 */
export function calculateRefraction(n1: number, n2: number, incidentAngleDeg: number): RefractionResult {
  if (n1 <= 0 || n2 <= 0) {
    return { sinR: 0, refractedAngleDeg: null, isTotalInternalReflection: false, criticalAngleDeg: null };
  }

  const criticalAngleDeg = calculateCriticalAngle(n1, n2);
  const iRad = (incidentAngleDeg * Math.PI) / 180;
  const sinR = (n1 / n2) * Math.sin(iRad);

  if (sinR > 1.0) {
    // Total internal reflection (Phản xạ toàn phần)
    return {
      sinR,
      refractedAngleDeg: null,
      isTotalInternalReflection: true,
      criticalAngleDeg,
    };
  }

  const rRad = Math.asin(sinR);
  const refractedAngleDeg = (rRad * 180) / Math.PI;

  return {
    sinR,
    refractedAngleDeg,
    isTotalInternalReflection: false,
    criticalAngleDeg,
  };
}

// ==========================================
// 3. DC CIRCUIT SIMULATION (Mạch điện một chiều)
// ==========================================

export interface CircuitMetrics {
  current: number;    // Amperes (I)
  power: number;      // Watts (P)
  luminosity: number; // 0.0 to 1.0 normalized bulb brightness
}

/**
 * Computes DC circuit metrics based on Ohm's Law and Joule-Lenz law:
 * I = U / R
 * P = U * I = U^2 / R
 */
export function calculateCircuitMetrics(
  voltage: number,
  resistance: number,
  isSwitchClosed: boolean
): CircuitMetrics {
  if (!isSwitchClosed || resistance <= 0 || voltage < 0) {
    return { current: 0, power: 0, luminosity: 0 };
  }

  const current = voltage / resistance;
  const power = voltage * current;
  // Normalized luminosity up to 40W saturation
  const luminosity = Math.min(1.0, Math.max(0, power / 40));

  return { current, power, luminosity };
}
