export type RiskLevel = "Low" | "Moderate" | "High" | "Severe";

export type FloodLocation = {
  id: string;
  name: string;
  state: string;
  risk: RiskLevel;
  rainfall24h: number; // mm
  rainfallForecast: number; // mm next 24h
  riverLevel: number; // percent of danger mark
  drainageScore: number; // 0-100, higher is better
  explanation: string;
  recommendations: string[];
  // position on the stylised map, percentage based
  map: { top: number; left: number };
};

export const RISK_ORDER: RiskLevel[] = ["Low", "Moderate", "High", "Severe"];

export const LOCATIONS: FloodLocation[] = [
  {
    id: "delhi",
    name: "Delhi",
    state: "NCT of Delhi",
    risk: "Moderate",
    rainfall24h: 48,
    rainfallForecast: 62,
    riverLevel: 74,
    drainageScore: 55,
    explanation:
      "Simulated monsoon rainfall is above the seasonal average and the Yamuna is approaching three-quarters of its danger mark. Low-lying colonies near the floodplain and underpasses are the first to waterlog.",
    recommendations: [
      "Avoid underpasses and subways during heavy showers",
      "Keep vehicles parked on higher ground overnight",
      "Track civic drainage advisories before commuting",
    ],
    map: { top: 26, left: 38 },
  },
  {
    id: "guwahati",
    name: "Guwahati",
    state: "Assam",
    risk: "Severe",
    rainfall24h: 186,
    rainfallForecast: 140,
    riverLevel: 97,
    drainageScore: 32,
    explanation:
      "Simulated continuous heavy rain over the Brahmaputra basin has pushed river levels to the danger mark. Hill runoff plus saturated soil means flash flooding can develop within a couple of hours.",
    recommendations: [
      "Move valuables and documents to the highest floor",
      "Prepare a go-bag and keep phones fully charged",
      "Identify the nearest relief camp and a safe route to it",
      "Do not attempt to cross flowing water on foot or by vehicle",
    ],
    map: { top: 33, left: 78 },
  },
  {
    id: "patna",
    name: "Patna",
    state: "Bihar",
    risk: "High",
    rainfall24h: 122,
    rainfallForecast: 95,
    riverLevel: 88,
    drainageScore: 38,
    explanation:
      "Simulated upstream releases combined with local rainfall have raised the Ganga close to warning level. Dense, low-lying wards with limited pumping capacity may retain water for several days.",
    recommendations: [
      "Store 3 days of drinking water and dry food",
      "Shift electrical appliances above expected water level",
      "Keep emergency contacts written on paper as backup",
    ],
    map: { top: 38, left: 62 },
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    risk: "High",
    rainfall24h: 158,
    rainfallForecast: 110,
    riverLevel: 71,
    drainageScore: 46,
    explanation:
      "Simulated intense rainfall coincides with a high tide window, so storm-water outfalls drain slowly. Expect waterlogging on arterial roads and possible local train disruption.",
    recommendations: [
      "Plan travel outside the high-tide window",
      "Avoid coastal promenades and open drains",
      "Keep a torch and power bank ready for outages",
    ],
    map: { top: 62, left: 33 },
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    risk: "Low",
    rainfall24h: 12,
    rainfallForecast: 20,
    riverLevel: 34,
    drainageScore: 68,
    explanation:
      "Simulated rainfall is light and lakes are well below capacity. Risk is currently limited to brief street-level pooling in older neighbourhoods after a sharp shower.",
    recommendations: [
      "Clear balcony and terrace drains before the next spell",
      "Review your household emergency checklist",
      "Save local helpline numbers offline",
    ],
    map: { top: 76, left: 48 },
  },
];

export function getLocation(id: string) {
  return LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];
}

export const riskStyles: Record<
  RiskLevel,
  { badge: string; dot: string; text: string; ring: string; bar: string }
> = {
  Low: {
    badge: "bg-risk-low/15 text-risk-low border-risk-low/30",
    dot: "bg-risk-low",
    text: "text-risk-low",
    ring: "ring-risk-low/40",
    bar: "bg-risk-low",
  },
  Moderate: {
    badge: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/30",
    dot: "bg-risk-moderate",
    text: "text-risk-moderate",
    ring: "ring-risk-moderate/40",
    bar: "bg-risk-moderate",
  },
  High: {
    badge: "bg-risk-high/15 text-risk-high border-risk-high/30",
    dot: "bg-risk-high",
    text: "text-risk-high",
    ring: "ring-risk-high/40",
    bar: "bg-risk-high",
  },
  Severe: {
    badge: "bg-risk-severe/15 text-risk-severe border-risk-severe/30",
    dot: "bg-risk-severe",
    text: "text-risk-severe",
    ring: "ring-risk-severe/40",
    bar: "bg-risk-severe",
  },
};

export type DemoAlert = {
  id: string;
  locationId: string;
  title: string;
  risk: RiskLevel;
  issued: string;
  action: string;
};

export const DEMO_ALERTS: DemoAlert[] = [
  {
    id: "a1",
    locationId: "guwahati",
    title: "Brahmaputra flowing above danger mark",
    risk: "Severe",
    issued: "Today, 06:40",
    action: "Evacuate low-lying wards to designated relief camps immediately.",
  },
  {
    id: "a2",
    locationId: "mumbai",
    title: "Heavy rainfall with high tide overlap",
    risk: "High",
    issued: "Today, 05:15",
    action: "Avoid non-essential travel between 11:00 and 15:00.",
  },
  {
    id: "a3",
    locationId: "patna",
    title: "Ganga nearing warning level",
    risk: "High",
    issued: "Yesterday, 21:30",
    action: "Shift livestock and valuables to higher ground.",
  },
  {
    id: "a4",
    locationId: "delhi",
    title: "Waterlogging likely at underpasses",
    risk: "Moderate",
    issued: "Yesterday, 18:05",
    action: "Use alternate routes and avoid stalled-vehicle zones.",
  },
  {
    id: "a5",
    locationId: "chennai",
    title: "Light showers, no flooding expected",
    risk: "Low",
    issued: "Yesterday, 09:00",
    action: "No action needed. Keep drains clear as a precaution.",
  },
];

export const ASSISTANT_QA: { id: string; q: string; a: string[] }[] = [
  {
    id: "warning",
    q: "What should I do during a flood warning?",
    a: [
      "Move to the highest safe floor or a pre-identified higher-ground shelter.",
      "Switch off mains electricity and gas before water enters the building.",
      "Keep your phone charged and carry a power bank; save battery for emergencies.",
      "Never walk or drive through moving water — 15 cm can knock you off your feet.",
      "Tell a relative outside the area where you are going before you move.",
    ],
  },
  {
    id: "kit",
    q: "What should I pack in an emergency kit?",
    a: [
      "Drinking water: at least 3 litres per person per day for three days.",
      "Dry, ready-to-eat food and a manual can opener.",
      "First aid kit plus a week of any prescription medicines.",
      "Torch, spare batteries, power bank and a whistle.",
      "Documents in a waterproof pouch, some cash, and a change of clothes.",
    ],
  },
  {
    id: "family",
    q: "How can I prepare my family?",
    a: [
      "Agree on one meeting point inside your neighbourhood and one outside it.",
      "Write emergency numbers on paper — networks and phones can fail.",
      "Teach everyone how to shut off electricity and water safely.",
      "Plan for children, elderly members, people with disabilities and pets.",
      "Rehearse the evacuation route once before the monsoon season.",
    ],
  },
  {
    id: "avoid",
    q: "What should I avoid during flooding?",
    a: [
      "Do not cross flooded roads, bridges or causeways — depth is deceptive.",
      "Stay away from fallen power lines, poles and submerged electrical points.",
      "Avoid drinking tap water until authorities declare it safe.",
      "Do not return home until officials confirm the area is clear.",
      "Do not spread unverified alerts; rely on official bulletins.",
    ],
  },
  {
    id: "after",
    q: "What should I do after the water recedes?",
    a: [
      "Check for structural damage before re-entering a building.",
      "Boil or purify all drinking water until supply is declared safe.",
      "Photograph damage for insurance or relief claims.",
      "Dry and disinfect surfaces to prevent mould and water-borne disease.",
      "Watch for snakes and debris in silt-covered areas.",
    ],
  },
];

export const CHECKLIST_ITEMS = [
  { id: "water", label: "Drinking water", hint: "3 litres per person per day, for 3 days" },
  { id: "firstaid", label: "First aid kit", hint: "Bandages, antiseptic, prescription medicines" },
  { id: "flashlight", label: "Flashlight", hint: "Torch with spare batteries or a power bank" },
  { id: "documents", label: "Important documents", hint: "IDs, insurance, bank papers in a waterproof pouch" },
  { id: "contacts", label: "Emergency contacts", hint: "Written on paper, not only on your phone" },
];
