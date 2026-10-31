import type { Service } from "@/types";
import { images } from "./images";

// Content sourced from the Ashoka Rescue website.
export const servicesPage = {
  meta: {
    title: "Our Services | Ashoka Rescue Medical Transport",
    description: "Comprehensive medical transport services including air ambulance, commercial stretcher, road ambulance, and medical tourism assistance.",
  },
  hero: {
    eyebrow: "Our medical transport services",
    title: ["The right care.", "The right journey.", "All the way there."],
    text: "By air, road, or rail, we connect patients to the care they need. Every transfer is coordinated around their condition, comfort, and destination.",
    caption: ["Patient first.", "From bedside to bedside."],
  },
  explore: {
    eyebrow: "Explore our services",
    title: ["Different needs.", "The same commitment to care."],
    text: "Explore transport options and specialist patient services. Our team can help you understand which approach fits your medical requirements.",
    empty: {
      title: "No services match your search.",
      text: "Try a different term, or contact our team for help finding the right service.",
    },
  },
  guide: {
    eyebrow: "A little clarity when it matters",
    title: ["Not sure where", "to begin?"],
    text: "You don’t need to navigate the options alone. Share the patient’s situation with our team, and we’ll help you plan the next step.",
    steps: [
      {
        title: "Tell us about the patient",
        text: "Share the current condition and medical requirements so the team can understand the care needed during travel.",
      },
      {
        title: "Share the route",
        text: "Let us know the pickup location and destination. We coordinate the transport around the journey and clinical needs.",
      },
      {
        title: "Plan with our team",
        text: "Talk through the available options, arrangements, and next steps with our medical coordination team.",
      },
    ],
  },
  cta: {
    eyebrow: "Always ready to listen",
    title: ["Your next step starts", "with a conversation."],
    text: "Medical transport assistance, available around the clock.",
  },
};

export const services: Service[] = [
  {
    slug: "commercial-stretcher-service",
    name: "Commercial Stretcher",
    icon: "stretcher",
    excerpt: "The commercial airline medical stretcher offered by Ashoka Rescue provides a vital solution for patients requiring medical transportation.",
    image: images.commercialStretcher.patientOnboard,
    gallery: "commercialStretcher",
    hero: {
      title: "Commercial Stretcher",
      subtitle: "It typically refers to a service where in commercial airline patients can travel on a stretcher. This service is much more affordable than an Air Ambulance and is usually opted by patients who are not in acute emergency.",
    },
    meta: {
      title: "Commercial Stretcher Service - Safe Medical Travel India",
      description: "Book reliable commercial stretcher service in India with Ashoka Rescue. Safe patient travel on flights with medical support, 24/7 assistance, and care.",
    },
    badges: ["Trusted Doctors", "24*7 Available", "Award Winning", "Professional Work"],
    content: [
      { type: "heading", text: "Commercial Stretcher Medical Services" },
      {
        type: "features",
        items: [
          {
            title: "Transportation Option",
            text: "This transport option is convenient for most stable patients planning to travel anywhere around the world or to another hospital.",
          },
          {
            title: "Medical Staff",
            text: "Medical personnel onboard such as emergency medical technicians (EMTs), paramedics, or nurses to provide medical assistance during transport.",
          },
          {
            title: "Equipment",
            text: "Stretcher service typically uses official stretcher design for safe and convenient transport, supported with all necessary medical equipment and medication on board.",
          },
        ],
      },
    ],
  },
  {
    slug: "charter-air-ambulance-service-in-india",
    name: "Charter Air Ambulance",
    icon: "plane",
    excerpt: "Charter air ambulance services provide critical medical transportation for patients who require immediate medical transportation on a chartered plane for domestic and international journeys.",
    image: images.airAmbulance.tarmacConvoy,
    gallery: "airAmbulance",
    hero: {
      title: "Charter Air Ambulance",
      subtitle: "Emergency air medical transport with ICU-level care, rapid dispatch, and safe long-distance patient transfer.",
    },
    meta: {
      title: "Charter Air Ambulance Services in India | Ashoka Rescue",
      description: "Charter air ambulance services in India for emergency transport, rapid patient transfers, and ICU-level care during flight.",
    },
    content: [
      { type: "heading", text: "Charter Air Ambulance Services in India for Emergency Transport" },
      {
        type: "paragraph",
        text: "Medical emergencies need immediate transport to a specialized medical center and this becomes especially important with long distances. For the continued transfer of critically ill or injured patients, reallocated in situations like this always prefer the best charter air ambulance services in India that are fast, reliable, and medically equipped. These chartered aircraft are specially designed to function like flying intensive care units, ensuring that patients receive continuous medical care during the journey.",
      },
      {
        type: "paragraph",
        text: "As healthcare demands increase and the need for fast patient transfers arises, air ambulance charter in India is becoming an integral component of 21st-century emergency medical flight transportation. These services assist patients in accessing open hospitals as well as health facilities, particularly when timing is of the essence.",
      },
      { type: "subheading", text: "What are charter air ambulance services?" },
      {
        type: "paragraph",
        text: "Charter air ambulances are custom-configured planes outfitted with advanced medical gear, staffed by experienced doctors and paramedics. These aircraft, unlike commercial flights, are dedicated specifically to medical transport, allowing quicker takeoff and direct access to required destinations, offering highly efficient emergency medical transportation for critical patient transfers.",
      },
      {
        type: "paragraph",
        text: "Charter Air Ambulance Services in India are commonly used for emergency evacuation, inter-hospital transportation, and the transfer of patients requiring immediate medical care in another city or even abroad.",
      },
      {
        type: "paragraph",
        text: "These services ensure that patients receive ICU-level care while being transported through charter jet flights air ambulance in India, providing safety, speed, and comfort during critical situations.",
      },
      { type: "subheading", text: "Key Features of Charter Air Ambulance Services" },
      {
        type: "paragraph",
        text: "We can talk about some of the important key features of Professional Charter Air Ambulance Services in India, being the best for emergency medical transport.",
      },
      {
        type: "features",
        items: [
          {
            title: "Advanced Medical Facilities",
            items: [
              "As per the ICU setup inside the aircraft",
              "Life-support systems and ventilators",
              "Cardiac monitors and defibrillators",
              "Oxygen supply and emergency medicines",
            ],
          },
          {
            title: "Highly Skilled Medical Team",
            items: [
              "Experienced critical care doctors",
              "Trained paramedics and nurses",
              "Continuous patient monitoring during flight",
            ],
          },
          {
            title: "Rapid Response and Quick Transfer",
            items: [
              "24/7 emergency availability",
              "Quick booking of air ambulance charter in India",
              "Direct transfer to specialized hospitals",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "These charter jet flights air ambulance in India feature a guarantee of an undisturbed medical treatment of patients during the travel time.",
      },
      { type: "subheading", text: "Advantages of Charter Air Ambulance Services" },
      {
        type: "paragraph",
        text: "Here are some of the key reasons why Charter Air Ambulance Services in India has many benefits for patients and their families.",
      },
      {
        type: "features",
        items: [
          {
            title: "Faster Transportation",
            text: "Air travel slashes the time a patient spends on their way to hospitals compared to road or rail facilities.",
          },
          {
            title: "Access to Specialized Hospitals",
            text: "Patients may be referred to advanced hospitals in provincial territory healthcare systems located in larger cities with access to facilities for specific treatments.",
          },
          {
            title: "Safe and Comfortable Travel",
            text: "This ensures that seriously ill patients are treated in a stable and comfortable environment using dedicated aircraft.",
          },
          {
            title: "Bed-to-Bed Patient Transfer",
            text: "In India, many air ambulance charter services provide comprehensive patient transfer from the source hospital or home to another destination hospital.",
          },
        ],
      },
      { type: "subheading", text: "When Are Charter Air Ambulance Services Needed?" },
      {
        type: "paragraph",
        text: "There are several medical situations where Charter Air Ambulance Services in India become necessary.",
      },
      {
        type: "list",
        items: [
          "Critical accidents or trauma cases",
          "Severe cardiac or neurological emergencies",
          "Organ transplant transportation",
          "Neonatal and pediatric emergencies",
          "Long-distance medical transfers",
          "Patients in need of an advanced therapy not available locally",
        ],
      },
      {
        type: "paragraph",
        text: "In these situations, charter jet flights air ambulance in India provide the fastest and safest method of transportation.",
      },
      { type: "subheading", text: "Medical Equipment Available in Charter Air Ambulances" },
      {
        type: "paragraph",
        text: "Modern Charter Air Ambulance Services in India are equipped with advanced medical technology to manage emergencies during flight. Common equipment includes:",
      },
      {
        type: "list",
        items: [
          "Ventilators for respiratory support",
          "Cardiac monitoring systems",
          "Defibrillators for heart emergencies",
          "Infusion pumps for medication delivery",
          "Portable ICU units",
          "Oxygen cylinders and emergency kits",
        ],
      },
      {
        type: "paragraph",
        text: "This equipment enables medical teams to stabilize and monitor patients during the entire trip.",
      },
      { type: "subheading", text: "Why Charter Air Ambulance Services Are Important?" },
      {
        type: "paragraph",
        text: "Health emergencies may arise at any moment, and instant medical transportation can sometimes mean the difference between life or death. Our Charter Air Ambulance Services in India bridge the distance between remote locations and advanced healthcare services.",
      },
      {
        type: "paragraph",
        text: "Due to this, Ashoka Rescue's charter air ambulance in India guarantees timely and safe transportation of patients with qualified health-related teams, high-tech equipment and short time for action. Rapid air ambulance assistance across all Indian cities.",
      },
      { type: "subheading", text: "Wrapping Up" },
      {
        type: "paragraph",
        text: "As the significance of expedited emergency medical transport becomes evident, the need for Charter Air Ambulance Services in India is on an unprecedented rise. These specialized services combine the speed of aviation with advanced medical care to ensure that critically ill patients receive immediate attention.",
      },
      {
        type: "paragraph",
        text: "In case of a medical emergency, inter-hospital transfer, or urgent treatment in another city, air ambulance charter in India offers an effective solution. For patients who require ground-based alternatives for long-distance transfers, a train ambulance service in Delhi can also be a reliable option. With advanced charter jet flights air ambulance in India, the primary objective is to ensure that patients are transported by medical professionals to the right hospital quickly and safely with continuous monitoring throughout the journey.",
      },
    ],
  },
  {
    slug: "business-class-medical-assistance",
    name: "Business Class Assistance",
    icon: "briefcase",
    excerpt: "Business class medical assistance typically refers to the medical transportation in an airline business class that provides medical assistance for the patient on board.",
    image: images.businessClass.seatedPatient,
    hero: {
      title: "Business Class Assistance",
      subtitle: "This service typically refers to the transportation of the patients who are relatively stable and can travel on wheelchairs with medical assistance of our doctors.",
    },
    meta: {
      title: "Business Class Medical Assistance - Safe Patient Travel",
      description: "Book trusted business class medical assistance with Ashoka Rescue. Comfortable air travel for patients with medical support, safety, and 24/7 coordination.",
    },
    content: [
      { type: "heading", text: "Business Class Assistance" },
      {
        type: "paragraph",
        text: "Business class medical assistance typically refers to the medical transportation in an airline business class that provides medical assistance for the patient on board. This service is designed to offer a more comfortable and convenient travel experience while being assisted by a doctor or a nurse with required medical equipment and oxygen. Business class passengers often have dedicated check-in counters or priority lanes to expedite the check-in process.",
      },
      { type: "heading", text: "Premium Medical Travel Facility" },
      {
        type: "paragraph",
        text: "At Ashoka Rescue, we aim to provide exceptional assistance to patients traveling in premium classes on various airlines. This option is viable for patients who can sit in reclined chairs. You can choose your preferred flight, and we will be there to support you every step of the way. Our specialized doctors will accompany you throughout your journey, ensuring you receive the best care possible on the airline of your choice.",
      },
      { type: "heading", text: "Highly Qualified Medical Staff" },
      {
        type: "paragraph",
        text: "Premium medical facilities typically employ highly skilled and experienced medical professionals, including board-certified physicians, nurses, and allied healthcare professionals assisting you during your flight. These professionals often have specialized training and expertise in their respective fields of medical transportation.",
      },
      {
        type: "heading",
        text: "A premium medical facility aims to provide an exceptional healthcare experience by combining clinical excellence with personalized care",
      },
      {
        type: "features",
        items: [
          {
            title: "Focus on Privacy and Confidentiality",
            text: "Premium medical facilities prioritize patient privacy and confidentiality, ensuring that patient information is handled securely and discreetly. They may implement strict privacy policies and security measures to protect patient data and ensure compliance with healthcare regulations.",
          },
          {
            title: "Premium Facility",
            text: "Premium medical facilities may offer personalized care plans tailored to each patient's individual needs and preferences. This may involve comprehensive assessments, multidisciplinary care teams, and coordinated care throughout the patient's treatment journey.",
          },
        ],
      },
    ],
  },
  {
    slug: "medical-tourism-india",
    name: "Medical Tourism",
    icon: "globe",
    excerpt: "Ashoka Rescue Medical Transports specializes in facilitating medical tourism for patients seeking major medical procedures in India.",
    image: images.medicalTourism.operatingTheatre,
    hero: {
      title: "Medical Tourism",
      subtitle: "Medical tourism refers to facilitating major medical treatment in India.",
    },
    meta: {
      title: "Medical Tourism India - Affordable Healthcare Abroad",
      description: "Explore medical tourism in India with expert care, world-class hospitals, and affordable treatment packages tailored for international patients.",
    },
    content: [
      { type: "heading", text: "Medical Tourism" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports specializes in facilitating medical tourism for patients seeking major medical procedures in India. Our services cater to patients traveling for critical surgeries and treatments such as lung transplants, liver transplants, kidney transplants, cancer treatments, and joint replacements. We ensure that patients receive care at the best hospitals under the supervision of top consultants and specialists.",
      },
      {
        type: "features",
        items: [
          {
            title: "Specialized Surgeries",
            items: ["Cardiac Surgery", "Orthopedic Surgery", "Bariatric Surgery"],
          },
          {
            title: "Critical Treatments",
            items: [
              "Cancer Treatment: Access to leading oncologists and advanced treatment protocols.",
              "Organ Transplantation: Expert care in lung, liver, and kidney transplants.",
              "Joint Replacement: Cutting-edge techniques for hip, knee, and other joint replacements.",
            ],
          },
          {
            title: "Wellness and Preventive Care",
            items: ["Comprehensive health check-ups", "Preventive treatments"],
          },
          {
            title: "Cost Savings",
            text: "One of the primary motivations for medical tourism is cost savings. In many cases, medical treatments abroad can be significantly cheaper than in the patient's home country, even when factoring in travel expenses.",
          },
        ],
      },
      { type: "heading", text: "Highly Qualified Medical Staff" },
      {
        type: "paragraph",
        text: "We coordinate with top hospitals and medical facilities that employ highly skilled and experienced medical professionals, including board-certified physicians, surgeons, nurses, and allied healthcare professionals. These professionals have specialized training and expertise in their respective fields, ensuring you receive the highest quality of care during your medical tourism journey.",
      },
    ],
  },
  {
    slug: "road-ambulance-service-in-india",
    name: "Road Ambulance",
    icon: "ambulance",
    excerpt: "Ashoka Rescue Medical Transports offers non-emergency ambulance services at international airports worldwide, facilitating the pickup and drop-off of repatriating patients.",
    image: images.roadAmbulance.teamOnboard,
    gallery: "roadAmbulance",
    hero: {
      title: "Ambulance Service",
      subtitle: "Providing ambulance service to and from airlines and hospitals for any further assistance.",
    },
    meta: {
      title: "Road Ambulance Service in Delhi & Across India | Ashoka Rescue",
      description: "Looking for a reliable road ambulance service in Delhi with across India? Ashoka Rescue provides 24/7 emergency transport with trained medical staff.",
    },
    content: [
      { type: "heading", text: "Ambulance Service" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports offers non-emergency ambulance services at International airports worldwide, facilitating the pickup and drop-off of repatriating patients via commercial airlines, including Business class, stretcher, and air ambulance travel options. We adhere to international standards, providing pre-booked services staffed by qualified ambulance professionals, including critical care doctors, respiratory physicians, registered nurses (RN), paramedics, and advanced-level Emergency Medical Technicians (EMT) as per the patient's requirements. Through our extensive network of ambulance providers worldwide, we ensure seamless coordination and reliable services.",
      },
      { type: "heading", text: "Complete care from pickup to handover" },
      {
        type: "lead",
        text: "Ambulance services offer seamless transportations for patients bed to bed.",
      },
      {
        type: "features",
        items: [
          {
            title: "Seamless response",
            text: "Our ambulance and partners provide patients with solutions that allow them to seamlessly travel to their destination of care and treatment. Further whether it's curbside or tarmac-side pickup and drop-off, our ambulances are equipped to provide wheelchair assistance at airports and drop-offs.",
          },
          {
            title: "Specialized Ambulance",
            text: "Ashoka Rescue Ambulance maintains certification in Basic Life Support (BLS), Advanced Cardiac Life Support (ACLS), and Advanced Trauma Life Support (ATLS), ensuring the highest level of care for our patients.",
          },
          {
            title: "Transportation Bed to bed",
            text: "If you are traveling by commercial stretcher or Business class assistance our ambulances are there to provide transportations assistance bed to bed through the travel.",
          },
          {
            title: "Medical Consultation",
            text: "We coordinate with your healthcare providers to understand your medical needs and ensure all necessary arrangements are made.",
          },
        ],
      },
      { type: "heading", text: "Ambulance Service" },
      {
        type: "paragraph",
        text: "Our services encompass the pickup and drop-off of patients and medical assistance personnel, including doctors, paramedics, and RNs, at airports. Our dedicated ambulance crew members facilitate the transportation of medical personnel to and from airports, ensuring a smooth handover process and proceeding to the designated destination. Rest assured, Ashoka Rescue Ambulances makes sure to maintain the highest level of care and safety for our patients throughout their journey.",
      },
      { type: "heading", text: "Highly Qualified Medical Staff" },
      {
        type: "paragraph",
        text: "Premium medical facilities typically employ highly skilled and experienced medical professionals, including board-certified physicians, surgeons, nurses, and allied healthcare professionals. These professionals often have specialized training and expertise in their respective fields.",
      },
    ],
  },
  {
    slug: "train-ambulance-service-in-india",
    name: "Train Ambulance",
    icon: "train",
    excerpt: "Ashoka Rescue Medical Transports offers patient transportation services through Train Ambulance, providing a comprehensive bed-to-bed service inclusive of advanced life support.",
    image: images.services.trainAmbulance,
    hero: {
      title: "Train Ambulance",
      subtitle: "Safe and affordable long-distance patient transport by rail with medical supervision, ICU setup, and coordinated transfer support.",
    },
    meta: {
      title: "Train Ambulance Service in India | Ashoka Rescue",
      description: "Safe and affordable train ambulance service in India for long-distance patient transfers with medical supervision and ICU support.",
    },
    content: [
      { type: "heading", text: "Train Ambulance Service in India: Safe and Affordable" },
      {
        type: "paragraph",
        text: "The rapid transfer of patients to an appropriate hospital is critical in medical emergencies. However, when patients have to travel long distances for advanced assisted medical treatment, the train ambulance service in Delhi, India serves as a life-saving and affordable choice. This service helps severely ill or injured patients to travel in a safe manner, and medical attention is provided unceasingly over the course of the journey.",
      },
      {
        type: "paragraph",
        text: "Train ambulance service in India has become an essential part of the healthcare transportation system due to the rising demand for long-distance patient transfers. They are specifically built for the safe and comfortable transportation to their desired hospital using trains.",
      },
      { type: "subheading", text: "What are Train Ambulance Services?" },
      {
        type: "paragraph",
        text: "Just like in the truck ambulance, a train ambulance is also a medical transport facility kept inside a train compartment for comfortable patient travel under the supervision of qualified medical professionals. The compartment transforms into a medical care unit with core life support systems.",
      },
      {
        type: "paragraph",
        text: "A train ambulance service is used in the capital city of Delhi to move patients from there to other cities and bring patients from different parts of the country to the capital for advanced treatment. These emergency medical transportation services ensure patients receive proper medical monitoring throughout the entire process.",
      },
      {
        type: "paragraph",
        text: "There is also the arrangement for medical facilities like an ICU as we do normally travel, so that doctors and paramedics can handle any emergency during transport.",
      },
      { type: "subheading", text: "Key Features of Train Ambulance Services" },
      {
        type: "paragraph",
        text: "The professional train ambulance service in India has many important features that make the process of patient transportation safe and systematic.",
      },
      {
        type: "features",
        items: [
          {
            title: "Advanced Medical Setup",
            text: "Train ambulances are fitted with contemporary medical equipment that prevents deterioration of the patients’ health during their travel.",
            items: [
              "Portable ICU setup",
              "Ventilators and oxygen support",
              "Cardiac monitors and defibrillators",
              "Emergency medicines and medical kits",
            ],
          },
          {
            title: "Skilled Medical Team",
            text: "The skilled medical staff travels with the patients in the train ambulance service in Delhi and closely observes their health.",
            items: [
              "Qualified doctors and paramedics",
              "Continuous monitoring of vital signs",
              "Immediate response to medical emergencies",
            ],
          },
          {
            title: "Complete Transfer Assistance",
            text: "Most train ambulance service in India ensure proper coordination and support during the transfer process.",
            items: [
              "Bed-to-bed patient transfer",
              "Assistance with boarding and unloading",
              "Coordination with hospitals for smooth admission",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "Therefore, these services make train ambulances a reliable means for long-distance patient transport.",
      },
      { type: "subheading", text: "Benefits of Train Ambulance Service" },
      {
        type: "paragraph",
        text: "Train ambulance services in Delhi are preferred for transportation by patients and their loved ones for multiple reasons.",
      },
      {
        type: "features",
        items: [
          {
            title: "Affordable Medical Transport",
            text: "Unlike air ambulance services, train ambulance services are far more economical but do not compromise on the aspect of professional medical care.",
          },
          {
            title: "Comfortable Long-Distance Travel",
            text: "Train journeys provide a lot more space and stability, which is important for patients needing long-term medical supervision.",
          },
          {
            title: "Continuous Medical Monitoring",
            text: "During the trip, trained medical personnel monitor the patient’s health and administer immediate care if necessary.",
          },
          {
            title: "Wide Connectivity",
            text: "The railway network allows train ambulance service in India to connect major cities and medical hubs, making patient transfers easier.",
          },
        ],
      },
      { type: "subheading", text: "When is a Train Ambulance Required?" },
      {
        type: "paragraph",
        text: "A train ambulance service in Delhi is useful in several medical situations where long-distance transportation is required.",
      },
      {
        type: "list",
        items: [
          "Transfer of critically ill patients between cities",
          "Patients needing specialized treatment in Delhi hospitals",
          "Post-surgery patients requiring monitored travel",
          "Individuals with serious medical conditions needing supervision",
          "Patients moving from smaller towns to major healthcare centers",
        ],
      },
      {
        type: "paragraph",
        text: "In these cases, train ambulance service in India offers a safe and efficient transportation solution.",
      },
      { type: "subheading", text: "Wrapping Up" },
      {
        type: "paragraph",
        text: "Ensuring that patients are able to receive timely treatment is where medical transportation comes into play. Train ambulance service in Delhi is a reliable, cost-effective, and medically assisted method of transporting patients across long distances. In many critical cases where faster transfer is required, air ambulance services in India are also used to provide rapid medical evacuation and advanced in-flight care.",
      },
      {
        type: "paragraph",
        text: "Whether it's about transferring a patient suffering from an acute illness or serious injury to multispecialty hospitals, the use of specialized equipment, skilled healthcare workers, and a well-organized transportation system in train ambulance services in India helps patients get transferred to the right hospital safely while receiving consistent supervision during the journey.",
      },
    ],
  },
  {
    slug: "medical-escort-and-transport",
    name: "Ashoka Rescue Medical Escort",
    icon: "doctor",
    excerpt: "Ashoka Rescue Medical Escort specializes in providing non-emergency medical patient transport services via commercial aircraft.",
    image: images.services.medicalEscort,
    gallery: "commercialStretcher",
    hero: {
      title: "Ashoka Rescue Medical Escort",
      subtitle: "Skilled doctors, nurses and paramedics accompanying patients on commercial flights worldwide, since 2004.",
    },
    meta: {
      title: "Medical Escort Services | Ashoka Rescue",
      description: "Professional medical escort services with Ashoka Rescue. Expert medical professionals accompanying patients on commercial flights for safe medical transport.",
    },
    content: [
      { type: "heading", text: "Ashoka Rescue Medical Escort" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Escort specializes in providing non-emergency medical patient transport services via commercial aircraft. Our team comprises skilled medical professionals, including doctors, nurses, and paramedics, who deliver tailored care to address each patient's unique needs.",
      },
      {
        type: "paragraph",
        text: "Our Medical Escort service offers a cost-effective option compared to air ambulances, with our medical escorts capable of providing necessary medical attention during the journey for pre-existing emergency cases. Operating globally, Ashoka Rescue ensures reliable 24/7 patient transport services on commercial airlines, offering stretcher services managed by our proficient medical escort team. Our certified and experienced medical escorts are dedicated to their role, equipped with ACLS/ICU gear tailored to individual patient requirements. To guarantee swift and economical medical transport, our flight coordinators are on hand around the clock, managing both domestic and international travel.",
      },
      {
        type: "paragraph",
        text: "Moreover, our medical staff are proficient in diverse languages and possess international visas to prevent any delays in transportation, with Ashoka Rescue Medical Escorts having delivered this crucial service since 2004.",
      },
      {
        type: "paragraph",
        text: "Our primary objective is to provide exceptional air ambulance services through robust collaborations. Over the years, our medical escorts have successfully facilitated the repatriation of more than 200 stretcher cases across various countries, including India, Canada, the USA, Europe, the UK, the UAE, and Africa.",
      },
      {
        type: "paragraph",
        text: "Our medical escort services cater to patients who do not necessitate air ambulance support. We handle airline medical clearances, in-flight oxygen provisions, ticketing, and ground transportation logistics. The choice between commercial stretcher, first class, or business class accommodations is guided by the patient's specific needs, considering factors like additional legroom, reclining capabilities, and medical equipment requirements. The decision to engage a medical escort is contingent upon the patient's medical condition.",
      },
      {
        type: "paragraph",
        text: "For inquiries, kindly reach out to us via phone or email to discuss your case. Our medical escorts are recognized by various titles, including flying doctors, flying nurses, RNs, med flights, and sky nurses, among others.",
      },
    ],
  },
  {
    slug: "patient-transfer-on-ecmo",
    name: "Patient transfer on ECMO",
    icon: "heartPulse",
    excerpt: "Ashoka Rescue Medical Transport (ARMT) specializes in the transportation of critically unstable patients requiring simultaneous respiratory and circulatory support through ECMO.",
    image: images.services.ecmo,
    hero: {
      title: "Patient transfer on ECMO",
      subtitle: "Ashoka Rescue Medical Transport (ARMT) specializes in the transportation of critically unstable patients requiring simultaneous respiratory and circulatory support through Extracorporeal Membrane Oxygenation (ECMO) technology.",
    },
    meta: {
      title: "Patient Transfer on ECMO - Safe Critical Care",
      description: "Expert patient transfer on ECMO with advanced life support, ICU-level monitoring, and skilled critical care teams for safe hospital-to-hospital transport.",
    },
    content: [
      { type: "heading", text: "Patient Transfer on ECMO" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transport (ARMT) specializes in the transportation of critically unstable patients requiring simultaneous respiratory and circulatory support through Extracorporeal Membrane Oxygenation (ECMO) technology. ECMO serves as an external artificial heart and lung system, maintaining the patient's blood circulation outside the body. Our specialized medical teams, comprising cardiovascular thoracic surgeons, critical care physicians, and perfusionists, are proficient in traveling to hospitals, conducting cannulation on-site, initiating ECMO support, and arranging transportation. We facilitate both domestic and international transfers for patients receiving ECMO therapy. Throughout ECMO treatment, the patient's heart remains operational with assistance from the ECMO device, significantly alleviating the heart and lung workload. This approach aims to temporarily stabilize patients by ensuring adequate blood flow and oxygenation, thereby supporting cardiovascular and respiratory functions.",
      },
      { type: "heading", text: "Advanced ECMO transport services for critically ill patients" },
      {
        type: "features",
        items: [
          {
            title: "ECMO Expertise",
            text: "Our team includes certified ECMO specialists and perfusionists with years of experience in managing ECMO patients during critical transport situations.",
          },
          {
            title: "Advanced Equipment",
            text: "We utilize portable ECMO machines, advanced monitoring systems, and backup equipment to ensure uninterrupted support during transport.",
          },
          {
            title: "Continuous Monitoring",
            text: "Real-time monitoring of ECMO circuit parameters, patient vitals, and blood gas analysis throughout the entire transport process.",
          },
          {
            title: "Rapid Response",
            text: "24/7 availability for emergency ECMO transports with rapid mobilization of specialized teams and equipment.",
          },
        ],
      },
    ],
  },
  {
    slug: "neonate-medical-transport-service",
    name: "Neonate Medical Transportation",
    icon: "baby",
    excerpt: "The Ashoka Rescue Medical Transports team specializes in the transportation of neonate patients on a national and international scale.",
    image: images.services.neonate,
    hero: {
      title: "Neonate Medical Transportation",
      subtitle: "The Ashoka Rescue Medical Transports team specializes in the transportation of neonate patients on a national and international scale.",
    },
    meta: {
      title: "Neonate Medical Transport Service - Safe NICU Transfers",
      description: "Specialized neonate medical transport service with NICU-level care, incubators, and expert neonatal teams for safe hospital-to-hospital transfers.",
    },
    content: [
      { type: "heading", text: "Neonate Medical Transportation" },
      {
        type: "paragraph",
        text: "The Ashoka Rescue Medical Transports team specializes in the transportation of neonate patients on a national and international scale, utilizing various means such as air ambulance, commercial stretcher, train ambulance, and ground ambulance. Our services are also for new-borns in need of urgent and specialized care for transportation to Neonatal Intensive Care Units (NICU), ensuring prompt medical attention post-birth. Ashoka Rescue provides air transports for neonates, fostering effective collaboration among all stakeholders involved in transferring patients from NICU settings. Comprising critical care neonatologists, neonatal nurses, respiratory therapists, and paramedics. Our neonatal team possesses expertise in neonatal resuscitation and interventions, sharpened through extensive transport experience. Neonatal transportation is facilitated in incubators equipped with essential Paediatric Advanced Life Support (PALS) equipment, guaranteeing uninterrupted care during transitions between locations.",
      },
      { type: "heading", text: "Comprehensive neonatal transport services with specialized care" },
      {
        type: "features",
        items: [
          {
            title: "Specialized Equipment",
            text: "Transport incubators with precise temperature control, neonatal ventilators, phototherapy units, and advanced monitoring systems designed for newborns.",
          },
          {
            title: "Expert Neonatal Team",
            text: "Neonatologists, NICU nurses, and respiratory therapists with specialized training in neonatal transport and critical care.",
          },
          {
            title: "Temperature Management",
            text: "Strict temperature control and humidity regulation to maintain optimal thermal environment for premature and critically ill newborns.",
          },
          {
            title: "Continuous Monitoring",
            text: "Real-time monitoring of vital signs, oxygen saturation, blood pressure, and other critical parameters throughout transport.",
          },
        ],
      },
    ],
  },
  {
    slug: "paediatric-medical-transport-service",
    name: "Paediatric Medical Transport",
    icon: "child",
    excerpt: "Ashoka Rescue Medical Transports offers comprehensive transportation services for paediatric patients through air ambulance, commercial stretcher, train and road ambulance.",
    image: images.services.paediatric,
    hero: {
      title: "Paediatric Medical Transport",
      subtitle: "Ashoka Rescue Medical Transports offers comprehensive transportation services for paediatric patients.",
    },
    meta: {
      title: "Paediatric Medical Transport Service - Safe Care",
      description: "Reliable paediatric medical transport service with expert doctors and advanced equipment ensuring safe, comfortable, and timely transfer for children.",
    },
    content: [
      { type: "heading", text: "Paediatric Medical Transport" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports offers comprehensive transportation services for paediatric patients through various means such as air ambulance, commercial stretcher, train ambulance, road ambulance, both domestically and internationally. The transportation of paediatric patients requires specialized expertise due to unique anatomical and physiological considerations, necessitating a proficient medical team comprising critical care paediatricians, paediatric nurses, and specialized paediatric ICU equipment. Ashoka Rescue is dedicated to paediatric air ambulance and intensive care transport, with a primary focus on safety and delivering top-tier medical services. Our paediatric medical staff and nurses are equipped with cutting-edge medical technology, including incubators, ventilators, cardiac monitors, perfusers, video laryngoscopes, vein finding systems, mobile blood gas analysers, and oxygen supply to ensure the highest quality care. We take pride in our 24-hour rapid response services that guarantee prompt and seamless door-to-door transportation for paediatric patients.",
      },
      { type: "heading", text: "Comprehensive paediatric transport with child-focused care" },
      {
        type: "features",
        items: [
          {
            title: "Pediatric Specialists",
            text: "Board-certified pediatricians, PICU nurses, and child life specialists trained in pediatric emergency care and transport medicine.",
          },
          {
            title: "Age-Appropriate Equipment",
            text: "Pediatric-sized medical equipment, monitors, ventilators, and supplies suitable for infants, children, and adolescents.",
          },
          {
            title: "Family-Centered Care",
            text: "We accommodate family members when possible and provide emotional support to reduce stress for both patients and families.",
          },
          {
            title: "Comfort and Safety",
            text: "Child-friendly environment with toys, comfort items, and distraction techniques to reduce anxiety during transport.",
          },
        ],
      },
    ],
  },
  {
    slug: "transporting-kidney-failure-patients",
    name: "Transporting Kidney Failure Patients",
    icon: "kidney",
    excerpt: "Ashoka Rescue Medical Transports specializes in transporting patients with kidney failure, necessitating dialysis or kidney transplants, including those undergoing peritoneal dialysis.",
    image: images.services.kidney,
    hero: {
      title: "Transporting Kidney Failure Patients",
      subtitle: "Portable dialysis, a nephrologist and essential ICU apparatus for long-distance travel.",
    },
    meta: {
      title: "Transporting Kidney Failure Patients - Safe Transfers",
      description: "Expert service for transporting kidney failure patients with medical supervision, advanced care, and safe hospital-to-hospital transfer support.",
    },
    content: [
      { type: "heading", text: "Transporting Kidney Failure Patients" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports specializes in transporting patients with kidney failure, necessitating dialysis or kidney transplants, including those undergoing peritoneal dialysis (PD), for long-distance travel.",
      },
      {
        type: "paragraph",
        text: "Our services encompass a portable dialysis unit equipped with critical care, a nephrologist, skilled kidney dialysis technicians, and all essential ICU apparatus.",
      },
      {
        type: "paragraph",
        text: "In cases of kidney emergencies, Ashoka Rescue Medical Transports offers various transportation choices for patients:",
      },
      {
        type: "list",
        items: [
          "Air Ambulance",
          "Commercial Airline Stretcher",
          "Commercial Airline Business Class",
          "Train Ambulance",
          "Road Ambulance",
        ],
      },
      {
        type: "paragraph",
        text: "Each transportation option is designed to provide secure and specialized care tailored to the individual medical requirements of the patient.",
      },
    ],
  },
  {
    slug: "transporting-critical-patients-with-advanced-life-saving-equipment",
    name: "Transporting Critical Patients with Advanced Life-Saving Equipment",
    icon: "activity",
    excerpt: "Ashoka Rescue Medical Transports specialize in the transportation of critically ill patients with compromised vital hemodynamic parameters.",
    image: images.services.criticalCare,
    gallery: "roadAmbulance",
    hero: {
      title: "Transporting Critical Patients",
      subtitle: "Advanced life-saving equipment and critical care teams for patients with compromised vital parameters.",
    },
    meta: {
      title: "Transporting Critical Patients - Advanced Life Support",
      description: "Safe and efficient transport for critical patients with advanced life-saving equipment, expert medical teams, and continuous ICU-level monitoring.",
    },
    content: [
      {
        type: "heading",
        text: "Transporting Critical Patients with Advanced Life-Saving Equipment",
      },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports specialize in the transportation of critically ill patients with compromised vital hemodynamic parameters. Our comprehensive services include:",
      },
      {
        type: "list",
        items: [
          "Oxygen therapy",
          "Cardiac monitoring",
          "Ventilator and BiPAP support",
          "Syringe pumps for medication delivery",
          "Suction equipment",
          "Peritoneal dialysis machines",
          "High-flow nasal cannula (HFNC)",
          "Infant incubators",
          "Intra-aortic balloon pump (IABP)",
          "External pacemaker",
          "ECMO (Extracorporeal membrane oxygenation)",
          "Temporary pacemaker placement",
          "Invasive blood pressure monitoring",
        ],
      },
      {
        type: "paragraph",
        text: "We uphold the highest standards of care during transit to enhance patient outcomes.",
      },
    ],
  },
  {
    slug: "heart-and-lung-transplant-patient-shifting",
    name: "Heart and lung transplant patient shifting",
    icon: "lungs",
    excerpt: "Ashoka Rescue Medical Transports patients globally for heart and lung transplants using air ambulances, commercial stretchers, train ambulances, and road ambulances.",
    image: images.airAmbulance.icuCabin,
    gallery: "airAmbulance",
    hero: {
      title: "Heart and Lung Transplant Patient Shifting",
      subtitle: "Domestic and international transfers with ECMO, ventilators, BiPAP and oxygen — lying or seated.",
    },
    meta: {
      title: "Heart and Lung Transplant Patient Shifting Service",
      description: "Safe heart and lung transplant patient shifting with expert medical teams, ICU-level support, and advanced transport for critical care transfers.",
    },
    content: [
      { type: "heading", text: "Heart and Lung Transplant Patient Shifting" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports patients globally for heart and lung transplants using air ambulances, commercial stretchers, train ambulances, and road ambulances equipped with ECMO, ventilators, BI-PAP, and oxygen in both lying and sitting positions. Ashoka Rescue specializes in transporting patients with interstitial lung disease in business class, seated positions with oxygen supplementation, providing comprehensive bedside-to-bedside assistance.",
      },
      {
        type: "paragraph",
        text: "Ashoka Rescue has extensive expertise in long-distance patient transportation for lung and heart transplants, spanning domestic and international routes. This service caters particularly to critically ill individuals suffering from end-stage cardiac and respiratory failure who require urgent transport. For patients with severe left ventricular failure or end-stage cardiomyopathy, cardiac transplantation transport is considered, with ECMO being utilized to enhance oxygenation and reduce cardiac strain during transit.",
      },
      {
        type: "paragraph",
        text: "Frequently asked questions by patients often center around the logistics of lung transplant transportation. Air travel poses challenges for patients with advanced lung disease due to high-altitude hypoxia. To address this, patients receive necessary oxygen supplementation during flights and are closely monitored using portable oximeters, accompanied by critical care physicians. Through meticulous preparation, adequate oxygen provision, oximetric monitoring, and medical supervision, nearly all patients with severe lung disease can safely undertake essential journeys.",
      },
      {
        type: "paragraph",
        text: "A thorough pre-flight medical evaluation is essential to assess the suitability of pulmonary disease patients for air travel, including the determination of supplemental oxygen requirements or advisability of alternative travel arrangements. Patients with pulmonary diseases exhibiting pre-flight arterial oxygen tension below 70 mmHg or oximetry saturation below 92% necessitate supplemental oxygen during air travel.",
      },
      {
        type: "paragraph",
        text: "Our medical team is proficient in managing patients with interstitial lung disease (ILD), understanding their unique vulnerabilities, sensitivities, and varying oxygen demands even under minimal exertion. Supplemental oxygen remains pivotal in the comprehensive care of hypoxemic ILD patients.",
      },
      {
        type: "paragraph",
        text: "During bed-to-bed transportation, our Ashoka Rescue Medical Transports team maintains SPO2 levels above 90%. We conduct thorough evaluations of all ILD patients embarking on journeys or undergoing lung transplants.",
      },
      {
        type: "paragraph",
        text: "Our team has successfully transported patients globally for heart and lung transplants using air ambulances and commercial airlines. Our overarching mission is to minimize travel expenses for patients, ensuring financial accessibility. Urgent cases requiring immediate lung or heart transplants and feasible financial means are accommodated with air ambulances, while planned transplant cases on waiting lists are encouraged to utilize cost-effective commercial airline transfers. Patients are transported in business class or on stretchers, supported with oxygen, Bi-PAP, ventilators, or ECMO as required.",
      },
    ],
  },
  {
    slug: "cancer-patients-transportation",
    name: "Cancer Patients Transportation",
    icon: "ribbon",
    excerpt: "Ashoka Rescue Medical Transports specializes in providing comprehensive medical assistance and transportation services via air ambulance, commercial stretcher, business class, train and road ambulance.",
    image: images.hero.cabinCare,
    hero: {
      title: "Cancer Patients Transportation",
      subtitle: "“No individual should be denied life-saving cancer treatment due to transportation constraints.”",
    },
    meta: {
      title: "Cancer Patients Transportation Service - Safe Transfers",
      description: "Compassionate cancer patients transportation service with medical escorts and safe, comfortable hospital-to-hospital transfers tailored to patient needs.",
    },
    content: [
      { type: "heading", text: "Cancer Patients Transportation" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports specializes in providing comprehensive medical assistance and transportation services via air ambulance, commercial stretcher, business class, train ambulance, and road ambulance tailored to meet the specific needs of each patient.",
      },
      {
        type: "paragraph",
        text: "Ashoka Rescue assists cancer patients by addressing critical transportation challenges, particularly concerning those managing chemotherapy, radiotherapy, and surgical treatments, as well as individuals with compromised immune systems. Our services adhere strictly to established safety protocols throughout patient care.",
      },
      {
        type: "paragraph",
        text: "Our primary mission at Ashoka Rescue Medical Transports is to eliminate transportation barriers that may impede access to essential healthcare services. Our guiding principle asserts that \"No individual should be denied life-saving cancer treatment due to transportation constraints.\" We are committed to minimizing transportation costs and alleviating travel-related stress through meticulous pre-planning and preparation. Prior to departure, we ensure close coordination with both patients and their medical providers.",
      },
      {
        type: "paragraph",
        text: "Throughout the journey, our team provides unwavering physical, psychological, and medical support, prioritizing patient hygiene and offering nourishment prepared under strict infection control protocols.",
      },
      {
        type: "paragraph",
        text: "For patients undergoing treatment, it may be possible to schedule travel between therapy sessions. We strongly advise consulting with your oncologist to determine the optimal timing for travel, ensuring all necessary supplies and dietary requirements are addressed.",
      },
    ],
  },
  {
    slug: "cost-of-transporting-a-patient-from-india-to-canada",
    name: "Cost of Transporting a Patient from India to Canada",
    icon: "map",
    excerpt: "Medical evacuation from India to Canada, the United States, Europe, Africa, the UAE and vice versa — by air ambulance or commercial stretcher with medical escorts.",
    image: images.hero.beyondBorders,
    gallery: "commercialStretcher",
    hero: {
      title: "Cost of Transporting a Patient from India to Canada",
      subtitle: "Air ambulances and commercial stretchers with medical escorts, at an affordable cost.",
    },
    meta: {
      title: "Cost of Transporting a Patient India to Canada",
      description: "Know the cost of transporting a patient from India to Canada with safe medical escorts, air ambulance options, and customized medical flight packages.",
    },
    content: [
      { type: "heading", text: "Medical Transport from India to Canada" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports Air Ambulance Medical Escorts India facilitates medical evacuation from India to Canada, the United States, Europe, African countries, the UAE, and vice versa, utilizing both air ambulances and commercial stretchers with medical escorts. We provide medical escort services from India to international destinations with a team of qualified and experienced professionals, equipped with the latest medical technology, all at an affordable cost.",
      },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports Air Ambulance Medical Escorts India operates globally in partnership with other medical escort companies, sharing expertise and resources. We provide medical escort services for transporting patients to destinations worldwide, including Canadian cities such as Toronto, Vancouver, Montreal, Edmonton, Calgary, and all other locations with airport facilities. For cities lacking airport infrastructure, we utilize ground ambulance services to transfer patients to the nearest international airport. We offer cost-effective solutions for patients, regardless of whether they have travel insurance.",
      },
      {
        type: "subheading",
        text: "Patient Transport Options Between India and Various Destinations",
      },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports Air Ambulance Medical Escorts India offer patient transport services between India and countries in the United States, the European Union (including France, Germany, Australia, Italy, Belgium, Greece, Hungary, Ireland, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, the Republic of Cyprus, Czech Republic, Finland, and others).",
      },
      { type: "subheading", text: "Patient Transport Services from the United States" },
      {
        type: "paragraph",
        text: "Ashoka Rescue Medical Transports Air Ambulance Medical Escorts India have facilitated patient transport from numerous cities in the United States, including New York, Chicago, Los Angeles, Houston, San Francisco, San Jose, Phoenix, Dallas, Philadelphia, San Antonio, San Diego, Charlotte, Seattle, Las Vegas, Nashville, Oklahoma City, Columbus, Fort Worth, Jacksonville, Boston, Denver, Indianapolis, El Paso, Tucson, Milwaukee, Detroit, Miami, Washington, Virginia, Florida, Texas, Kansas, and more. Ashoka Rescue Medical Transports has extensive experience in transporting patients between India and neighbouring countries, as well as vice versa.",
      },
    ],
  },
  {
    slug: "air-ambulance-services-in-india",
    name: "Air Ambulance Services in India",
    icon: "plane",
    excerpt: "Reliable air ambulance services in India for emergency transportation, critical care transfers, and rapid access to advanced hospitals.",
    image: images.airAmbulance.helicopterEvac,
    gallery: "airAmbulance",
    hero: {
      title: "Air Ambulance Services in India",
      subtitle: "ICU-equipped aircraft, experienced medical teams, and complete bedside-to-bedside coordination across India and worldwide.",
    },
    meta: {
      title: "Air Ambulance Services in India | Ashoka Rescue",
      description: "Reliable air ambulance services in India for emergency transportation, critical care transfers, and rapid access to advanced hospitals.",
    },
    content: [
      { type: "heading", text: "Reliable emergency transportation when every second matters" },
      {
        type: "paragraph",
        text: "Every second counts in a medical emergency. Air ambulance services in India have become a lifeline for saving lives when patients need to transfer over long distances, especially urgently or when road transport is not faster. These aircraft, designed for air ambulance services, are equipped with specialized medical devices and staffed by trained personnel to facilitate the safe and rapid transport of patients in critical condition.",
      },
      {
        type: "paragraph",
        text: "Today, the demand for air ambulances in India has increased significantly due to the need for faster medical assistance, especially in remote areas or during critical medical emergencies. These services also allow for rapid access to sophisticated medical facilities located in the major cities.",
      },
      { type: "subheading", text: "What is an Air Ambulance?" },
      {
        type: "paragraph",
        text: "An air ambulance is a specially equipped aircraft used for transporting patients who require urgent medical care. It functions like a flying intensive care unit (ICU), ensuring that patients receive continuous medical monitoring during the journey.",
      },
      {
        type: "paragraph",
        text: "A typical air ambulance in India consists of the most up-to-date life-support system and a qualified medical crew that manages emergencies with a patient en route to the most appropriate hospital. These critical services are often provided through emergency medical transportation, which ensures rapid response, advanced medical equipment, and highly trained professionals for safe patient transfers.",
      },
      { type: "subheading", text: "Key features of Air Ambulance Services" },
      {
        type: "paragraph",
        text: "Professional air ambulance services in India provide comprehensive medical care during transport. Some important features include:",
      },
      {
        type: "list",
        items: [
          "Advanced life-support medical equipment",
          "ICU setup inside the aircraft",
          "Experienced doctors and paramedics on board",
          "24/7 emergency availability",
          "Fast dispatch and swift transfer of the patient",
          "Bed-to-bed patient transfer assistance",
          "Coordination with hospitals and medical teams",
        ],
      },
      {
        type: "paragraph",
        text: "These systems guarantee the patient never misses their medicine throughout the journey.",
      },
      { type: "subheading", text: "Importance of Air Ambulance in Medical Emergencies" },
      {
        type: "paragraph",
        text: "Medical emergencies such as severe trauma, organ failure, cardiac arrest, or critical accidents often require immediate transportation to specialized hospitals. In such situations, an air ambulance in Delhi or other major cities becomes a lifesaving solution. Here is why air ambulance services are necessary:",
      },
      {
        type: "features",
        items: [
          { title: "Faster Transportation", text: "Air travel saves more time than road travel." },
          {
            title: "Access to Specialized Hospitals",
            text: "Patients can be quickly transferred to hospitals that have newer and more sophisticated treatment options.",
          },
          {
            title: "Support for Remote Areas",
            text: "Looking after the patients who live in rural areas is a focus point.",
          },
          {
            title: "Ongoing Medical Support",
            text: "Doctors and paramedics stay with the patient for the entire trip.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "For these advantages, air ambulance services in India have become an indispensable part of modern emergency healthcare systems.",
      },
      { type: "subheading", text: "Air Ambulance Service in Delhi" },
      {
        type: "paragraph",
        text: "Delhi is home to some of the biggest medical hubs in India with numerous multi-speciality hospitals and advanced treatment options. Hence, patients from all regions of India require air ambulance service in Delhi for quick medical transfer. There are many situations in which an air ambulance is required, including:",
      },
      {
        type: "list",
        items: [
          "Emergency medical evacuation",
          "Inter-hospital patient transfer",
          "Organ transplant transportation",
          "Critical care patient relocation",
          "Accident or trauma emergencies",
        ],
      },
      {
        type: "paragraph",
        text: "These services ensure that patients do not have to wait until the right medical facility is accessible.",
      },
      { type: "subheading", text: "Medical Equipment Available in Air Ambulances" },
      {
        type: "paragraph",
        text: "Air ambulance services in India nowadays are equipped with the latest medical equipment that provides critical care when transferring patients from one hospital to another. Common equipment available onboard includes:",
      },
      {
        type: "list",
        items: [
          "Cardiac monitors",
          "Ventilators",
          "Defibrillators",
          "Infusion pumps",
          "Oxygen support systems",
          "Emergency medicines",
          "Portable ICU setup",
        ],
      },
      {
        type: "paragraph",
        text: "This equipment enables the medical team to stabilize patients and handle emergencies in-flight.",
      },
      { type: "subheading", text: "Who Can Use Air Ambulance Services?" },
      {
        type: "paragraph",
        text: "Air ambulance in India is most commonly used by patients requiring transportation quickly to receive medical care. These services are suitable for:",
      },
      {
        type: "list",
        items: [
          "Critically ill patients",
          "Accident or trauma victims",
          "Patients being transferred for an organ transplant",
          "Neonatal and pediatric emergencies",
          "Long-distance medical transfers",
          "Patients who require specialized treatment in a different city",
        ],
      },
      {
        type: "paragraph",
        text: "Air ambulance services in India have become a vital supporting service that rescues patients by timely giving them effective treatment through fast and reliable medical transportation.",
      },
      { type: "subheading", text: "Wrapping Up" },
      {
        type: "paragraph",
        text: "As the need for healthcare expands like never before, air ambulances in India are becoming increasingly important. Offering the lifeblood for patients in medical emergencies, these services consist of advanced medical equipment, trained professionals and rapid response.",
      },
      {
        type: "paragraph",
        text: "Whether it is an urgent transfer from a remote area or a critical patient needing specialized treatment in a metropolitan hospital, Charter Air Ambulance Services in India ensures quick and safe patient transfers. By reducing travel time and providing continuous medical care, air ambulances in Delhi and across the country play a crucial role in modern emergency medical services.",
      },
    ],
  },
  {
    slug: "emergency-medical-transportation-services",
    name: "Emergency Medical Transportation Services",
    icon: "siren",
    excerpt: "Reliable emergency medical transportation services in India with trained professionals, advanced equipment, and coordinated patient transfers.",
    image: images.roadAmbulance.fleetDusk,
    gallery: "roadAmbulance",
    hero: {
      title: "Emergency Medical Transport",
      subtitle: "Reliable emergency and non-emergency medical transportation with trained professionals, advanced equipment, and coordinated patient care.",
    },
    meta: {
      title: "Emergency Medical Transportation Services | Ashoka Rescue",
      description: "Reliable emergency medical transportation services in India with trained professionals, advanced equipment, and coordinated patient transfers.",
    },
    content: [
      {
        type: "heading",
        text: "Emergency Medical Transportation Services: Reliable Support During Critical Situations",
      },
      {
        type: "paragraph",
        text: "In life and death situations, getting to the correct hospital quickly can make all the difference in saving lives. One such service is emergency medical transportation, which comes to the rescue when patients need to be transported immediately. Their purpose is to deliver professional healthcare during the transportation of patients to medical facilities.",
      },
      {
        type: "paragraph",
        text: "In India, the need for medical transportation has increased sharply as it requires rapid and reliable means of reaching hospitals in case of emergencies or scheduled medical visits. These services are pivotal to modern healthcare.",
      },
      { type: "subheading", text: "What is Emergency Medical Transportation?" },
      {
        type: "paragraph",
        text: "Emergency medical transportation refers to specialized services that move a patient from one location to another with medical oversight and care. These are used when a patient’s medical condition requires immediate treatment in transit.",
      },
      {
        type: "paragraph",
        text: "Ambulances come with qualified medical professionals, up-to-date machinery, and organized processes involving the patient to guarantee safety from beginning till end. These transfers may be provided by road, air, or rail transit based on the pickup and drop-off range and the need for speed, including specialized options such as Charter Air Ambulance Services in India for rapid and critical long-distance patient transport.",
      },
      {
        type: "paragraph",
        text: "Non emergency medical transportation services are also for patients who do not require transfer under life-threatening conditions, as well as those needing medical assistance during their transport.",
      },
      { type: "subheading", text: "Types of Medical Transportation Services" },
      {
        type: "paragraph",
        text: "Different types of medical transportation in India are available to meet the needs of various patients.",
      },
      {
        type: "features",
        items: [
          {
            title: "Emergency Medical Transport",
            text: "Emergency medical transport is used when immediate medical attention and transfer to a hospital are required. These vehicles have life-support equipment and trained doctors as well as paramedics. Common scenarios:",
            items: [
              "Severe accidents or trauma",
              "Heart attacks or strokes",
              "Critical medical emergencies",
              "Life-threatening injuries",
            ],
          },
          {
            title: "Non Emergency Medical Transportation",
            text: "Specialized transportation solutions for individuals who need to travel to the hospital but do not need emergency medical assistance. Frequently used for:",
            items: [
              "Routine medical appointments",
              "Hospital discharge transportation",
              "Dialysis treatments",
              "Elderly patient transportation",
              "Rehabilitation visits",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "Both the emergency and non-emergency options allow patients to get the medical attention they need without undue delay.",
      },
      { type: "subheading", text: "Key Features of Emergency Medical Transportation Services" },
      {
        type: "paragraph",
        text: "Professional emergency medical transportation services offer a set of capabilities which ensure the safety and comfort of their patients.",
      },
      {
        type: "features",
        items: [
          {
            title: "Advanced Medical Equipment",
            items: [
              "Ventilators for breathing support",
              "Cardiac monitors for heart monitoring",
              "Defibrillators for emergency cardiac care",
              "Oxygen supply systems",
              "Emergency medicine kits",
            ],
          },
          {
            title: "Trained Medical Professionals",
            items: [
              "Skilled doctors and paramedics",
              "Continuous monitoring of patient condition",
              "Immediate response to medical emergencies",
            ],
          },
          {
            title: "Fast and Organized Response",
            items: [
              "24/7 availability",
              "Rapid dispatch of medical vehicles",
              "Streamlined admission process to hospitals",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "This helps to provide medical transportation seamlessly and safely in India.",
      },
      { type: "subheading", text: "Importance of Emergency Medical Transportation" },
      {
        type: "paragraph",
        text: "Emergency medical transportation services play a vital role in facilitating timely access to care for patients. In many emergency scenarios, transport delays can exacerbate a patient’s condition.",
      },
      {
        type: "paragraph",
        text: "Efficient emergency medical transport services help reduce travel time, provide medical supervision, and ensure that patients reach the appropriate healthcare facility safely. These services also play an important role in connecting remote areas with advanced hospitals in major cities.",
      },
      {
        type: "paragraph",
        text: "Moreover, non emergency medical transportation services enable those patients who require consistent treatments or follow-up visits to reach the venue safely and ensure they receive the required support.",
      },
      { type: "subheading", text: "Wrapping Up" },
      {
        type: "paragraph",
        text: "The healthcare system relies on consistent patient transportation. Emergency medical transportation acts as a bridge to ensure that people with serious medical conditions reach hospitals in time and safely. Emergency medical transport has become an integral part of contemporary healthcare, with trained medical personnel, advanced equipment, and coordinated response systems.",
      },
      {
        type: "paragraph",
        text: "With more and more people gaining access to healthcare facilities in the country, there's an increasing need for reliable medical transportation in India. Whether it is patient transport for urgent emergency medical transportation or supportive non-emergency medical transport services, options such as a train ambulance service in India provide a dependable and medically equipped solution for long-distance patient transfers while ensuring continuous care throughout the journey.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, count = 3) {
  const index = services.findIndex((service) => service.slug === slug);
  return Array.from({ length: count }, (_, i) => services[(index + i + 1) % services.length]);
}

/** Options offered in the assistance form's service dropdown. */
export const serviceOptions = services
  .filter((service) => !["air-ambulance-services-in-india", "emergency-medical-transportation-services"].includes(service.slug))
  .map((service) => service.name);

/** Services grouped for the navigation menus (desktop mega menu + mobile menu). */
export const serviceMenuGroups: { title: string; slugs: string[] }[] = [
  {
    title: "By air, rail & road",
    slugs: [
      "charter-air-ambulance-service-in-india",
      "air-ambulance-services-in-india",
      "commercial-stretcher-service",
      "business-class-medical-assistance",
      "medical-escort-and-transport",
      "train-ambulance-service-in-india",
      "road-ambulance-service-in-india",
      "emergency-medical-transportation-services",
    ],
  },
  {
    title: "Specialised patient care",
    slugs: [
      "patient-transfer-on-ecmo",
      "transporting-critical-patients-with-advanced-life-saving-equipment",
      "heart-and-lung-transplant-patient-shifting",
      "neonate-medical-transport-service",
      "paediatric-medical-transport-service",
      "transporting-kidney-failure-patients",
      "cancer-patients-transportation",
    ],
  },
  {
    title: "Planning & guides",
    slugs: ["medical-tourism-india", "cost-of-transporting-a-patient-from-india-to-canada"],
  },
];

/** Menu groups resolved to full service objects; any service not listed falls into the last group. */
export const serviceMenu = (() => {
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const listed = new Set(serviceMenuGroups.flatMap((g) => g.slugs));
  const unlisted = services.filter((s) => !listed.has(s.slug));
  return serviceMenuGroups.map((group, i) => ({
    title: group.title,
    items: [
      ...group.slugs.map((slug) => bySlug.get(slug)).filter((s): s is Service => Boolean(s)),
      ...(i === serviceMenuGroups.length - 1 ? unlisted : []),
    ],
  }));
})();
