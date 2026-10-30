import type { GalleryKey, ImageAsset } from "@/types";

export const images = {
  hero: {
    beyondBorders: {
      src: "/images/hero/beyond-borders.webp",
      alt: "Ashoka Rescue team loading a patient on a stretcher into an air ambulance at sunrise",
    },
    cabinCare: {
      src: "/images/hero/aircraft-cabin-care.webp",
      alt: "Ashoka Rescue paramedic attending to a patient inside an air ambulance",
    },
    inflightMonitoring: {
      src: "/images/hero/inflight-monitoring.webp",
      alt: "Flight physician monitoring a patient's vitals in flight",
    },
    expertPanel: { src: "/images/hero/expert-panel.webp", alt: "Ashoka Rescue's expert panel of doctors" },
    tarmacTransfer: {
      src: "/images/hero/tarmac-transfer.webp",
      alt: "Patient transferred from an air ambulance to a road ambulance on the tarmac",
    },
  },
  brand: { logo: { src: "/images/brand/logo-ashoka-rescue.svg", alt: "Ashoka Rescue" } },
  team: {
    director: { src: "/images/team/dr-ashok-kumar.jpg", alt: "Dr. Ashok Kumar, Director & flight physician" },
  },
  company: {
    certificate: {
      src: "/images/company/certificate-of-incorporation.jpg",
      alt: "Certificate of incorporation of Ashoka Rescue Air Ambulance Services Pvt. Ltd.",
    },
  },
  airAmbulance: {
    tarmacConvoy: {
      src: "/images/air-ambulance/gallery-08.jpg",
      alt: "Air ambulance on the tarmac with ground ambulance and transfer vehicle",
    },
    helicopterEvac: {
      src: "/images/air-ambulance/helicopter-field-evac.jpg",
      alt: "Helicopter medical evacuation with the patient being loaded",
    },
    icuCabin: { src: "/images/air-ambulance/icu-cabin.jpg", alt: "ICU-configured air ambulance cabin" },
    ppeCare: {
      src: "/images/air-ambulance/ppe-inflight-care.jpg",
      alt: "Doctor in protective gear caring for a patient in flight",
    },
    nightBoarding: { src: "/images/air-ambulance/night-boarding.jpg", alt: "Night-time air ambulance boarding" },
  },
  commercialStretcher: {
    patientOnboard: {
      src: "/images/commercial-stretcher/gallery-10.jpg",
      alt: "Patient on a commercial airline stretcher with medical equipment",
    },
    airlineStretcher: {
      src: "/images/commercial-stretcher/airline-stretcher.jpg",
      alt: "Stretcher installed on a commercial airline",
    },
    equipment: {
      src: "/images/commercial-stretcher/onboard-equipment.jpg",
      alt: "Medical equipment set up on board",
    },
  },
  roadAmbulance: {
    fleetDusk: {
      src: "/images/road-ambulance/ambulance-fleet-dusk.jpg",
      alt: "Ashoka Rescue ambulance fleet at dusk",
    },
    teamOnboard: { src: "/images/road-ambulance/gallery-07.jpg", alt: "Medical team inside a road ambulance" },
    alsFleet: { src: "/images/road-ambulance/als-fleet.jpg", alt: "Advanced life support ambulances" },
  },
  businessClass: {
    seatedPatient: {
      src: "/images/business-class/seated-patient.jpg",
      alt: "Patient travelling seated with medical assistance",
    },
  },
  medicalTourism: {
    operatingTheatre: {
      src: "/images/medical-tourism/operating-theatre.jpg",
      alt: "Modern hospital operating theatre",
    },
  },
  services: {
    trainAmbulance: {
      src: "/images/services/train-ambulance-care.jpg",
      alt: "Patient cared for in a train ambulance compartment",
    },
    medicalEscort: {
      src: "/images/services/medical-escort-airport.jpg",
      alt: "Medical escort assisting a patient at the airport",
    },
    ecmo: { src: "/images/services/ecmo-transfer.jpg", alt: "Patient being transferred on ECMO support" },
    neonate: {
      src: "/images/services/neonate-ambulance.jpg",
      alt: "Neonatal incubator inside an ambulance",
    },
    paediatric: {
      src: "/images/services/paediatric-transport.jpg",
      alt: "Paediatric patient transport in an equipped ambulance",
    },
    kidney: { src: "/images/services/kidney-dialysis.jpg", alt: "Patient receiving dialysis" },
    criticalCare: {
      src: "/images/services/critical-care-monitoring.jpg",
      alt: "Critical care monitoring during transport",
    },
  },
} satisfies Record<string, Record<string, ImageAsset>>;

/** Field photography, one folder per transport type. */
export const galleries: Record<GalleryKey, string[]> = {
  airAmbulance: [
    "/images/air-ambulance/gallery-01.jpg",
    "/images/air-ambulance/gallery-02.jpg",
    "/images/air-ambulance/gallery-03.jpg",
    "/images/air-ambulance/gallery-04.jpg",
    "/images/air-ambulance/gallery-05.jpg",
    "/images/air-ambulance/gallery-06.jpg",
    "/images/air-ambulance/gallery-07.jpg",
    "/images/air-ambulance/gallery-08.jpg",
    "/images/air-ambulance/gallery-09.jpg",
    "/images/air-ambulance/gallery-10.jpg",
    "/images/air-ambulance/gallery-11.jpg",
    "/images/air-ambulance/gallery-12.jpg",
    "/images/air-ambulance/gallery-13.jpg",
    "/images/air-ambulance/gallery-14.jpg",
    "/images/air-ambulance/gallery-15.jpg",
  ],
  roadAmbulance: [
    "/images/road-ambulance/gallery-01.jpg",
    "/images/road-ambulance/gallery-02.jpg",
    "/images/road-ambulance/gallery-03.jpg",
    "/images/road-ambulance/gallery-04.jpg",
    "/images/road-ambulance/gallery-05.jpg",
    "/images/road-ambulance/gallery-06.jpg",
    "/images/road-ambulance/gallery-07.jpg",
    "/images/road-ambulance/gallery-08.jpg",
  ],
  commercialStretcher: [
    "/images/commercial-stretcher/gallery-01.jpg",
    "/images/commercial-stretcher/gallery-02.jpg",
    "/images/commercial-stretcher/gallery-03.jpg",
    "/images/commercial-stretcher/gallery-04.jpg",
    "/images/commercial-stretcher/gallery-05.jpg",
    "/images/commercial-stretcher/gallery-06.jpg",
    "/images/commercial-stretcher/gallery-07.jpg",
    "/images/commercial-stretcher/gallery-08.jpg",
    "/images/commercial-stretcher/gallery-09.jpg",
    "/images/commercial-stretcher/gallery-10.jpg",
  ],
};
