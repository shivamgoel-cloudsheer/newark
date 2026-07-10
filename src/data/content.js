// Central content store — real facts sourced from RESEARCH.md.
// Case studies other than Singh Tower are illustrative samples to be
// replaced with real client projects before launch (sample: true).

export const company = {
  name: 'Newark Fire Sprinkler Corp.',
  shortName: 'Newark Fire Sprinkler',
  tagline: 'Total Fire Protection, Tailored to You',
  hero: 'Expertly Designed, Installed, and Maintained Fire Safety Systems You Can Rely On',
  phone: '(973) 817-8114',
  phoneHref: 'tel:+19738178114',
  email: 'Sales@Newarkfiresprinkler.com',
  address: '4 Libella Ct, Newark, NJ 07105',
  permit: 'NJ DFS Permit #P01570',
  permitClass: 'Class C2 — Fire Sprinkler Systems',
  serviceArea: 'Serving all of New Jersey',
  experience: '30+ years of combined fire protection leadership',
  portal: 'https://payments.coretechsolutions.app/',
}

const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  heroIndustrial: u('photo-1504328345606-18bbc8c9d7d1', 1600),
  heroCorporate: u('photo-1486406146926-c627a92ad1ab', 1600),
  engineer: u('photo-1581094794329-c8112a89af12'),
  engineerAtWork: u('photo-1581092160562-40aa08e78837'),
  engineerWoman: u('photo-1581091226825-a6a2a5aee158'),
  warehouse: u('photo-1553413077-190dd305871c'),
  warehouseForklift: u('photo-1586528116311-ad8dd3c8310d'),
  buildingWhite: u('photo-1487958449943-2429e8be8625'),
  buildingGlass: u('photo-1449157291145-7efd050a4d0e'),
  cityDark: u('photo-1477959858617-67f85cf4f1df', 1800),
  construction: u('photo-1541888946425-d81bb19240f5'),
  blueprint: u('photo-1503387762-592deb58ef4e'),
  planningDesk: u('photo-1454165804606-c3d57bc86b40'),
  team: u('photo-1521737604893-d14cc237f11d'),
  meeting: u('photo-1556761175-b413da4baf72'),
  interior: u('photo-1497366216548-37526070297c'),
  handshake: u('photo-1560518883-ce09059eeffa'),
  industrialWorker: u('photo-1581094271901-8022df4466f9'),
  firefighter: u('photo-1523419409543-a5e549c1faa8'),
  skyline: u('photo-1494522855154-9297ac14b55f', 1800),
}

export const marqueeItems = [
  'NJ DFS Permit #P01570',
  'NICET-Certified Technicians',
  'NFPA 13 Design',
  'NFPA 25 Inspections',
  'OSHA Compliant',
  'ICC Standards',
  'Licensed · Bonded · Insured',
  '24/7 Emergency Dispatch',
  'In-House Engineering',
  'Serving All of New Jersey',
]

export const process = [
  {
    n: '01',
    title: 'Survey & assess',
    desc: 'A NICET-certified tech walks your building, reviews existing systems and pulls the code requirements for your occupancy.',
  },
  {
    n: '02',
    title: 'Engineer & quote',
    desc: 'Our in-house design team produces hydraulic calculations and a fixed, line-itemed proposal. No mystery pricing.',
  },
  {
    n: '03',
    title: 'Install or service',
    desc: 'Field crews execute to the drawing — nights and phased work available so your operation never stops.',
  },
  {
    n: '04',
    title: 'Certify & file',
    desc: 'We test, commission and file the state forms with your fire official within NJ’s 5-business-day deadline. You get the paper trail.',
  },
]

export const faqs = [
  {
    q: 'How often does New Jersey require sprinkler inspections?',
    a: 'On the NFPA 25 cycle: gauges and valves weekly/monthly, waterflow alarm devices quarterly, a full system inspection annually, and internal pipe inspections every 5 years. Your local fire official can require more depending on occupancy.',
  },
  {
    q: 'What happens if I skip an inspection?',
    a: 'NJ fire code penalties run $500–$5,000 per violation per day, up to $25,000 for serious life-safety violations — plus possible insurance consequences. An inspection contract costs a fraction of one fine.',
  },
  {
    q: 'Can any contractor inspect my sprinkler system?',
    a: 'No. Since 2003 it has been illegal in New Jersey to install, service or inspect fire protection equipment without a Division of Fire Safety business permit. Ours is #P01570 (Class C2 — Fire Sprinkler Systems), verifiable on the state’s public list.',
  },
  {
    q: 'Who files the inspection report?',
    a: 'We do. New Jersey requires records forwarded to your local fire official within five business days of the inspection — filing the state forms is part of every inspection we perform, and you get copies for your records.',
  },
  {
    q: 'Do you handle emergencies?',
    a: 'Yes — leaks, freeze damage, impaired systems, failed heads. The line at (973) 817-8114 is answered 24/7, every day of the year, and we manage impairment paperwork with your fire official.',
  },
]

export const trustBadges = [
  { label: 'NJ Licensed', detail: 'DFS Permit #P01570' },
  { label: 'NICET Certified', detail: 'Certified technicians' },
  { label: 'NFPA Compliant', detail: 'NFPA 13 & 25 standards' },
  { label: 'Fully Insured', detail: 'Licensed, bonded & insured' },
]

export const stats = [
  { value: '30+', label: 'Years of leadership' },
  { value: '2,638', label: 'Heads in one flagship install' },
  { value: '24/7', label: 'Emergency response' },
  { value: '4', label: 'Property types served' },
]

export const services = [
  {
    slug: 'installation',
    icon: 'install',
    title: 'Fire Sprinkler Installation',
    tagline: 'From bare pipe to certified system',
    desc: 'Complete design-build installation for residential, commercial, industrial and mixed-use properties. Our in-house design team engineers every system to NFPA 13 and New Jersey Uniform Construction Code requirements.',
    features: [
      'Residential, commercial & industrial systems',
      'Wet, dry and pre-action configurations',
      'NFPA 13 & NJ UCC compliant engineering',
      'Coordinated shop drawings and permits',
    ],
  },
  {
    slug: 'service-repairs',
    icon: 'wrench',
    title: '24/7 Service & Repairs',
    tagline: 'Emergencies don’t keep office hours',
    desc: 'Round-the-clock emergency response for leaks, freeze damage, impaired systems and failed components. We restore protection fast and document everything for your insurer and fire official.',
    features: [
      '24/7 emergency dispatch',
      'Leak & freeze damage response',
      'Head, valve & pipe replacement',
      'Impairment management & re-certification',
    ],
  },
  {
    slug: 'inspections',
    icon: 'clipboard',
    title: 'Inspections & Compliance',
    tagline: 'NFPA 25 compliance, handled end-to-end',
    desc: 'New Jersey law requires sprinkler systems to be inspected on an NFPA 25 schedule — and reports filed with your local fire official within five business days. We run the whole cycle so you never miss a deadline.',
    features: [
      'Quarterly, annual & 5-year NFPA 25 inspections',
      'State-form reporting, filed for you',
      'Deficiency correction & re-inspection',
      'Compliance calendar & reminders',
    ],
  },
  {
    slug: 'design',
    icon: 'blueprint',
    title: 'Custom Design & Shop Drawings',
    tagline: 'An in-house engineering team, not a subcontractor',
    desc: 'Hydraulically calculated designs, coordinated shop drawings and as-builts produced by our own design department — faster approvals, fewer field conflicts, cleaner installs.',
    features: [
      'Hydraulic calculations & placarding (NJ Form F380)',
      'BIM / CAD coordinated shop drawings',
      'Value engineering on existing designs',
      'Permit-ready submittal packages',
    ],
  },
]

export const caseStudies = [
  {
    slug: 'singh-tower',
    sample: false,
    sector: 'Residential High-Rise',
    title: '301 West Side Avenue, Jersey City',
    summary:
      'Full wet-system design and installation for a 218,028 sq ft residential tower — 2,638 sprinkler heads protecting 202 units and shared amenity spaces.',
    metrics: [
      { value: '218,028', label: 'sq ft protected' },
      { value: '2,638', label: 'sprinkler heads' },
      { value: '202', label: 'residential units' },
    ],
    body: 'Our design team produced fully coordinated shop drawings and hydraulic calculations for all residential floors, amenity levels and parking, then our field crews installed and commissioned the complete system on schedule. The project showcases the full lifecycle we deliver: design, permitting, installation, testing and handover documentation.',
    accent: '#e2543a',
  },
  {
    slug: 'logistics-warehouse',
    sample: true,
    sector: 'Industrial / Warehouse',
    title: 'Port-Area Distribution Center',
    summary:
      'ESFR sprinkler retrofit for a high-piled storage warehouse — protection upgraded without pausing operations.',
    metrics: [
      { value: '96,000', label: 'sq ft retrofitted' },
      { value: '0', label: 'days of downtime' },
      { value: '5-yr', label: 'ITM contract signed' },
    ],
    body: 'Sample case study — replace with a real project. Demonstrates the layout: phased night-shift installation, rack-storage hydraulics, and a recurring inspection contract after handover.',
    accent: '#2b6cb0',
  },
  {
    slug: 'mixed-use-newark',
    sample: true,
    sector: 'Mixed-Use',
    title: 'Downtown Newark Mixed-Use Development',
    summary:
      'Ground-floor retail, four residential floors, one system — designed and installed to keep every occupancy compliant.',
    metrics: [
      { value: '5', label: 'floors protected' },
      { value: '38', label: 'retail & residential spaces' },
      { value: '100%', label: 'first-pass inspection' },
    ],
    body: 'Sample case study — replace with a real project. Demonstrates multi-occupancy zoning, separate control valves per use group, and coordination with alarm contractors.',
    accent: '#b7791f',
  },
  {
    slug: 'restaurant-repair',
    sample: true,
    sector: 'Commercial / Emergency',
    title: 'Overnight Freeze-Damage Response',
    summary:
      'A burst pipe at 2 AM. System drained, repaired, refilled and re-certified before the lunch rush.',
    metrics: [
      { value: '2 AM', label: 'emergency call' },
      { value: '9 hrs', label: 'to full restoration' },
      { value: '24/7', label: 'line that answered' },
    ],
    body: 'Sample case study — replace with a real project. Demonstrates the emergency-response story format: impairment management, fire-watch guidance, and same-day re-certification.',
    accent: '#6b46c1',
  },
]

export const blogPosts = [
  {
    slug: 'nfpa-25-schedule',
    title: 'The NFPA 25 Inspection Schedule, Explained in Plain English',
    date: 'June 12, 2026',
    tags: ['Compliance', 'NFPA 25'],
    excerpt:
      'Weekly gauges, quarterly alarms, annual everything, and the 5-year internal — what New Jersey actually requires, and when.',
    body: [
      ['p', 'If you own or manage a building in New Jersey with a fire sprinkler system, NFPA 25 is the standard that governs how often that system must be inspected, tested and maintained. The state fire code adopts it directly — compliance is not optional.'],
      ['h3', 'The cadence at a glance'],
      ['p', 'Weekly/monthly: control valves verified open and gauges reading normal pressure. Quarterly: waterflow alarm devices and fire department connections tested and inspected. Annually: a full system review — sprinkler heads, piping, hangers, seismic bracing and valves. Every 5 years: internal pipe inspections and obstruction investigations.'],
      ['h3', 'The New Jersey twist'],
      ['p', 'NJ adds its own reporting rule: inspection records must be kept on premises for at least three years AND forwarded to your local fire official within five business days of the inspection. Miss the paperwork and you can be out of compliance even with a healthy system.'],
      ['p', 'A good contractor handles the whole cycle — scheduling, testing, state forms and filing — so the deadline is never your problem. That is exactly what our inspection contracts do.'],
    ],
  },
  {
    slug: 'nj-five-day-rule',
    title: 'New Jersey’s 5-Business-Day Rule: The Compliance Deadline Most Owners Miss',
    date: 'May 28, 2026',
    tags: ['Compliance', 'New Jersey'],
    excerpt:
      'Your inspection passed — but did the report reach the fire official in time? NJ’s reporting rule catches even well-maintained buildings.',
    body: [
      ['p', 'Under the New Jersey Fire Prevention Code (§901.6.2), records of every sprinkler inspection, test and maintenance activity must be maintained on the premises for a minimum of three years and forwarded to the local fire official within five business days.'],
      ['p', 'Penalties for fire code non-compliance in New Jersey run from $500 to $5,000 per violation per day, and serious life-safety violations can reach $25,000 — before you consider insurance consequences.'],
      ['p', 'When we inspect your system, filing the state forms with your fire official is part of the service, not an extra. You get a copy for your records and a compliance calendar for the next due date.'],
    ],
  },
  {
    slug: 'c2-permit-meaning',
    title: 'What a “C2 Permitted Contractor” Actually Means — and Why You Should Ask',
    date: 'May 6, 2026',
    tags: ['Licensing', 'Trust'],
    excerpt:
      'In NJ, it is illegal to install, service or inspect fire sprinklers without a state permit. Here’s how to verify the contractor you hire.',
    body: [
      ['p', 'Since 2003, New Jersey law (N.J.S.A. 52:27D-25q) has made it illegal for any business to install, repair, maintain or test fire protection equipment without a permit from the Division of Fire Safety. Sprinkler work specifically requires a Class C2 — Fire Sprinkler System permit.'],
      ['p', 'Behind that permit sit real qualifications: NICET Level II certification in Inspection and Testing of Water-Based Systems, plus the NICET Water-Based Systems Layout examination.'],
      ['p', 'Newark Fire Sprinkler Corp. holds NJ DFS business permit #P01570 (Class C2). You can verify it — and any contractor’s — on the Division of Fire Safety’s public Permitted Business list. If a contractor can’t give you a P-number, don’t let them touch your system.'],
    ],
  },
  {
    slug: 'five-warning-signs',
    title: '5 Warning Signs Your Sprinkler System Needs Service Now',
    date: 'April 15, 2026',
    tags: ['Maintenance', 'Safety'],
    excerpt:
      'Corrosion, odd gauge readings, painted heads — small symptoms that precede big failures.',
    body: [
      ['p', '1. Gauge pressure outside the normal band — the first sign of a leak, a closed valve or trapped air in a dry system.'],
      ['p', '2. Corrosion or discoloration on heads and pipe — especially in warehouses and parking structures, corrosion is the leading cause of blocked or non-operating heads.'],
      ['p', '3. Painted-over or damaged sprinkler heads — paint insulates the thermal element. A painted head is a failed head and must be replaced, never cleaned.'],
      ['p', '4. Water discoloration during drain tests — black water suggests internal pipe corrosion or microbiological growth that a 5-year internal inspection should investigate.'],
      ['p', '5. Alarm devices that didn’t trip during testing — if the waterflow switch doesn’t signal, nobody is coming when a head opens at 3 AM.'],
      ['p', 'Any of these deserve a service visit before your next scheduled inspection. Our 24/7 line: (973) 817-8114.'],
    ],
  },
  {
    slug: 'sprinkler-myths',
    title: 'Fire Sprinkler Myths That Refuse to Die',
    date: 'March 22, 2026',
    tags: ['Education'],
    excerpt:
      'No, they don’t all go off at once. And no, smoke doesn’t trigger them. The facts change how you think about protection.',
    body: [
      ['p', 'Myth 1: “All the sprinklers go off together.” Reality: each head is an independent heat-activated valve. In most fires, one or two heads control the entire event — which is also why sprinkler water damage is a fraction of hose damage.'],
      ['p', 'Myth 2: “Smoke sets them off.” Reality: only sustained heat (typically 68 °C / 155 °F at the head) does. Burnt toast has never triggered a sprinkler.'],
      ['p', 'Myth 3: “They fail all the time.” Reality: when fires are large enough to activate them, sprinklers operate about 92% of the time and are effective in controlling the fire in about 96% of the cases where they operate (NFPA).'],
      ['p', 'The one thing that does cause failure? Neglected maintenance — closed valves, corrosion, painted heads. Which is why the inspection cycle exists.'],
    ],
  },
]

export const team = [
  { name: 'Luis Ferreira', role: 'President' },
  { name: 'Skender Perolli', role: 'Managing Director' },
  { name: 'Stacy Sanchez', role: 'Bid Coordinator' },
  { name: 'Ruben Rodrigues', role: 'Office Manager' },
  { name: 'Keith Dolan', role: 'Business Development' },
  { name: 'Damas Paul', role: 'Design Manager / QC' },
  { name: 'Pedro Bencosme', role: 'Design Asst. Manager' },
]

export const testimonial = {
  quote:
    'Extremely knowledgeable and personable group of professionals. In times of emergency, they have been excellent communicators and efficient responders.',
  author: 'Elaine S.',
  source: 'Verified customer review',
}

export const industries = [
  { name: 'Residential', desc: 'Single-family, multi-family and high-rise living — systems that protect people first.' },
  { name: 'Commercial', desc: 'Offices, retail and hospitality — code-compliant protection with minimal disruption.' },
  { name: 'Industrial', desc: 'Warehouses, factories and high-hazard storage — ESFR and special-hazard design.' },
  { name: 'Mixed-Use', desc: 'Multi-occupancy buildings — zoned systems engineered for every use group under one roof.' },
]

export const variants = [
  {
    id: 'ember',
    name: 'Concept A — Forge',
    vibe: 'Editorial Industrial',
    desc: 'Warm paper, deep ink, precision red. Magazine-grade typography, real photography, numbered service editorial. Feels like an engineering firm’s annual report.',
    swatches: ['#14161a', '#c8102e', '#f7f5f2', '#b45309'],
  },
  {
    id: 'aegis',
    name: 'Concept B — Meridian',
    vibe: 'Consultancy Trust',
    desc: 'Cream and deep navy with serif display type. Compliance calendar in the hero, license in the header, FAQ and process timeline. Built to win property-manager RFPs.',
    swatches: ['#0c2340', '#b3202c', '#faf8f4', '#8c6b2f'],
  },
  {
    id: 'pulse',
    name: 'Concept C — Sentinel',
    vibe: 'Precision Dark',
    desc: 'Linear-grade dark mode: grid lines, aurora glow, bento feature grid, spotlight cards and a live system-status hero. Fire protection that feels like deep tech.',
    swatches: ['#0a0c10', '#ff5c1a', '#10141b', '#ffd166'],
  },
]
