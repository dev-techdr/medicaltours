import type { CostEstimate } from "@/lib/types";
import { getAllTreatments, getTreatmentBySlug } from "@/data/treatments";

function getCostExtras(treatmentSlug: string): CostEstimate | null {
  const treatment = getTreatmentBySlug(treatmentSlug);
  if (!treatment) return null;

  return {
    treatmentSlug,
    hospitalStayDays:
      treatment.category === "Dental" || treatment.category === "Cosmetic" ? 1 : 5,
    hotelPerNightUsd: 40,
    visaFeeUsd: 80,
    airportTransferUsd: 40,
    interpreterPerDayUsd: 25,
  };
}

export type CostBreakdown = {
  treatmentName: string;
  treatmentMin: number;
  treatmentMax: number;
  hospitalStayDays: number;
  hotelNights: number;
  hotelTotal: number;
  visaFee: number;
  airportTransfer: number;
  interpreterDays: number;
  interpreterTotal: number;
  totalMin: number;
  totalMax: number;
  usaMin: number;
  usaMax: number;
  savingsPercent: number;
};

export function calculateCostEstimate(
  treatmentSlug: string,
  options?: {
    hotelNights?: number;
    includeInterpreter?: boolean;
    attendantCount?: number;
  }
): CostBreakdown | null {
  const treatment = getTreatmentBySlug(treatmentSlug);
  const extras = getCostExtras(treatmentSlug);
  if (!treatment || !extras) return null;

  const hotelNights = options?.hotelNights ?? extras.hospitalStayDays + 5;
  const hotelTotal = hotelNights * extras.hotelPerNightUsd;
  const interpreterDays = options?.includeInterpreter === false ? 0 : hotelNights;
  const interpreterTotal = interpreterDays * extras.interpreterPerDayUsd;
  const attendantMultiplier = 1 + (options?.attendantCount ?? 0) * 0.15;

  const treatmentMin = Math.round(treatment.costMinUsd * attendantMultiplier);
  const treatmentMax = Math.round(treatment.costMaxUsd * attendantMultiplier);

  const fixed = extras.visaFeeUsd + extras.airportTransferUsd + hotelTotal + interpreterTotal;

  const totalMin = treatmentMin + fixed;
  const totalMax = treatmentMax + fixed;
  const usaMid = (treatment.costUsaMinUsd + treatment.costUsaMaxUsd) / 2;
  const indiaMid = (totalMin + totalMax) / 2;
  const savingsPercent = Math.round(((usaMid - indiaMid) / usaMid) * 100);

  return {
    treatmentName: treatment.name,
    treatmentMin,
    treatmentMax,
    hospitalStayDays: extras.hospitalStayDays,
    hotelNights,
    hotelTotal,
    visaFee: extras.visaFeeUsd,
    airportTransfer: extras.airportTransferUsd,
    interpreterDays,
    interpreterTotal,
    totalMin,
    totalMax,
    usaMin: treatment.costUsaMinUsd,
    usaMax: treatment.costUsaMaxUsd,
    savingsPercent: Math.max(0, savingsPercent),
  };
}

export function getAllTreatmentSlugsForCost(): string[] {
  return getAllTreatments().map((t) => t.slug);
}
