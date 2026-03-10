/**
 * Application data constants.
 * All hardcoded content that was previously mixed into HTML templates.
 */

// ---- Type Definitions ----

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  initials: string;
  name: string;
  role: string;
  gradient: 'saffron' | 'green';
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  gradient: 'saffron' | 'green';
}

export interface OrgLevel {
  emoji: string;
  title: string;
  subtitle: string;
  emojiSize?: string;
}

export interface GovernanceLevel {
  emoji: string;
  label: string;
  responsibilities: string;
  composition: string;
  accountability: string;
}

export interface QuarterReport {
  q: string;
  revenue: string;
  expenses: string;
  cases: number;
  resolved: number;
}

export interface WardStat {
  name: string;
  pct: number;
}

export interface FundingSource {
  label: string;
  pct: number;
  color: string;
}

export interface MeetingMinute {
  date: string;
  title: string;
  key: string;
}

export interface VolunteerRole {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface CollabOpportunity {
  icon: string;
  title: string;
  description: string;
}

export interface FundingBar {
  label: string;
  pct: number;
  color: 'saffron' | 'green' | 'gray';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GlossaryItem {
  term: string;
  full: string;
  def: string;
}

export interface ResourceItem {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: 'saffron' | 'green';
}

export interface LegalItem {
  emoji: string;
  title: string;
  description: string;
  certNumber: string;
  certColor: 'saffron' | 'green-light';
}

// ---- Home Page Data ----

export const HOME_STATS: StatItem[] = [
  { target: 12500, suffix: '+', label: 'Active Members' },
  { target: 3200, suffix: '+', label: 'Cases Resolved' },
  { target: 850, suffix: '', label: 'Wards Covered' },
  { target: 94, suffix: '%', label: 'Success Rate' },
];

export const HOME_STEPS: StepItem[] = [
  {
    number: '1',
    title: 'Report an Issue',
    description:
      'Submit local governance problems through our platform — anonymously if preferred. Attach evidence, location, and details.',
  },
  {
    number: '2',
    title: 'We Advocate',
    description:
      'Trained volunteers verify, research, and escalate through official channels — RTI requests, legal notices, public hearings.',
  },
  {
    number: '3',
    title: 'Get Results',
    description:
      'Track progress in real-time. Our multi-level escalation ensures accountability and drives resolution within defined timelines.',
  },
];

export const IMPACT_STATS: StatItem[] = [
  { target: 4850, suffix: '', label: 'Total Cases Handled' },
  { target: 91, suffix: '%', label: 'Success Rate' },
  { target: 18, suffix: ' days', label: 'Avg. Resolution Time' },
  { target: 127, suffix: '', label: 'Active Constituencies' },
];

export const IMPACT_EMOJIS = ['📋', '✅', '⏱️', '📍'];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "After 3 years of ignoring our colony's sewage overflow, Leaders for India filed an RTI, organized a public hearing, and got the municipal corporation to act in just 22 days. Incredible!",
    initials: 'RP',
    name: 'Rajesh Patel',
    role: 'Resident, Ahmedabad Ward 12',
    gradient: 'saffron',
  },
  {
    quote:
      'I was being asked for bribes to get my building plan approved. The LFI team helped me file a formal complaint and even provided legal support. The officials were disciplined and my plan was approved cleanly.',
    initials: 'SM',
    name: 'Sunita Mehta',
    role: 'Small Business Owner, Pune',
    gradient: 'green',
  },
  {
    quote:
      'Our village school was functioning without basic amenities for 5 years. LFI volunteers helped us escalate to the District Collector, and within a month we had running water, electricity repairs, and new furniture.',
    initials: 'AK',
    name: 'Arun Kumar',
    role: 'Farmer & Parent, Bihar',
    gradient: 'saffron',
  },
  {
    quote:
      'As a woman living alone, I felt helpless when my pension was stopped without notice. Leaders for India not only restored my pension but also helped 47 other senior citizens in our area facing the same issue.',
    initials: 'KD',
    name: 'Kamla Devi',
    role: 'Retired Teacher, Jaipur',
    gradient: 'green',
  },
  {
    quote:
      "The transparency with which LFI operates is remarkable. Every case, every rupee is accounted for. I've been volunteering for 2 years now and this is the most honest civic body I've worked with.",
    initials: 'VN',
    name: 'Vikram Nair',
    role: 'Software Engineer & Volunteer, Bangalore',
    gradient: 'saffron',
  },
];

// ---- About Page Data ----

export const TEAM_MEMBERS: TeamMember[] = [
  {
    initials: 'AS',
    name: 'Dr. Ananya Sharma',
    role: 'Founder & Chairperson',
    bio: 'Former IAS officer with 20 years in public administration. PhD in Public Policy from JNU. Passionate about grassroots governance reform.',
    gradient: 'saffron',
  },
  {
    initials: 'RV',
    name: 'Ravi Verma',
    role: 'Chief Operations Officer',
    bio: '15 years managing large-scale NGO operations across South Asia. Expert in volunteer management systems and impact measurement.',
    gradient: 'green',
  },
  {
    initials: 'PK',
    name: 'Priya Krishnan',
    role: 'Legal Director',
    bio: 'Supreme Court advocate specializing in constitutional and administrative law. Has successfully argued 50+ public interest litigations.',
    gradient: 'saffron',
  },
  {
    initials: 'MJ',
    name: 'Mohammed Javed',
    role: 'Technology Lead',
    bio: 'Ex-Google engineer who left Big Tech to build civic technology platforms. Leads our digital infrastructure and data transparency initiatives.',
    gradient: 'green',
  },
];

export const GOVERNANCE_LEVELS: GovernanceLevel[] = [
  {
    emoji: '🏛️',
    label: 'Level 1 — National Council',
    responsibilities:
      'National policy advocacy, inter-state coordination, legal strategy, public relations, financial oversight, and partnerships with national bodies.',
    composition:
      '15 elected council members + 5 advisory board members from legal, media, and policy backgrounds.',
    accountability: 'Annual audited financial statements, quarterly public reports, open AGMs.',
  },
  {
    emoji: '📍',
    label: 'Level 2 — State Chapters',
    responsibilities:
      'State-level policy advocacy, coordination with state government bodies, management of district units, training and certification of volunteers.',
    composition:
      'Elected state coordinator + 5-8 functional leads (legal, communications, operations, finance, training).',
    accountability:
      'Monthly reports to National Council, quarterly town halls, volunteer satisfaction surveys.',
  },
  {
    emoji: '🏘️',
    label: 'Level 3 — District Units',
    responsibilities:
      'Manage active cases within the district, coordinate with local administration, facilitate public hearings, and support constituency cells.',
    composition: 'District coordinator + 3-5 case managers + legal advisor + communications lead.',
    accountability:
      'Case resolution metrics, bi-weekly reports to state chapter, citizen feedback scores.',
  },
  {
    emoji: '🗳️',
    label: 'Level 4 — Constituency Cells',
    responsibilities:
      'Direct engagement with elected representatives, monitoring of constituency development funds, organizing citizen forums, and managing escalated ward-level issues.',
    composition: 'Cell leader + 2-3 area coordinators + volunteer pool.',
    accountability:
      'Weekly case updates, monthly MP/MLA engagement reports, constituency scorecards.',
  },
  {
    emoji: '🙋',
    label: 'Level 5 — Ward Volunteers',
    responsibilities:
      'Ground-level issue identification, citizen outreach, evidence collection, initial case documentation, and community awareness campaigns.',
    composition: '3-10 trained volunteers per ward, led by a ward captain.',
    accountability:
      'Activity logs, case submission quality scores, peer reviews, and training completion records.',
  },
];

export const LEGAL_ITEMS: LegalItem[] = [
  {
    emoji: '📜',
    title: 'Societies Registration',
    description: 'Registered under Societies Registration Act, 1860',
    certNumber: 'Reg. No: LFI/2022/SOC/4521',
    certColor: 'saffron',
  },
  {
    emoji: '✅',
    title: '12A & 80G Certified',
    description: 'Income Tax Exemption & Donor Tax Benefits',
    certNumber: 'Cert. No: AAALFI4521E',
    certColor: 'green-light',
  },
  {
    emoji: '🔒',
    title: 'DARPAN Registered',
    description: 'NITI Aayog NGO DARPAN Portal',
    certNumber: 'ID: DL/2022/0254521',
    certColor: 'saffron',
  },
];

// ---- Transparency Page Data ----

export const QUARTERLY_REPORTS: QuarterReport[] = [
  { q: 'Q4 2025', revenue: '₹18.5L', expenses: '₹16.2L', cases: 420, resolved: 386 },
  { q: 'Q3 2025', revenue: '₹15.8L', expenses: '₹14.1L', cases: 380, resolved: 352 },
  { q: 'Q2 2025', revenue: '₹14.2L', expenses: '₹12.8L', cases: 340, resolved: 308 },
  { q: 'Q1 2025', revenue: '₹12.0L', expenses: '₹10.5L', cases: 290, resolved: 261 },
];

export const WARD_STATS: WardStat[] = [
  { name: 'North', pct: 85 },
  { name: 'South', pct: 72 },
  { name: 'East', pct: 90 },
  { name: 'West', pct: 68 },
  { name: 'Central', pct: 95 },
  { name: 'NE', pct: 60 },
];

export const FUNDING_SOURCES: FundingSource[] = [
  { label: 'Individual Donors', pct: 52, color: '#FF9933' },
  { label: 'CSR Grants', pct: 25, color: '#138808' },
  { label: 'Foundation Grants', pct: 15, color: '#FFB366' },
  { label: 'Government Programs', pct: 8, color: '#1DB954' },
];

export const MEETING_MINUTES: MeetingMinute[] = [
  {
    date: 'Feb 15, 2026',
    title: 'Q4 Financial Review & Annual Planning',
    key: 'Budget allocation for 2026, expansion to 5 new states, volunteer retention strategy, technology platform upgrade roadmap.',
  },
  {
    date: 'Nov 20, 2025',
    title: 'Q3 Operations Review',
    key: 'Case resolution rate improvement, new training modules, partnership with 3 universities, legal fund utilization review.',
  },
  {
    date: 'Aug 18, 2025',
    title: 'Mid-Year Strategy Assessment',
    key: 'Impact metrics analysis, volunteer satisfaction survey results, RTI success rate optimization, media partnership expansion.',
  },
  {
    date: 'May 12, 2025',
    title: 'Q1 Review & State Chapter Expansion',
    key: 'Launch of 3 new state chapters, volunteer onboarding process improvements, digital platform enhancements, donor engagement strategy.',
  },
];

// ---- Get Involved Page Data ----

export const CITIZEN_STEPS = [
  {
    n: '1',
    t: 'Document the Issue',
    d: 'Take photos, collect evidence, note dates, locations, and officials involved.',
    c: 'saffron' as const,
  },
  {
    n: '2',
    t: 'Submit Your Report',
    d: 'Use our secure online form or call our helpline. Anonymous submissions accepted.',
    c: 'saffron' as const,
  },
  {
    n: '3',
    t: 'We Take Action',
    d: 'Our volunteers research, document, and escalate through proper channels — RTI, legal notices.',
    c: 'green' as const,
  },
  {
    n: '4',
    t: 'Track Progress',
    d: 'Get real-time updates on your case through our dashboard at every stage.',
    c: 'green' as const,
  },
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    icon: '🔍',
    title: 'Case Investigator',
    description: 'Research, verify, and document reported issues',
    color: 'saffron',
  },
  {
    icon: '📝',
    title: 'RTI Specialist',
    description: 'Draft and file Right to Information applications',
    color: 'green-light',
  },
  {
    icon: '⚖️',
    title: 'Legal Aide',
    description: 'Assist with legal notices and public interest litigations',
    color: 'saffron',
  },
  {
    icon: '📣',
    title: 'Community Organizer',
    description: 'Mobilize citizens and organize awareness campaigns',
    color: 'green-light',
  },
];

export const FUNDING_BARS: FundingBar[] = [
  { label: 'Case Operations', pct: 45, color: 'saffron' },
  { label: 'Training & Development', pct: 22, color: 'green' },
  { label: 'Technology & Infrastructure', pct: 18, color: 'saffron' },
  { label: 'Legal Fund', pct: 10, color: 'green' },
  { label: 'Administration', pct: 5, color: 'gray' },
];

export const COLLAB_OPPORTUNITIES: CollabOpportunity[] = [
  {
    icon: '🏛️',
    title: 'Government Bodies',
    description: 'Joint grievance redressal programs, feedback loops for public services.',
  },
  {
    icon: '🎓',
    title: 'Academic Institutions',
    description: 'Research partnerships, internship programs, civic curriculum development.',
  },
  {
    icon: '📰',
    title: 'Media Organizations',
    description: 'Investigative journalism partnerships, citizen journalism training.',
  },
  {
    icon: '🌐',
    title: 'Other NGOs & CSOs',
    description: 'Coalition building, resource sharing, joint campaigns.',
  },
];

export const APPLICATION_STEPS = [
  'Fill online application form',
  'Background verification (5–7 days)',
  'Complete 20-hour training',
  'Get assigned to your local ward',
];

// ---- Resources Page Data ----

export const FAQS: FAQItem[] = [
  {
    question: 'What is an RTI (Right to Information) application?',
    answer:
      'RTI is a legal mechanism under the Right to Information Act, 2005, that allows any Indian citizen to request information from public authorities. The government body must respond within 30 days. It is one of the most powerful tools for transparency and accountability.',
  },
  {
    question: 'How do I file a complaint against a government official?',
    answer:
      "You can file complaints through multiple channels: directly at the department's grievance cell, through the Centralized Public Grievance Redress and Monitoring System (CPGRAMS) portal, via state-level ombudsman offices, or through Leaders for India where our volunteers will guide you through the process.",
  },
  {
    question: 'Is it safe to report corruption?',
    answer:
      'Yes. The Whistleblower Protection Act, 2014 provides legal safeguards. At Leaders for India, we additionally offer anonymous reporting, encrypted communications, and legal representation if needed. Your identity is never disclosed without your explicit consent.',
  },
  {
    question: 'What can I do if my elected representative is not responding?',
    answer:
      'You can escalate through multiple channels: file RTI applications about constituency development funds, attend public grievance hearings (jan sunwai), contact the district collector, reach out to the state human rights commission, or connect with Leaders for India for organized advocacy support.',
  },
  {
    question: 'How are Leaders for India volunteers trained?',
    answer:
      'All volunteers undergo a 20-hour certification program covering: Indian constitutional rights, RTI procedures, legal notice drafting, evidence documentation, public hearing procedures, digital tools training, and ethics & code of conduct. Training is conducted by experienced advocates and former civil servants.',
  },
];

export const GLOSSARY: GlossaryItem[] = [
  {
    term: 'RTI',
    full: 'Right to Information',
    def: 'Legal act allowing citizens to request information from public authorities.',
  },
  {
    term: 'PIL',
    full: 'Public Interest Litigation',
    def: 'Court petition filed for the protection of public interest.',
  },
  {
    term: 'CPGRAMS',
    full: 'Centralized Public Grievance Redress',
    def: 'Government portal for filing and tracking grievances.',
  },
  {
    term: 'Ward',
    full: 'Municipal Ward',
    def: 'Smallest administrative division in urban governance.',
  },
  {
    term: 'Ombudsman',
    full: 'Lokpal / Lokayukta',
    def: 'Anti-corruption authorities at central and state levels.',
  },
  {
    term: 'FCRA',
    full: 'Foreign Contribution Regulation Act',
    def: 'Regulates foreign donations to NGOs and associations.',
  },
  {
    term: '12A/80G',
    full: 'Tax Exemption Certificates',
    def: 'Nonprofit tax exemption and donor tax benefit under Income Tax Act.',
  },
  {
    term: 'Jan Sunwai',
    full: 'Public Hearing',
    def: 'Open forum for citizens to present grievances to officials.',
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    icon: '📖',
    title: 'Citizen Rights Handbook',
    desc: 'A comprehensive guide to your fundamental rights under the Indian Constitution — right from Article 14 to 32. Learn when and how to exercise them.',
    tag: 'Guide',
    tagColor: 'saffron',
  },
  {
    icon: '📝',
    title: 'How to File an RTI',
    desc: 'Step-by-step instructions for filing RTI applications online and offline, including fees, timelines, appeal procedures, and template letters.',
    tag: 'Guide',
    tagColor: 'green',
  },
  {
    icon: '✉️',
    title: 'Sample Complaint Letters',
    desc: 'Ready-to-use templates for common complaints: municipal issues, pension delays, building violations, ration card problems, and more.',
    tag: 'Templates',
    tagColor: 'saffron',
  },
  {
    icon: '⚖️',
    title: 'Legal Aid Directory',
    desc: 'Find free legal aid services in your district. Includes NALSA, DLSA, and accredited legal aid organizations across all states.',
    tag: 'Directory',
    tagColor: 'green',
  },
  {
    icon: '🏛️',
    title: 'Government Helpline Numbers',
    desc: 'All essential government helplines: anti-corruption (1031), women helpline (181), child helpline (1098), police (100), and state-specific numbers.',
    tag: 'Quick Ref',
    tagColor: 'saffron',
  },
  {
    icon: '📊',
    title: 'Understanding Your MLA/MP Fund',
    desc: 'Learn how MPLADS and MLALADS funds work, how much your representative receives, how to check utilization, and how to demand accountability.',
    tag: 'Guide',
    tagColor: 'green',
  },
];
