export interface RoadmapMilestone {
  id: string;
  year: number;
  semester: string;
  title: string;
  focusArea: string;
  description: string;
  skillsToMaster: string[];
  recommendedProjects: string[];
  certificationsTarget: string[];
  freePlatforms: { name: string; url: string; note: string }[];
  isCompleted?: boolean;
}

export const cybersecurityRoadmap: RoadmapMilestone[] = [
  {
    id: 'year-1',
    year: 1,
    semester: '1st & 2nd Semester (Current)',
    title: 'Foundations & Cyber Mindset',
    focusArea: 'Linux, Networking Basics, Python & Security Fundamentals',
    description: 'Build an unshakeable foundation in computer networking (TCP/IP), the Linux terminal, and programming fundamentals so security concepts make natural sense.',
    skillsToMaster: [
      'Linux CLI & Bash Scripting (Ubuntu, Kali)',
      'Computer Networking: OSI 7 Layers, TCP/IP, DNS, Subnetting',
      'Wireshark packet capture & inspection',
      'Python scripting for basic automation & sockets',
      'Git & GitHub version control portfolio'
    ],
    recommendedProjects: [
      'Build a multithreaded Port Scanner in Python',
      'Set up a home/virtual lab with VirtualBox and pfSense',
      'Analyze live HTTP/DNS traffic in Wireshark and write an anomaly report'
    ],
    certificationsTarget: [
      'CompTIA Security+ (Self-study foundational concepts)',
      'Google Cybersecurity Professional Certificate (Coursera)',
      'Cisco Networking Academy: Cybersecurity Essentials (Free)'
    ],
    freePlatforms: [
      { name: 'OverTheWire (Bandit)', url: 'https://overthewire.org/wargames/bandit/', note: 'Master Linux command line via 34 hands-on challenges' },
      { name: 'TryHackMe: Pre-Security Path', url: 'https://tryhackme.com/path/outline/pre-security', note: 'Interactive gamified browser labs for networking & web' },
      { name: 'Professor Messer Security+', url: 'https://professormesser.com', note: '100% Free video course covering complete CompTIA SY0-701 syllabus' }
    ]
  },
  {
    id: 'year-2',
    year: 2,
    semester: '3rd & 4th Semester',
    title: 'Offensive & Defensive Core',
    focusArea: 'Web Application Security (OWASP), SOC Operations & Cryptography',
    description: 'Transition from fundamentals to real offensive and defensive practice. Learn how attackers break web applications and how blue teams detect and mitigate them.',
    skillsToMaster: [
      'OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR, SSRF)',
      'Burp Suite Community & Professional basics',
      'SOC fundamentals: Splunk, ELK, Windows Event Logs',
      'Applied Cryptography: AES, RSA, Hashing, TLS/SSL, PKI',
      'Database Security & SQL injection remediation'
    ],
    recommendedProjects: [
      'Solve 40+ labs on PortSwigger Web Security Academy',
      'Deploy a vulnerable web app (DVWA / Juice Shop) and document exploits + fixes',
      'Configure a local Elastic SIEM and ingest Windows Sysmon logs'
    ],
    certificationsTarget: [
      'CompTIA Security+ (Official Exam - high ROI for 2nd year internships)',
      'eLearnSecurity Junior Penetration Tester (eJPTv2)',
      'Certified Ethical Hacker (CEH v12 - recognized by Indian recruiters)'
    ],
    freePlatforms: [
      { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', note: 'Gold standard free web pentesting training by creators of Burp Suite' },
      { name: 'TryHackMe: SOC Level 1', url: 'https://tryhackme.com/path/outline/soclevel1', note: 'Splunk, Wireshark, Snort, and incident response fundamentals' },
      { name: 'HackTheBox Starting Point', url: 'https://hackthebox.com', note: 'Guided machines for initial penetration testing skills' }
    ]
  },
  {
    id: 'year-3',
    year: 3,
    semester: '5th & 6th Semester',
    title: 'Specialization & Summer Internship',
    focusArea: 'Cloud Security (AWS/Azure), DevSecOps, Active Directory Pentesting',
    description: 'Stand out from standard CSE peers by mastering enterprise cloud architecture and Active Directory domains, unlocking ₹18–25 LPA pre-placement offers (PPOs).',
    skillsToMaster: [
      'Cloud Security: AWS IAM, VPC peering, GuardDuty, Terraform',
      'Active Directory exploitation & Kerberos attacks (BloodHound, Mimikatz)',
      'DevSecOps: GitHub Actions CI/CD with SonarQube & Trivy',
      'Malware analysis basics: PE headers, Ghidra disassembly, sandboxes',
      'Technical communication & executive vulnerability reporting'
    ],
    recommendedProjects: [
      'Build an automated DevSecOps CI/CD pipeline blocking insecure Docker images',
      'Active Directory virtual lab simulating enterprise domain compromise and defense',
      'Earn public recognition via responsible disclosure on Bugcrowd / HackerOne'
    ],
    certificationsTarget: [
      'AWS Certified Security - Specialty or AWS Solutions Architect Associate',
      'Offensive Security Certified Professional (OSCP) (Aspirational target)',
      'Certified Red Team Professional (CRTP - Altered Security)'
    ],
    freePlatforms: [
      { name: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws', note: 'Official free AWS cloud fundamentals & cloud security modules' },
      { name: 'OWASP Juice Shop & DefectDojo', url: 'https://owasp.org', note: 'Real world DevSecOps pipeline integration practice' },
      { name: 'CyberDefenders', url: 'https://cyberdefenders.org', note: 'Blue team investigation CTFs using real memory dumps and PCAPs' }
    ]
  },
  {
    id: 'year-4',
    year: 4,
    semester: '7th & 8th Semester',
    title: 'Placement Cracking & Capstone',
    focusArea: 'High-Package Placement Drives (₹15–35 LPA), Capstone Innovation, Leadership',
    description: 'Convert your 3 years of hands-on technical superiority into top-tier offers at CrowdStrike, Microsoft, Palo Alto Networks, or fast-growing FinTech unicorns.',
    skillsToMaster: [
      'System Design with Zero Trust & Security Principles',
      'Advanced Data Structures & Algorithms for product company rounds',
      'Threat Modeling (STRIDE/DREAD) at architectural scale',
      'Incident Commander protocols & executive board communication',
      'Technical interview whiteboard problem solving'
    ],
    recommendedProjects: [
      'B.Tech Final Year Capstone: AI-driven Zero-Day Anomaly Detection or Zero Trust Proxy',
      'Contribute an open-source tool to GitHub with 50+ stars',
      'Publish a peer-reviewed research paper in IEEE or security conference'
    ],
    certificationsTarget: [
      'OSCP (OffSec) - The premier gold standard for offensive hiring',
      'Certified Cloud Security Professional (CCSP) or CISM'
    ],
    freePlatforms: [
      { name: 'LeetCode & NeetCode 150', url: 'https://neetcode.io', note: 'DSA preparation for Tier 1 tech company screening rounds' },
      { name: 'MITRE ATT&CK Matrix', url: 'https://attack.mitre.org', note: 'De-facto taxonomy for enterprise threat analysis and defense mapping' }
    ]
  }
];

export interface CertificationGuide {
  name: string;
  provider: string;
  costInr: string;
  studentDiscount: string;
  targetRole: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  whyItMatters: string;
}

export const certificationGuides: CertificationGuide[] = [
  {
    name: 'CompTIA Security+ (SY0-701)',
    provider: 'CompTIA',
    costInr: '₹22,000 (Regular) / ~₹13,000 with CompTIA Academic Store .edu discount',
    studentDiscount: 'Up to 45% off through CompTIA Academic Store with college email ID',
    targetRole: 'SOC Analyst L1, Junior Security Engineer, IT Security Consultant',
    difficulty: 'Beginner',
    whyItMatters: 'Recognized globally and DoD 8570 approved. Serves as the ultimate baseline credential on LinkedIn and resume screenings in India.'
  },
  {
    name: 'AWS Certified Security - Specialty (SCS-C02)',
    provider: 'Amazon Web Services',
    costInr: '₹25,000 (~$300)',
    studentDiscount: '50% discount voucher upon passing AWS Cloud Practitioner',
    targetRole: 'Cloud Security Architect, DevSecOps Engineer, AWS Security Specialist',
    difficulty: 'Intermediate',
    whyItMatters: '90% of Indian startups and unicorns run on AWS. Proves you understand IAM least privilege, KMS encryption, and multi-account guardrails.'
  },
  {
    name: 'eJPTv2 (eLearnSecurity Junior Pentester)',
    provider: 'INE Security',
    costInr: '₹18,000 (~$249 including training)',
    studentDiscount: 'Student subscription discounts periodically available on INE',
    targetRole: 'Penetration Tester, Vulnerability Assessment Engineer, Red Teamer',
    difficulty: 'Intermediate',
    whyItMatters: '100% practical, hands-on 48-hour exam in a dynamic network. Far more respected by technical interviewers than multiple-choice exams.'
  },
  {
    name: 'OSCP (Offensive Security Certified Professional)',
    provider: 'OffSec',
    costInr: '₹1,30,000+ (Learner One package)',
    studentDiscount: 'OffSec Student / Academic discounts occasionally offered for universities',
    targetRole: 'Senior Penetration Tester, Red Team Lead, Security Consultant (₹20-35 LPA)',
    difficulty: 'Advanced',
    whyItMatters: 'The undisputed gold badge in cybersecurity worldwide. Possessing this at graduation instantly puts you in the top 0.1% of Indian engineering candidates.'
  }
];
