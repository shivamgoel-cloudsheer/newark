// Central content store — copy sourced verbatim from newarkfiresprinkler.com
// (fetched 2026-07-10) plus licensing facts from RESEARCH.md.

export const company = {
  name: 'Newark Fire Sprinkler Corp.',
  shortName: 'Newark Fire Sprinkler',
  tagline: 'Total Fire Protection, Tailored to You',
  hero: 'Expertly Designed, Installed, and Maintained Fire Safety Systems You Can Rely On',
  slogan: 'Your Safety, Our Priority',
  mission:
    'Our mission is to deliver customized fire protection services that exceed expectations and protect what matters most.',
  story:
    'With over three decades of experience in serving the fire protection needs of businesses, organizations, offices and more in New Jersey, Newark Fire Sprinkler Corp. offers the most robust services when it comes to designing and implementing fire sprinkler systems.',
  phone: '(973) 817-8114',
  phoneHref: 'tel:+19738178114',
  email: 'Sales@Newarkfiresprinkler.com',
  address: '4 Libella Ct, Newark, NJ 07105',
  permit: 'NJ DFS Permit #P01570',
  permitClass: 'Class C2 — Fire Sprinkler Systems',
  serviceArea: 'Serving all of New Jersey',
  experience: '30 Years of Fire Protection Leadership',
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
  '30 Years of Fire Protection Leadership',
  'NFPA 25 Inspections',
  'Custom Design & Shop Drawings',
  'Licensed · Bonded · Insured',
  '24/7 Peace of Mind',
  'In-House Design Team',
  'Serving All of New Jersey',
]

export const trustBadges = [
  { label: 'NJ Licensed', detail: 'DFS Permit #P01570' },
  { label: 'NICET Certified', detail: 'Certified technicians' },
  { label: 'NFPA Compliant', detail: 'Latest codes & standards' },
  { label: 'Fully Insured', detail: 'Licensed, bonded & insured' },
]

// Numbers verified on the site; 2.9M+ / 41,000+ are sums of the eight
// showcase projects published on newarkfiresprinkler.com/videos
export const stats = [
  { value: '30', label: 'Years of fire protection leadership' },
  { value: '2.9M+', label: 'Sq ft protected in showcase projects' },
  { value: '41,000+', label: 'Sprinkler heads installed' },
  { value: '24/7', label: 'Peace of mind' },
]

// "Companies Who Trust In Us" — partner logos on the homepage
export const partners = ['Armstrong', 'American Fire Supply', 'Reliable', 'Victaulic', 'Viking', 'Windustrial']

export const codesStatement =
  'At Newark Fire Sprinkler Corp., we are committed to ensuring that all fire protection systems comply with the latest local, state, and national codes and standards.'

export const services = [
  {
    slug: 'installation',
    icon: 'install',
    title: 'Fire Sprinkler Installation',
    tagline: 'Expertly designed, tailored to your needs',
    desc: 'Protect your property with expertly designed and installed fire sprinkler systems tailored to your needs. A fire can quickly turn a thriving business or comfortable home into a mess of damage and debris — our NICET-certified technicians install systems for residential, commercial and industrial spaces that stop it before it spreads.',
    features: [
      'Residential — systems that activate instantly to stop fire spread',
      'Commercial — offices, retail spaces and restaurants',
      'Industrial — high-risk areas like factories and warehouses',
      'Custom designs crafted by our in-house design team',
    ],
  },
  {
    slug: 'service-repairs',
    icon: 'wrench',
    title: 'Fire Sprinkler Service & Repairs',
    tagline: 'Keep your fire protection systems running at their best',
    desc: 'Regular service and timely repairs are critical to ensuring your fire sprinkler system functions when you need it most. We maintain and repair residential, commercial and industrial fire protection systems — keeping you compliant, secure, and prepared.',
    features: [
      'Routine service & scheduled maintenance',
      'Emergency repairs with minimal downtime',
      'Hydrant and pump testing',
      'System upgrades & leak detection',
    ],
  },
  {
    slug: 'inspections',
    icon: 'clipboard',
    title: 'Fire Sprinkler Inspections & Compliance',
    tagline: 'Stay compliant and safe with expert inspections',
    desc: 'Regular inspections are critical to ensuring your fire sprinkler system operates as intended in an emergency. Our licensed and certified team conducts residential and commercial inspections, code compliance checks and hydrant & pump testing — with comprehensive reports and actionable recommendations.',
    features: [
      'Residential & commercial inspections',
      'Code compliance checks — local & national regulations',
      'Hydrant and pump testing',
      'Comprehensive reports with actionable recommendations',
    ],
  },
  {
    slug: 'design',
    icon: 'blueprint',
    title: 'Custom Design & Shop Drawings',
    tagline: 'Tailored fire protection systems built for your property',
    desc: 'Every property is unique, which is why we offer custom fire sprinkler designs and shop drawings tailored to your specific needs. Benefit from expertly crafted sprinkler layouts designed for maximum safety and efficiency — detailed, code-compliant drawings that streamline installation and reduce costs.',
    features: [
      'In-house fire system design',
      'Custom code-compliant shop drawings',
      'NFPA & local fire safety compliance',
      'Cost optimization — designs that minimize waste, maximize coverage',
    ],
  },
]

// The eight showcase projects published on newarkfiresprinkler.com/videos —
// every number is theirs, verbatim.
export const caseStudies = [
  {
    slug: '301-west-side',
    sector: 'Multi-Unit Residential',
    title: '301 West Side Avenue, Jersey City',
    summary:
      'The homepage flagship: a 218,028 sq ft multi-unit residential building where 2,638 sprinkler heads ensure safety for every one of its 202 units.',
    metrics: [
      { value: '218,028', label: 'sq. feet' },
      { value: '202', label: 'units' },
      { value: '2,638', label: 'sprinkler heads' },
    ],
    body: 'Full system design by our in-house team, coordinated shop drawings, and installation across every residential floor and amenity space — the project we put on our homepage.',
    accent: '#e2543a',
  },
  {
    slug: 'avalon-wayne',
    sector: 'Multi-Unit Residential',
    title: 'Avalon Wayne — 1445 Valley Road, Wayne, NJ',
    summary:
      'Our largest showcase: 767,073 sq ft and 473 residences protected by 12,694 sprinkler heads.',
    metrics: [
      { value: '767,073', label: 'sq. feet' },
      { value: '473', label: 'units' },
      { value: '12,694', label: 'sprinkler heads' },
    ],
    body: 'At three-quarters of a million square feet, Avalon Wayne is proof the team scales — design, coordination and installation across an entire garden-community campus.',
    accent: '#2b6cb0',
  },
  {
    slug: 'port-liberte',
    sector: 'Multi-Unit Residential',
    title: 'Port Liberte, Jersey City, NJ',
    summary:
      '673,835 sq ft, 401 units and 11,368 heads — across seven parking levels and five residential floors.',
    metrics: [
      { value: '673,835', label: 'sq. feet' },
      { value: '401', label: 'units' },
      { value: '11,368', label: 'sprinkler heads' },
    ],
    body: 'Seven parking levels topped by five residential floors: mixed hydraulic demands, one coordinated system.',
    accent: '#6b46c1',
  },
  {
    slug: 'bjs-wholesale',
    sector: 'Commercial',
    title: "BJ's Wholesale Facility",
    summary:
      'A 95,022 sq ft commercial facility protected by 1,301 heads, a 1,250 GPM fire pump and three 8" ESFR risers — installed in just 4 weeks.',
    metrics: [
      { value: '95,022', label: 'sq. feet' },
      { value: '1,301', label: 'sprinkler heads' },
      { value: '4 weeks', label: 'installation' },
    ],
    body: 'High-piled retail storage demands ESFR protection: 1,250 GPM fire pump, three 8-inch ESFR risers, and an installation schedule that kept the business moving — completed in four weeks.',
    accent: '#b7791f',
  },
  {
    slug: 'the-morrison',
    sector: 'Multi-Unit Residential',
    title: 'The Morrison, Parsippany, NJ',
    summary: '460,300 sq ft and 296 residences protected by 5,220 sprinkler heads.',
    metrics: [
      { value: '460,300', label: 'sq. feet' },
      { value: '296', label: 'units' },
      { value: '5,220', label: 'sprinkler heads' },
    ],
    body: 'Large-plate suburban residential — full design-to-commissioning delivery by our in-house team.',
    accent: '#0f766e',
  },
  {
    slug: 'the-declan',
    sector: 'Multi-Unit Residential',
    title: 'The Declan Apartments, Weehawken, NJ',
    summary: '351,390 sq ft, 298 units, 3,641 sprinkler heads on the Weehawken waterfront.',
    metrics: [
      { value: '351,390', label: 'sq. feet' },
      { value: '298', label: 'units' },
      { value: '3,641', label: 'sprinkler heads' },
    ],
    body: 'One of several Weehawken projects in our portfolio, alongside 600 and 800 Harbor Boulevard and 5 Port Imperial Blvd.',
    accent: '#9d174d',
  },
  {
    slug: 'singh-tower',
    sector: 'Multi-Unit Residential',
    title: 'Singh Tower — 622 Summit Ave, Jersey City',
    summary: 'A 29-story tower: 230,600 sq ft, 209 units, 2,855 sprinkler heads.',
    metrics: [
      { value: '29', label: 'stories' },
      { value: '209', label: 'units' },
      { value: '2,855', label: 'sprinkler heads' },
    ],
    body: 'High-rise work is where coordination matters most — 29 stories of risers, floor control valves and heads, delivered to schedule.',
    accent: '#b45309',
  },
  {
    slug: 'aquaview',
    sector: 'Multi-Unit Residential',
    title: 'Aquaview at Harbor Station South, Bayonne, NJ',
    summary: '169,360 sq ft and 159 units protected by 2,050 sprinkler heads.',
    metrics: [
      { value: '169,360', label: 'sq. feet' },
      { value: '159', label: 'units' },
      { value: '2,050', label: 'sprinkler heads' },
    ],
    body: 'Waterfront residential in Bayonne — designed, installed and certified by one accountable team.',
    accent: '#155e75',
  },
]

// Full portfolio (real addresses from /work) for the case-studies page
export const portfolio = {
  Residential: [
    'URBY4 · Harrison, NJ', '5 Port Imperial Blvd · Weehawken, NJ', '155 Washington St · Newark, NJ',
    '711 Montgomery St · Jersey City, NJ', '270 Johnston Ave · Jersey City, NJ', '622-628 Summit Ave · Jersey City, NJ',
    'Aberdeen Senior Apts · Jersey City, NJ', '39 New York Ave · Jersey City, NJ', '705 Newark Ave · Elizabeth, NJ',
    '538 Morris Ave · Elizabeth, NJ', '588 Bloomfield Ave · Bloomfield, NJ', '555 Northfield Ave · West Orange, NJ',
    '416 Highland Ave · Orange, NJ', '284 King George Rd · Warren, NJ', '100-120 Cherry Hill Rd · Parsippany, NJ',
    '50 Sussex Ave · Newark, NJ', '10 E Westfield Ave · Roselle Park, NJ', '8711 Church Hill Rd · North Bergen, NJ',
    'Pearl Pointe · Burlington, NJ', 'The River Club · Bogota, NJ', '600 Harbor Blvd · Weehawken, NJ',
    '800 Harbor Blvd · Weehawken, NJ', '555 1st St · Harrison, NJ', '29 Harris Pl · Paterson, NJ',
    'Park Ridge Apartments · Park Ridge, NJ', 'Vinty Building · Cinnaminson, NJ', 'Tarrytown, NY',
    'Weehawken, NJ', 'Linden, NJ',
  ],
  Industrial: [
    '3275 Route 206 · Mansfield Township, NJ', '134 Neelytown Rd · Montgomery, NY', '25 Enterprise Ave N · Secaucus, NJ',
    '2900 Woodbridge Ave · Edison, NJ', '580 Port Carteret Dr · Carteret, NJ',
  ],
  Commercial: ['1 South Burnett St · East Orange, NJ', 'Ledgewood Commons · Roxbury, NJ'],
  'Mixed-Use': ['101 Grove St · Jersey City, NJ', '2-16 Spring St · Newark, NJ', 'Meridia Transit Plaza · Dover, NJ'],
}

export const process = [
  {
    n: '01',
    title: 'Survey & assess',
    desc: 'A NICET-certified tech walks your building, reviews existing systems and pulls the code requirements for your occupancy.',
  },
  {
    n: '02',
    title: 'Engineer & quote',
    desc: 'Our in-house design team produces custom designs, shop drawings and hydraulic calculations — with a clear, line-itemed proposal.',
  },
  {
    n: '03',
    title: 'Install or service',
    desc: 'Field crews execute to the drawing with seamless installation that minimizes disruption to your operation.',
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
    a: 'Yes — leaks, burst pipes, impaired systems, failed components. The line at (973) 817-8114 is answered 24/7, and we offer emergency repairs that restore your fire protection system with minimal downtime.',
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

// Real core values from newarkfiresprinkler.com/about
export const values = [
  {
    icon: 'shield',
    title: 'Safety First',
    desc: 'We prioritize the protection of lives and property by delivering fire safety solutions that meet the highest standards of reliability and compliance.',
  },
  {
    icon: 'check',
    title: 'Excellence in Service',
    desc: 'Our commitment to quality and professionalism drives us to exceed expectations in every project, from design to installation and maintenance.',
  },
  {
    icon: 'blueprint',
    title: 'Innovation and Expertise',
    desc: 'We embrace cutting-edge technology and leverage our certified team’s expertise to create tailored fire protection systems for every client’s unique needs.',
  },
  {
    icon: 'chat',
    title: 'Trust and Accountability',
    desc: 'We build lasting relationships through honest communication, transparent processes, and unwavering dedication to our clients’ safety and satisfaction.',
  },
]

// Current roster from newarkfiresprinkler.com/contact (with direct emails);
// Skender Perolli appears on /about. Two source emails had domain typos
// (firespinkler / sprinklerr) — normalized to the correct domain.
export const team = [
  { name: 'Luis Ferreira', role: 'President', dept: 'Administration', email: 'LuisF@newarkfiresprinkler.com' },
  { name: 'Skender Perolli', role: 'Managing Director', dept: 'Administration' },
  { name: 'Jose Polanco', role: 'Controller', dept: 'Administration', email: 'Jpolanco@newarkfiresprinkler.com' },
  { name: 'Stacy Sanchez', role: 'Contract & Insurance Compliance Officer', dept: 'Administration', email: 'Stacys@newarkfiresprinkler.com' },
  { name: 'Ruben Rodrigues', role: 'Office Manager', dept: 'Administration', email: 'Office1@newarkfiresprinkler.com' },
  { name: 'Keith Dolan', role: 'Operations Manager', dept: 'Administration', email: 'Keithd@newarkfiresprinkler.com' },
  { name: 'Bryan Jaramillo', role: 'Residential Manager', dept: 'Residential & Commercial', email: 'Bryanj@newarkfiresprinkler.com' },
  { name: 'Denilson Martinez', role: 'Estimator', dept: 'Residential & Commercial', email: 'Denilsonm@newarkfiresprinkler.com' },
  { name: 'Yandri Torres', role: 'Estimator', dept: 'Residential & Commercial', email: 'Yandrit@newarkfiresprinkler.com' },
  { name: 'Armando Gonzalez', role: 'Industrial Manager', dept: 'Industrial', email: 'Armandog@newarkfiresprinkler.com' },
  { name: 'Anthony Paltan', role: 'Industrial Designer', dept: 'Industrial', email: 'Anthonyp@newarkfiresprinkler.com' },
  { name: 'Bryan Remache', role: 'Estimator & Industrial Designer', dept: 'Industrial', email: 'Bremache@newarkfiresprinkler.com' },
  { name: 'Alex Mirenda', role: 'Service & Inspections Manager', dept: 'Service & Inspections', email: 'AlexM@newarkfiresprinkler.com' },
  { name: 'Sharon Sweigart', role: 'Service Coordinator', dept: 'Service & Inspections', email: 'Sharons@newarkfiresprinkler.com' },
  { name: 'Sheila Balbuena', role: 'Service Bids Coordinator', dept: 'Service & Inspections', email: 'Servicebids@newarkfiresprinkler.com' },
  { name: 'Eduor De Jesus', role: 'Manager / Quality Control', dept: 'Design', email: 'Eduorj@newarkfiresprinkler.com' },
  { name: 'Pedro Bencosme', role: 'Assistant Manager', dept: 'Design', email: 'Pedrob@newarkfiresprinkler.com' },
]

export const testimonial = {
  quote:
    'Extremely knowledgeable and personable group of professionals. In times of emergency, they have been excellent communicators and efficient responders.',
  author: 'Elaine S.',
  source: 'Verified customer review',
}

// Verbatim positioning from the /industries pages
export const industries = [
  {
    name: 'Residential',
    desc: 'Protect your family and home with expertly designed systems that activate instantly to stop fire spread.',
  },
  {
    name: 'Commercial',
    headline: 'Tailored for business safety and success',
    desc: 'Fire protection that prioritizes safety, minimizes risks and ensures operational continuity — for retail, offices, restaurants and hospitality.',
  },
  {
    name: 'Industrial',
    headline: 'Built for complexity and safety',
    desc: 'Systems that handle large-scale operations, high-risk environments and complex layouts — manufacturing, warehouses, chemical facilities and logistics hubs.',
  },
  {
    name: 'Mixed-Use',
    headline: 'Integrated safety for diverse spaces',
    desc: 'Seamless integration across residential, commercial and shared spaces — full coverage without compromising design or functionality.',
  },
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
    name: 'Concept B — Inferno',
    vibe: 'Cinematic Fire',
    desc: 'Near-black with crimson heat. Massive poster typography, full-bleed photography, a scrolling fire ticker and a pulsing 24/7 emergency wall. The one people remember.',
    swatches: ['#0e0b0b', '#e5062d', '#fff7f0', '#ff6b1a'],
  },
  {
    id: 'pulse',
    name: 'Concept C — Sentinel',
    vibe: 'Precision Dark',
    desc: 'Linear-grade dark mode: grid lines, aurora glow, bento feature grid, spotlight cards and a live system-status hero. Fire protection that feels like deep tech.',
    swatches: ['#0a0c10', '#ff5c1a', '#10141b', '#ffd166'],
  },
]
