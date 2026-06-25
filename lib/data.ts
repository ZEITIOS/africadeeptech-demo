import { Talent, Cohort, Vertical } from "./types";

export const VERTICALS: Vertical[] = [
  "Defense Tech",
  "Biotech",
  "Health Sciences",
  "Climate Tech",
  "Energy & Power",
  "Robotics",
  "ML/AI Research",
  "Cryptography",
  "Hardware & Semiconductors",
  "Space Tech",
  "Edge Computing",
  "Agritech",
];

export const TALENTS: Talent[] = [
  {
    id: "WKR-0471",
    name: "Adaeze Okonkwo",
    headline: "Edge ML systems · on-device inference · power-constrained deployments",
    city: "Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    tier: "Operator",
    verticals: ["Edge Computing", "ML/AI Research", "Energy & Power"],
    skills: [
      { skill: "Model Quantization", score: 94 },
      { skill: "TinyML / TFLite-Micro", score: 91 },
      { skill: "C / Embedded Systems", score: 86 },
      { skill: "PyTorch", score: 88 },
      { skill: "Power Profiling", score: 82 },
      { skill: "Technical Documentation", score: 90 },
    ],
    availability: "Available",
    availabilityDetail: "20 hrs/wk from Apr 22",
    completionRate: 97,
    agentsBuilt: 24,
    hoursLogged: 412,
    rate: "$55–70 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 20, completionRate: 100, industry: "Grid & Utilities", verdict: "Advanced" },
      { cohort: "WKT-2025-Q2", date: "May 2025", agentsBuilt: 18, completionRate: 95, industry: "Agritech", verdict: "Advanced" },
    ],
    projects: [
      { title: "Substation fault predictor", vertical: "Energy & Power", role: "Lead engineer", outcome: "Deployed on 14 IHS sites, 38% false-alarm reduction" },
      { title: "Offline crop-disease classifier", vertical: "Agritech", role: "ML engineer", outcome: "4.2MB model, runs on ₦15K Android handsets" },
    ],
    bio: "Embedded ML engineer focused on making neural networks run where power, bandwidth and hardware budget are all thin. Former firmware team lead at a Lagos-based IoT startup.",
    joined: "2024-03-11",
    yearsExp: 6,
    spokenLanguages: ["English", "Igbo"],
    githubHandle: "adaeze-ok",
  },
  {
    id: "WKR-0512",
    name: "Kwame Asante",
    headline: "Autonomous systems · computer vision · UAV perception stacks",
    city: "Accra",
    country: "Ghana",
    flag: "🇬🇭",
    tier: "Principal",
    verticals: ["Defense Tech", "Robotics", "ML/AI Research"],
    skills: [
      { skill: "CNN / Vision Transformers", score: 95 },
      { skill: "ROS 2", score: 92 },
      { skill: "SLAM", score: 88 },
      { skill: "CUDA / TensorRT", score: 87 },
      { skill: "Sensor Fusion", score: 90 },
      { skill: "Mission Planning", score: 83 },
    ],
    availability: "Partial",
    availabilityDetail: "10 hrs/wk, advisory",
    completionRate: 99,
    agentsBuilt: 31,
    hoursLogged: 1140,
    rate: "$110–140 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q3", date: "Aug 2025", agentsBuilt: 20, completionRate: 100, industry: "Defense & Security", verdict: "Advanced" },
    ],
    projects: [
      { title: "Border-surveillance UAV perception", vertical: "Defense Tech", role: "Principal engineer", outcome: "Deployed across 3 surveillance corridors in-country" },
      { title: "Warehouse inventory drone", vertical: "Robotics", role: "Tech lead", outcome: "98.4% SKU-read accuracy, shipped to 2 logistics firms" },
    ],
    bio: "Robotics engineer with defense and logistics UAV experience. Previously led perception at a Toronto-based drone startup before returning to Accra.",
    joined: "2023-09-01",
    yearsExp: 11,
    spokenLanguages: ["English", "Twi", "French"],
    githubHandle: "kwame-a",
  },
  {
    id: "WKR-0603",
    name: "Njeri Wambui",
    headline: "Bioinformatics · genomics pipelines · clinical ML",
    city: "Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    tier: "Operator",
    verticals: ["Biotech", "Health Sciences", "ML/AI Research"],
    skills: [
      { skill: "Genomic Variant Calling", score: 93 },
      { skill: "Nextflow / Snakemake", score: 90 },
      { skill: "scikit-learn", score: 86 },
      { skill: "R / Bioconductor", score: 88 },
      { skill: "Clinical Data Governance", score: 84 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time from May",
    completionRate: 94,
    agentsBuilt: 22,
    hoursLogged: 680,
    rate: "$70–90 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 20, completionRate: 95, industry: "Health Sciences", verdict: "Advanced" },
      { cohort: "WKT-2025-Q1", date: "Feb 2025", agentsBuilt: 16, completionRate: 88, industry: "Health Sciences", verdict: "Advanced" },
    ],
    projects: [
      { title: "Sickle-cell variant classifier", vertical: "Health Sciences", role: "Lead bioinformatician", outcome: "Used across 4 referral hospitals in East Africa" },
      { title: "Drug-response prediction model", vertical: "Biotech", role: "ML engineer", outcome: "AUC 0.87 on internal validation cohort" },
    ],
    bio: "Bioinformatics engineer with a focus on African genomic data and clinical applications. MSc Computational Biology, University of Edinburgh.",
    joined: "2024-01-22",
    yearsExp: 5,
    spokenLanguages: ["English", "Swahili", "Kikuyu"],
    githubHandle: "njeri-w",
  },
  {
    id: "WKR-0688",
    name: "Thulani Mokoena",
    headline: "Semiconductor design · RTL / FPGA · custom silicon",
    city: "Johannesburg",
    country: "South Africa",
    flag: "🇿🇦",
    tier: "Principal",
    verticals: ["Hardware & Semiconductors", "Defense Tech"],
    skills: [
      { skill: "Verilog / SystemVerilog", score: 94 },
      { skill: "FPGA Synthesis", score: 91 },
      { skill: "ASIC Flow (OpenLane)", score: 85 },
      { skill: "DSP Blocks", score: 89 },
      { skill: "Timing Closure", score: 88 },
    ],
    availability: "Engaged",
    availabilityDetail: "Engaged until Jun 2026",
    completionRate: 100,
    agentsBuilt: 19,
    hoursLogged: 1520,
    rate: "$125–160 / hr",
    wokkahthons: [
      { cohort: "WKT-2024-Q4", date: "Nov 2024", agentsBuilt: 19, completionRate: 100, industry: "Hardware", verdict: "Advanced" },
    ],
    projects: [
      { title: "Low-power edge AI accelerator (RTL)", vertical: "Hardware & Semiconductors", role: "Lead designer", outcome: "Taped out on SkyWater 130nm, benchmarked 2.1 TOPS/W" },
      { title: "Radar signal-processing pipeline", vertical: "Defense Tech", role: "DSP lead", outcome: "Deployed on airborne platform, SABC partnership" },
    ],
    bio: "Chip designer with 14 years across defense, telecom and open-silicon. Active contributor to OpenROAD and mentor at Chip Mango.",
    joined: "2023-05-17",
    yearsExp: 14,
    spokenLanguages: ["English", "Zulu", "Afrikaans"],
    githubHandle: "thulani-m",
  },
  {
    id: "WKR-0701",
    name: "Fatima El-Amin",
    headline: "Climate modeling · remote sensing · earth-observation ML",
    city: "Cairo",
    country: "Egypt",
    flag: "🇪🇬",
    tier: "Operator",
    verticals: ["Climate Tech", "ML/AI Research", "Space Tech"],
    skills: [
      { skill: "Google Earth Engine", score: 93 },
      { skill: "Satellite Imagery (Sentinel)", score: 91 },
      { skill: "xarray / dask", score: 87 },
      { skill: "U-Net Segmentation", score: 89 },
      { skill: "Climate Downscaling", score: 82 },
    ],
    availability: "Available",
    availabilityDetail: "30 hrs/wk, remote",
    completionRate: 92,
    agentsBuilt: 20,
    hoursLogged: 530,
    rate: "$65–85 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q3", date: "Aug 2025", agentsBuilt: 20, completionRate: 95, industry: "Climate Tech", verdict: "Advanced" },
    ],
    projects: [
      { title: "Sahel drought-onset forecasting", vertical: "Climate Tech", role: "Lead researcher", outcome: "12-day lead time; paper accepted at EGU 2025" },
      { title: "Nile-delta coastline erosion monitor", vertical: "Climate Tech", role: "CV engineer", outcome: "Quarterly briefings to Egyptian Environmental Affairs Agency" },
    ],
    bio: "Climate ML researcher working at the intersection of earth observation and physical modeling. PhD candidate, Cairo University.",
    joined: "2024-06-04",
    yearsExp: 7,
    spokenLanguages: ["Arabic", "English", "French"],
    githubHandle: "fatima-ea",
  },
  {
    id: "WKR-0755",
    name: "Tendai Mabhena",
    headline: "Grid optimization · energy storage analytics · power SCADA",
    city: "Harare",
    country: "Zimbabwe",
    flag: "🇿🇼",
    tier: "Builder",
    verticals: ["Energy & Power", "ML/AI Research"],
    skills: [
      { skill: "Power Systems Modeling", score: 85 },
      { skill: "Reinforcement Learning", score: 78 },
      { skill: "Time-Series Forecasting", score: 83 },
      { skill: "Python / PyPSA", score: 86 },
      { skill: "SCADA Integration", score: 72 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time",
    completionRate: 89,
    agentsBuilt: 18,
    hoursLogged: 280,
    rate: "$40–55 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 18, completionRate: 90, industry: "Energy & Power", verdict: "Advanced" },
    ],
    projects: [
      { title: "Mini-grid load forecaster", vertical: "Energy & Power", role: "ML engineer", outcome: "Reduced diesel top-up by 21% at 3 sites" },
    ],
    bio: "Energy systems engineer transitioning from utility operations into grid ML. Previously ZESA distribution planning.",
    joined: "2024-08-12",
    yearsExp: 4,
    spokenLanguages: ["English", "Shona"],
    githubHandle: "tendai-m",
  },
  {
    id: "WKR-0770",
    name: "Ebere Nnadi",
    headline: "Cryptography · zero-knowledge · applied protocol design",
    city: "Abuja",
    country: "Nigeria",
    flag: "🇳🇬",
    tier: "Operator",
    verticals: ["Cryptography", "ML/AI Research"],
    skills: [
      { skill: "ZK Circuits (Circom/Noir)", score: 90 },
      { skill: "Rust", score: 93 },
      { skill: "Cryptographic Primitives", score: 87 },
      { skill: "Formal Verification", score: 78 },
    ],
    availability: "Partial",
    availabilityDetail: "15 hrs/wk",
    completionRate: 95,
    agentsBuilt: 17,
    hoursLogged: 610,
    rate: "$95–120 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q2", date: "May 2025", agentsBuilt: 17, completionRate: 100, industry: "Cryptography", verdict: "Advanced" },
    ],
    projects: [
      { title: "Private credentials issuance system", vertical: "Cryptography", role: "Protocol engineer", outcome: "Piloted with a state ID agency" },
    ],
    bio: "Applied cryptographer. Contributes to the Noir ecosystem; previously Aztec Protocol contractor.",
    joined: "2023-11-28",
    yearsExp: 8,
    spokenLanguages: ["English", "Igbo"],
    githubHandle: "ebere-n",
  },
  {
    id: "WKR-0812",
    name: "Abdoulaye Diallo",
    headline: "Agritech sensors · LoRaWAN · rural data infrastructure",
    city: "Dakar",
    country: "Senegal",
    flag: "🇸🇳",
    tier: "Builder",
    verticals: ["Agritech", "Edge Computing", "Hardware & Semiconductors"],
    skills: [
      { skill: "LoRaWAN / The Things Network", score: 88 },
      { skill: "PCB Design (KiCad)", score: 81 },
      { skill: "Embedded C", score: 84 },
      { skill: "Field Deployment", score: 90 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time",
    completionRate: 91,
    agentsBuilt: 19,
    hoursLogged: 340,
    rate: "$45–60 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q3", date: "Aug 2025", agentsBuilt: 19, completionRate: 90, industry: "Agritech", verdict: "Advanced" },
    ],
    projects: [
      { title: "Soil-moisture mesh for groundnut farms", vertical: "Agritech", role: "Hardware lead", outcome: "Deployed across 60 hectares in Kaolack region" },
    ],
    bio: "Hardware engineer specialized in rugged, low-cost sensor networks for African agriculture.",
    joined: "2024-04-10",
    yearsExp: 5,
    spokenLanguages: ["French", "Wolof", "English"],
    githubHandle: "abdoulaye-d",
  },
  {
    id: "WKR-0834",
    name: "Rukia Hassan",
    headline: "Medical imaging · diffusion models · radiology AI",
    city: "Dar es Salaam",
    country: "Tanzania",
    flag: "🇹🇿",
    tier: "Operator",
    verticals: ["Health Sciences", "ML/AI Research"],
    skills: [
      { skill: "MONAI", score: 88 },
      { skill: "Diffusion Models", score: 85 },
      { skill: "DICOM / PACS", score: 80 },
      { skill: "PyTorch Lightning", score: 87 },
      { skill: "Regulatory (WHO IMDRF)", score: 72 },
    ],
    availability: "Available",
    availabilityDetail: "25 hrs/wk",
    completionRate: 93,
    agentsBuilt: 20,
    hoursLogged: 455,
    rate: "$70–90 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 20, completionRate: 95, industry: "Health Sciences", verdict: "Advanced" },
    ],
    projects: [
      { title: "TB chest X-ray triage tool", vertical: "Health Sciences", role: "ML lead", outcome: "Piloted in 2 Muhimbili clinics; spec 0.94" },
    ],
    bio: "Medical imaging engineer building clinical AI tools with local radiologists in the loop.",
    joined: "2024-02-19",
    yearsExp: 6,
    spokenLanguages: ["Swahili", "English"],
    githubHandle: "rukia-h",
  },
  {
    id: "WKR-0901",
    name: "Mamadou Traoré",
    headline: "Robotics simulation · reinforcement learning · manipulation",
    city: "Kigali",
    country: "Rwanda",
    flag: "🇷🇼",
    tier: "Builder",
    verticals: ["Robotics", "ML/AI Research"],
    skills: [
      { skill: "Isaac Sim / Gym", score: 82 },
      { skill: "PPO / SAC", score: 80 },
      { skill: "URDF / MuJoCo", score: 78 },
      { skill: "Python", score: 88 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time",
    completionRate: 87,
    agentsBuilt: 17,
    hoursLogged: 260,
    rate: "$45–60 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q3", date: "Aug 2025", agentsBuilt: 17, completionRate: 85, industry: "Robotics", verdict: "Pool" },
    ],
    projects: [
      { title: "Pick-and-place sim-to-real", vertical: "Robotics", role: "RL engineer", outcome: "Transferred with 78% first-grasp success" },
    ],
    bio: "Early-career robotics engineer working through sim-to-real gaps. Carnegie Mellon Africa graduate.",
    joined: "2024-09-02",
    yearsExp: 3,
    spokenLanguages: ["French", "English", "Kinyarwanda"],
    githubHandle: "mamadou-t",
  },
  {
    id: "WKR-0923",
    name: "Selamawit Tadesse",
    headline: "NLP · low-resource languages · speech models",
    city: "Addis Ababa",
    country: "Ethiopia",
    flag: "🇪🇹",
    tier: "Operator",
    verticals: ["ML/AI Research"],
    skills: [
      { skill: "HuggingFace Transformers", score: 92 },
      { skill: "Whisper Fine-tuning", score: 89 },
      { skill: "Tokenization (BPE/SPM)", score: 85 },
      { skill: "Data Curation", score: 90 },
    ],
    availability: "Available",
    availabilityDetail: "30 hrs/wk",
    completionRate: 96,
    agentsBuilt: 22,
    hoursLogged: 520,
    rate: "$65–85 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 20, completionRate: 100, industry: "NLP", verdict: "Advanced" },
      { cohort: "WKT-2025-Q1", date: "Feb 2025", agentsBuilt: 18, completionRate: 90, industry: "NLP", verdict: "Advanced" },
    ],
    projects: [
      { title: "Amharic speech model", vertical: "ML/AI Research", role: "Lead researcher", outcome: "WER 12.4% on Fleurs, open-sourced" },
    ],
    bio: "NLP researcher focused on under-represented African languages. EleutherAI contributor.",
    joined: "2023-10-05",
    yearsExp: 6,
    spokenLanguages: ["Amharic", "English", "Tigrinya"],
    githubHandle: "selam-t",
  },
  {
    id: "WKR-1002",
    name: "Youssef Benali",
    headline: "Aerospace structures · CubeSat avionics · RF systems",
    city: "Casablanca",
    country: "Morocco",
    flag: "🇲🇦",
    tier: "Builder",
    verticals: ["Space Tech", "Hardware & Semiconductors"],
    skills: [
      { skill: "CubeSat Design", score: 84 },
      { skill: "RF / GNU Radio", score: 80 },
      { skill: "STK / Orekit", score: 77 },
      { skill: "Embedded Avionics", score: 82 },
    ],
    availability: "Partial",
    availabilityDetail: "Evenings & weekends",
    completionRate: 90,
    agentsBuilt: 16,
    hoursLogged: 290,
    rate: "$55–70 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q2", date: "May 2025", agentsBuilt: 16, completionRate: 90, industry: "Space Tech", verdict: "Advanced" },
    ],
    projects: [
      { title: "1U CubeSat telemetry board", vertical: "Space Tech", role: "Avionics lead", outcome: "Completed ground qualification; launch slot secured" },
    ],
    bio: "Aerospace engineer working on African university CubeSat programs.",
    joined: "2024-05-20",
    yearsExp: 5,
    spokenLanguages: ["Arabic", "French", "English"],
    githubHandle: "youssef-b",
  },
  {
    id: "WKR-1044",
    name: "Chinelo Obi",
    headline: "Prosthetics · biomechanics · medical device firmware",
    city: "Enugu",
    country: "Nigeria",
    flag: "🇳🇬",
    tier: "Operator",
    verticals: ["Health Sciences", "Robotics", "Hardware & Semiconductors"],
    skills: [
      { skill: "EMG Signal Processing", score: 89 },
      { skill: "Actuator Control", score: 85 },
      { skill: "ISO 13485 (awareness)", score: 74 },
      { skill: "CAD (Fusion 360)", score: 82 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time",
    completionRate: 94,
    agentsBuilt: 19,
    hoursLogged: 610,
    rate: "$60–80 / hr",
    wokkahthons: [
      { cohort: "WKT-2024-Q4", date: "Nov 2024", agentsBuilt: 19, completionRate: 95, industry: "Health Sciences", verdict: "Advanced" },
    ],
    projects: [
      { title: "Below-elbow bionic prototype", vertical: "Health Sciences", role: "Lead engineer", outcome: "3-pattern EMG control; 4 clinical fittings" },
    ],
    bio: "Biomedical engineer building affordable prosthetics for the West African market.",
    joined: "2024-01-14",
    yearsExp: 7,
    spokenLanguages: ["English", "Igbo"],
    githubHandle: "chinelo-o",
  },
  {
    id: "WKR-1110",
    name: "Ibrahim Njoroge",
    headline: "MLOps · LLM systems · evaluation infrastructure",
    city: "Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    tier: "Operator",
    verticals: ["ML/AI Research", "Edge Computing"],
    skills: [
      { skill: "Ray / vLLM", score: 88 },
      { skill: "Evals & Observability", score: 90 },
      { skill: "Kubernetes", score: 84 },
      { skill: "Inference Optimization", score: 86 },
    ],
    availability: "Engaged",
    availabilityDetail: "Until Jul 2026",
    completionRate: 98,
    agentsBuilt: 26,
    hoursLogged: 840,
    rate: "$85–110 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q2", date: "May 2025", agentsBuilt: 20, completionRate: 100, industry: "MLOps", verdict: "Advanced" },
    ],
    projects: [
      { title: "Evaluation harness for Swahili models", vertical: "ML/AI Research", role: "Platform lead", outcome: "Used by 4 African NLP labs" },
    ],
    bio: "MLOps engineer with a strong evals habit. Previously SRE at a fintech scale-up.",
    joined: "2023-08-08",
    yearsExp: 9,
    spokenLanguages: ["English", "Swahili"],
    githubHandle: "ibrahim-n",
  },
  {
    id: "WKR-1180",
    name: "Aminata Sow",
    headline: "Water-resource modeling · hydrology ML · climate adaptation",
    city: "Bamako",
    country: "Mali",
    flag: "🇲🇱",
    tier: "Apprentice",
    verticals: ["Climate Tech", "Agritech"],
    skills: [
      { skill: "Hydrology (SWAT)", score: 75 },
      { skill: "Python Geospatial", score: 80 },
      { skill: "Remote Sensing", score: 72 },
    ],
    availability: "Available",
    availabilityDetail: "Full-time",
    completionRate: 82,
    agentsBuilt: 14,
    hoursLogged: 140,
    rate: "$30–45 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q4", date: "Nov 2025", agentsBuilt: 14, completionRate: 70, industry: "Climate Tech", verdict: "Pool" },
    ],
    projects: [
      { title: "Niger river flood early-warning", vertical: "Climate Tech", role: "Junior researcher", outcome: "Prototype stage; working with regional basin authority" },
    ],
    bio: "Hydrology researcher moving into ML applications. Recently advanced from the Q4 wokkahthon into the active pool.",
    joined: "2025-09-01",
    yearsExp: 2,
    spokenLanguages: ["French", "Bambara"],
    githubHandle: "aminata-s",
  },
  {
    id: "WKR-1211",
    name: "Zanele Dlamini",
    headline: "Quantum software · error-correction research · Qiskit advocate",
    city: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    tier: "Builder",
    verticals: ["ML/AI Research", "Cryptography"],
    skills: [
      { skill: "Qiskit", score: 83 },
      { skill: "Quantum Algorithms", score: 79 },
      { skill: "Python", score: 88 },
      { skill: "LaTeX / Research Writing", score: 90 },
    ],
    availability: "Available",
    availabilityDetail: "Part-time, 15 hrs/wk",
    completionRate: 88,
    agentsBuilt: 15,
    hoursLogged: 220,
    rate: "$50–65 / hr",
    wokkahthons: [
      { cohort: "WKT-2025-Q3", date: "Aug 2025", agentsBuilt: 15, completionRate: 88, industry: "Quantum", verdict: "Advanced" },
    ],
    projects: [
      { title: "Surface-code simulator benchmark", vertical: "ML/AI Research", role: "Researcher", outcome: "Workshop paper at QCE 2025" },
    ],
    bio: "Quantum software researcher and community organizer. PhD student, University of KwaZulu-Natal.",
    joined: "2024-07-11",
    yearsExp: 4,
    spokenLanguages: ["English", "Zulu"],
    githubHandle: "zanele-d",
  },
];

export const COHORTS: Cohort[] = [
  {
    id: "WKT-2026-Q1",
    name: "Q1 Wokkahthon · Climate & Energy",
    window: "Feb 3 — Mar 2, 2026",
    status: "Live",
    enrolled: 186,
    active: 142,
    agentsTarget: 20,
    agentsActual: 14,
    verticalFocus: ["Climate Tech", "Energy & Power", "Agritech"],
    partner: "IHS · Future Africa",
    advancement: 0,
  },
  {
    id: "WKT-2025-Q4",
    name: "Q4 Wokkahthon · Health & Edge",
    window: "Oct 28 — Nov 24, 2025",
    status: "Closed",
    enrolled: 210,
    active: 0,
    agentsTarget: 20,
    agentsActual: 20,
    verticalFocus: ["Health Sciences", "Edge Computing"],
    partner: "Accelerate Africa",
    advancement: 38,
  },
  {
    id: "WKT-2025-Q3",
    name: "Q3 Wokkahthon · Robotics & Defense",
    window: "Aug 5 — Sep 1, 2025",
    status: "Closed",
    enrolled: 178,
    active: 0,
    agentsTarget: 20,
    agentsActual: 20,
    verticalFocus: ["Robotics", "Defense Tech"],
    partner: "Terrahaptics",
    advancement: 41,
  },
  {
    id: "WKT-2025-Q2",
    name: "Q2 Wokkahthon · Crypto & MLOps",
    window: "May 6 — Jun 2, 2025",
    status: "Closed",
    enrolled: 164,
    active: 0,
    agentsTarget: 20,
    agentsActual: 19,
    verticalFocus: ["Cryptography", "ML/AI Research"],
    advancement: 36,
  },
];

// ---------- Matcher: simulated semantic matching ----------

const KEYWORD_MAP: Record<string, string[]> = {
  "drone": ["Robotics", "Defense Tech", "CNN", "SLAM", "ROS"],
  "surveillance": ["Defense Tech", "CNN", "SLAM", "Sensor Fusion"],
  "border": ["Defense Tech", "SLAM", "Sensor Fusion", "Mission Planning"],
  "grid": ["Energy & Power", "Power Systems", "SCADA", "Time-Series"],
  "power": ["Energy & Power", "Power Systems", "SCADA", "Forecast"],
  "solar": ["Energy & Power", "Climate Tech", "Forecasting"],
  "water": ["Climate Tech", "Hydrology", "Geospatial"],
  "flood": ["Climate Tech", "Hydrology", "Remote Sensing"],
  "drought": ["Climate Tech", "Remote Sensing", "Earth Engine"],
  "climate": ["Climate Tech", "Remote Sensing", "Earth Engine"],
  "farm": ["Agritech", "LoRaWAN", "Sensor", "Hydrology"],
  "crop": ["Agritech", "Remote Sensing", "CNN"],
  "soil": ["Agritech", "LoRaWAN", "Sensor"],
  "agri": ["Agritech", "LoRaWAN", "Sensor"],
  "prosthetic": ["Health Sciences", "Robotics", "EMG", "Actuator"],
  "medical": ["Health Sciences", "MONAI", "DICOM"],
  "x-ray": ["Health Sciences", "MONAI", "DICOM"],
  "radiology": ["Health Sciences", "MONAI", "DICOM"],
  "tb": ["Health Sciences", "MONAI"],
  "clinical": ["Health Sciences", "Biotech", "Clinical"],
  "genom": ["Biotech", "Bioinformatics", "Variant"],
  "chip": ["Hardware & Semiconductors", "Verilog", "FPGA", "ASIC"],
  "fpga": ["Hardware & Semiconductors", "Verilog", "FPGA"],
  "silicon": ["Hardware & Semiconductors", "Verilog", "ASIC"],
  "radar": ["Defense Tech", "DSP", "FPGA"],
  "satellite": ["Space Tech", "Remote Sensing", "Earth Engine"],
  "cubesat": ["Space Tech", "Avionics", "RF"],
  "space": ["Space Tech", "Avionics", "RF"],
  "language": ["ML/AI Research", "NLP", "Tokenization"],
  "speech": ["ML/AI Research", "Whisper", "NLP"],
  "translation": ["ML/AI Research", "NLP"],
  "edge": ["Edge Computing", "TinyML", "Quantization"],
  "mobile": ["Edge Computing", "TinyML", "Quantization"],
  "offline": ["Edge Computing", "TinyML"],
  "quantiz": ["Edge Computing", "TinyML"],
  "zk": ["Cryptography", "ZK", "Rust"],
  "zero-knowledge": ["Cryptography", "ZK"],
  "privacy": ["Cryptography", "ZK"],
  "encryption": ["Cryptography"],
  "quantum": ["Cryptography", "ML/AI Research", "Qiskit"],
  "llm": ["ML/AI Research", "Evals", "Inference"],
  "evaluation": ["ML/AI Research", "Evals"],
  "mlops": ["ML/AI Research", "Kubernetes", "Ray"],
};

export interface MatchResult {
  talent: Talent;
  score: number;
  reasons: string[];
}

export function matchTalents(
  query: string,
  filters: {
    tier?: string[];
    availability?: string[];
    verticals?: string[];
  } = {}
): MatchResult[] {
  const q = query.toLowerCase();
  const hits = new Set<string>();
  for (const k of Object.keys(KEYWORD_MAP)) {
    if (q.includes(k)) KEYWORD_MAP[k].forEach((v) => hits.add(v.toLowerCase()));
  }

  const results: MatchResult[] = TALENTS.map((t) => {
    let score = 0;
    const reasons: string[] = [];

    // Vertical overlap
    for (const v of t.verticals) {
      if (hits.has(v.toLowerCase())) {
        score += 22;
        reasons.push(`Primary vertical match: ${v}`);
      }
    }
    // Skill overlap
    for (const s of t.skills) {
      const sl = s.skill.toLowerCase();
      for (const h of hits) {
        if (sl.includes(h) || h.includes(sl.split(" ")[0])) {
          score += 8 * (s.score / 100);
          reasons.push(`${s.skill} · ${s.score}`);
          break;
        }
      }
    }
    // Project context match
    for (const p of t.projects) {
      const text = (p.title + " " + p.outcome + " " + p.role).toLowerCase();
      for (const h of hits) {
        if (text.includes(h)) {
          score += 10;
          reasons.push(`Shipped: ${p.title}`);
          break;
        }
      }
    }
    // Headline match
    for (const h of hits) {
      if (t.headline.toLowerCase().includes(h)) {
        score += 4;
      }
    }
    // Tier bonus
    const tierBonus: Record<string, number> = {
      Principal: 10, Operator: 7, Builder: 4, Apprentice: 1,
    };
    score += tierBonus[t.tier] ?? 0;

    // Availability bonus
    if (t.availability === "Available") score += 6;
    if (t.availability === "Partial") score += 3;

    // Completion quality
    score += (t.completionRate - 80) / 2;

    // Dedupe reasons
    const uniqReasons = Array.from(new Set(reasons)).slice(0, 4);

    return { talent: t, score: Math.max(0, Math.round(score)), reasons: uniqReasons };
  });

  // Apply filters
  let filtered = results.filter((r) => {
    if (filters.tier && filters.tier.length && !filters.tier.includes(r.talent.tier)) return false;
    if (filters.availability && filters.availability.length && !filters.availability.includes(r.talent.availability)) return false;
    if (filters.verticals && filters.verticals.length) {
      const overlap = r.talent.verticals.some((v) => filters.verticals!.includes(v));
      if (!overlap) return false;
    }
    return true;
  });

  // If query was meaningful, drop obvious zero-matches; otherwise return everyone
  if (hits.size > 0) {
    filtered = filtered.filter((r) => r.score >= 15);
  }

  filtered.sort((a, b) => b.score - a.score);
  return filtered;
}

export function getTalent(id: string) {
  return TALENTS.find((t) => t.id === id);
}

export const TIERS = ["Apprentice", "Builder", "Operator", "Principal"] as const;
export const AVAILABILITIES = ["Available", "Partial", "Engaged", "On Leave"] as const;
