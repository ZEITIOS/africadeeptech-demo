import type {
  Challenge,
  Submission,
  Evaluation,
  InterviewSession,
  InterviewAnswer,
  Grant,
  Milestone,
  MilestoneEvidence,
} from "./types";

// =============================================================================
// UUIDs — readable pattern for demo clarity
// =============================================================================

// Challenges
const CH_2025 = "c0000001-0000-0000-0000-000000000001";
const CH_2026 = "c0000001-0000-0000-0000-000000000002";

// Submissions (10)
const SUB_SOLARGRID   = "a1000001-0000-0000-0000-000000000001";
const SUB_CUREBIONICS = "a1000001-0000-0000-0000-000000000002";
const SUB_AQUASENSE   = "a1000001-0000-0000-0000-000000000003";
const SUB_FARMSPEAK   = "a1000001-0000-0000-0000-000000000004";
const SUB_SHIELDDRONE = "a1000001-0000-0000-0000-000000000005";
const SUB_MEDISCAN    = "a1000001-0000-0000-0000-000000000006";
const SUB_CRYPTOVAULT = "a1000001-0000-0000-0000-000000000007";
const SUB_CLIMATENET  = "a1000001-0000-0000-0000-000000000008";
const SUB_NEUROBRIDGE = "a1000001-0000-0000-0000-000000000009";
const SUB_POWERHARVEST = "a1000001-0000-0000-0000-000000000010";

// Evaluations (7)
const EVAL_SOLARGRID   = "e0000001-0000-0000-0000-000000000001";
const EVAL_CUREBIONICS = "e0000001-0000-0000-0000-000000000002";
const EVAL_AQUASENSE   = "e0000001-0000-0000-0000-000000000003";
const EVAL_FARMSPEAK   = "e0000001-0000-0000-0000-000000000004";
const EVAL_SHIELDDRONE = "e0000001-0000-0000-0000-000000000005";
const EVAL_MEDISCAN    = "e0000001-0000-0000-0000-000000000006";
const EVAL_CRYPTOVAULT = "e0000001-0000-0000-0000-000000000007";

// Interview sessions (5)
const INT_SOLARGRID   = "d1000001-0000-0000-0000-000000000001";
const INT_CUREBIONICS = "d1000001-0000-0000-0000-000000000002";
const INT_AQUASENSE   = "d1000001-0000-0000-0000-000000000003";
const INT_SHIELDDRONE = "d1000001-0000-0000-0000-000000000004";
const INT_FARMSPEAK   = "d1000001-0000-0000-0000-000000000005";

// Grants (3)
const GRANT_SOLARGRID   = "f1000001-0000-0000-0000-000000000001";
const GRANT_CUREBIONICS = "f1000001-0000-0000-0000-000000000002";
const GRANT_SHIELDDRONE = "f1000001-0000-0000-0000-000000000003";

// Milestones
const MS_SG_1 = "b1000001-0000-0000-0000-000000000001";
const MS_SG_2 = "b1000001-0000-0000-0000-000000000002";
const MS_SG_3 = "b1000001-0000-0000-0000-000000000003";
const MS_SG_4 = "b1000001-0000-0000-0000-000000000004";
const MS_CB_1 = "b1000001-0000-0000-0000-000000000005";
const MS_CB_2 = "b1000001-0000-0000-0000-000000000006";
const MS_CB_3 = "b1000001-0000-0000-0000-000000000007";
const MS_CB_4 = "b1000001-0000-0000-0000-000000000008";
const MS_SD_1 = "b1000001-0000-0000-0000-000000000009";
const MS_SD_2 = "b1000001-0000-0000-0000-000000000010";
const MS_SD_3 = "b1000001-0000-0000-0000-000000000011";

// Milestone evidence
const EV_SG_1 = "ca000001-0000-0000-0000-000000000001";
const EV_SG_2 = "ca000001-0000-0000-0000-000000000002";
const EV_CB_1 = "ca000001-0000-0000-0000-000000000003";
const EV_CB_2 = "ca000001-0000-0000-0000-000000000004";

// Interview question IDs
const IQ_SG_1 = "q0000001-0000-0000-0000-000000000001";
const IQ_SG_2 = "q0000001-0000-0000-0000-000000000002";
const IQ_SG_3 = "q0000001-0000-0000-0000-000000000003";
const IQ_SG_4 = "q0000001-0000-0000-0000-000000000004";
const IQ_SG_5 = "q0000001-0000-0000-0000-000000000005";
const IQ_SG_6 = "q0000001-0000-0000-0000-000000000006";

const IQ_CB_1 = "q0000001-0000-0000-0000-000000000007";
const IQ_CB_2 = "q0000001-0000-0000-0000-000000000008";
const IQ_CB_3 = "q0000001-0000-0000-0000-000000000009";
const IQ_CB_4 = "q0000001-0000-0000-0000-000000000010";
const IQ_CB_5 = "q0000001-0000-0000-0000-000000000011";

const IQ_AQ_1 = "q0000001-0000-0000-0000-000000000012";
const IQ_AQ_2 = "q0000001-0000-0000-0000-000000000013";
const IQ_AQ_3 = "q0000001-0000-0000-0000-000000000014";
const IQ_AQ_4 = "q0000001-0000-0000-0000-000000000015";
const IQ_AQ_5 = "q0000001-0000-0000-0000-000000000016";
const IQ_AQ_6 = "q0000001-0000-0000-0000-000000000017";

const IQ_SD_1 = "q0000001-0000-0000-0000-000000000018";
const IQ_SD_2 = "q0000001-0000-0000-0000-000000000019";
const IQ_SD_3 = "q0000001-0000-0000-0000-000000000020";
const IQ_SD_4 = "q0000001-0000-0000-0000-000000000021";
const IQ_SD_5 = "q0000001-0000-0000-0000-000000000022";

const IQ_FS_1 = "q0000001-0000-0000-0000-000000000023";
const IQ_FS_2 = "q0000001-0000-0000-0000-000000000024";
const IQ_FS_3 = "q0000001-0000-0000-0000-000000000025";
const IQ_FS_4 = "q0000001-0000-0000-0000-000000000026";
const IQ_FS_5 = "q0000001-0000-0000-0000-000000000027";

// Interview answer IDs
const IA_SG_1 = "a0000001-0000-0000-0000-000000000001";
const IA_SG_2 = "a0000001-0000-0000-0000-000000000002";
const IA_SG_3 = "a0000001-0000-0000-0000-000000000003";
const IA_SG_4 = "a0000001-0000-0000-0000-000000000004";
const IA_SG_5 = "a0000001-0000-0000-0000-000000000005";
const IA_SG_6 = "a0000001-0000-0000-0000-000000000006";

const IA_CB_1 = "a0000001-0000-0000-0000-000000000007";
const IA_CB_2 = "a0000001-0000-0000-0000-000000000008";
const IA_CB_3 = "a0000001-0000-0000-0000-000000000009";
const IA_CB_4 = "a0000001-0000-0000-0000-000000000010";
const IA_CB_5 = "a0000001-0000-0000-0000-000000000011";

const IA_AQ_1 = "a0000001-0000-0000-0000-000000000012";
const IA_AQ_2 = "a0000001-0000-0000-0000-000000000013";
const IA_AQ_3 = "a0000001-0000-0000-0000-000000000014";

const IA_FS_1 = "a0000001-0000-0000-0000-000000000015";
const IA_FS_2 = "a0000001-0000-0000-0000-000000000016";
const IA_FS_3 = "a0000001-0000-0000-0000-000000000017";
const IA_FS_4 = "a0000001-0000-0000-0000-000000000018";
const IA_FS_5 = "a0000001-0000-0000-0000-000000000019";

// User IDs
const USR_1  = "usr_participant_1";
const USR_2  = "usr_participant_2";
const USR_3  = "usr_participant_3";
const USR_4  = "usr_participant_4";
const USR_5  = "usr_participant_5";
const USR_6  = "usr_participant_6";
const USR_7  = "usr_participant_7";
const USR_8  = "usr_participant_8";
const USR_9  = "usr_participant_9";
const USR_10 = "usr_participant_10";

// =============================================================================
// CHALLENGES
// =============================================================================

export const CHALLENGES: Challenge[] = [
  {
    id: CH_2025,
    name: "Africa DeepTech Challenge 2025 — Resource-Constrained Computing",
    description:
      "Build a working prototype that demonstrates creative problem-solving under real-world constraints common across Africa: limited compute, intermittent connectivity, power instability, and cost-sensitive hardware. Projects must target an actual use case and be deployable on sub-$100 hardware.",
    year: 2025,
    status: "closed",
    criteria: [
      {
        name: "Technical Implementation",
        weight: 35,
        description:
          "Quality of engineering: code architecture, algorithm efficiency, error handling, and ability to run on resource-constrained hardware.",
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        description:
          "Originality of the approach to working within constraints. Novel trade-offs, clever workarounds, and unconventional architectures.",
      },
      {
        name: "Process Documentation",
        weight: 20,
        description:
          "Clarity of decision logs, README, architecture diagrams, and reproducibility of the build process.",
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        description:
          "Practical applicability to the target use case. Evidence of user testing or stakeholder feedback.",
      },
    ],
    created_at: "2025-01-15T09:00:00Z",
  },
  {
    id: CH_2026,
    name: "Africa DeepTech Challenge 2026 — AI for Africa",
    description:
      "Design and build an AI-powered solution that addresses a pressing challenge on the African continent. Projects should demonstrate technical depth, cultural awareness, and a viable path to deployment. Bonus consideration for solutions that work offline or on low-bandwidth networks.",
    year: 2026,
    status: "active",
    criteria: [
      {
        name: "Technical Implementation",
        weight: 30,
        description:
          "Model architecture choices, training methodology, inference optimization, and engineering quality.",
      },
      {
        name: "Innovation & Originality",
        weight: 25,
        description:
          "Novelty of the approach. Unique datasets, creative model adaptations, or new applications of existing techniques.",
      },
      {
        name: "Documentation & Reproducibility",
        weight: 20,
        description:
          "Experiment tracking, model cards, data documentation, and the ability for others to reproduce or extend the work.",
      },
      {
        name: "Impact & Scalability",
        weight: 25,
        description:
          "Potential to create measurable impact at scale. Viable deployment plan, cost analysis, and evidence of demand.",
      },
    ],
    created_at: "2026-01-10T09:00:00Z",
  },
];

// =============================================================================
// SUBMISSIONS
// =============================================================================

export const SUBMISSIONS: Submission[] = [
  // 1. SolarGrid AI — EVALUATED (Advance, 87)
  {
    id: SUB_SOLARGRID,
    challenge_id: CH_2025,
    user_id: USR_1,
    participant_name: "Adaeze Okonkwo",
    team_name: "SolarGrid AI",
    repo_url: "https://github.com/solargrid-ai/edge-optimizer",
    documentation_url: "https://solargrid-ai.notion.site/docs",
    video_pitch_url: "https://www.loom.com/share/solargrid-ai-pitch-2025",
    description:
      "An edge ML system that optimizes electricity distribution across solar mini-grids in real time. The model runs on a Raspberry Pi 4 and uses load forecasting, battery state-of-charge prediction, and demand-response signals to reduce diesel generator dependency by up to 30%. Trained on 14 months of real metering data from 3 mini-grid sites in Ogun State.",
    claimed_technologies: ["TensorFlow Lite", "Raspberry Pi", "MQTT", "Python", "InfluxDB", "Grafana"],
    country: "Nigeria",
    city: "Lagos",
    status: "evaluated",
    created_at: "2025-03-10T14:22:00Z",
  },
  // 2. CureBionics — EVALUATED (Advance, 92)
  {
    id: SUB_CUREBIONICS,
    challenge_id: CH_2025,
    user_id: USR_2,
    participant_name: "Youssef Benali",
    team_name: "CureBionics",
    repo_url: "https://github.com/curebionics/emg-prosthetic",
    documentation_url: "https://curebionics.gitbook.io/docs",
    video_pitch_url: "https://www.loom.com/share/curebionics-pitch-2025",
    description:
      "A low-cost below-elbow bionic prosthetic that uses surface EMG sensors to detect muscle activation patterns and translate them into grip commands. The housing is 3D-printed from recycled PETG, and the control board runs on an STM32 microcontroller drawing under 200mA. Total bill of materials is $85, compared to $3,000+ for imported alternatives. Tested with 6 patients at CHU Ibn Rochd hospital.",
    claimed_technologies: ["STM32", "EMG Signal Processing", "3D Printing", "C/C++", "FreeRTOS", "Fusion 360"],
    country: "Morocco",
    city: "Casablanca",
    status: "evaluated",
    created_at: "2025-03-08T11:45:00Z",
  },
  // 3. AquaSense — EVALUATED (Advance, 78)
  {
    id: SUB_AQUASENSE,
    challenge_id: CH_2025,
    user_id: USR_3,
    participant_name: "Njeri Wambui",
    team_name: "AquaSense",
    repo_url: "https://github.com/aquasense-iot/lorawan-monitor",
    video_pitch_url: "https://www.loom.com/share/aquasense-pitch-2025",
    description:
      "An IoT water quality monitoring network using LoRaWAN sensors deployed across community boreholes in Kiambu County. Each node measures pH, turbidity, dissolved oxygen, and temperature, transmitting readings every 15 minutes to a central dashboard. Anomaly detection runs on a lightweight gradient-boosted model that triggers SMS alerts to county water officers when contamination thresholds are breached.",
    claimed_technologies: ["LoRaWAN", "The Things Network", "ESP32", "scikit-learn", "Node.js", "Twilio"],
    country: "Kenya",
    city: "Nairobi",
    status: "evaluated",
    created_at: "2025-03-12T08:30:00Z",
  },
  // 4. FarmSpeak — EVALUATED (Review, 65)
  {
    id: SUB_FARMSPEAK,
    challenge_id: CH_2025,
    user_id: USR_4,
    participant_name: "Kwame Mensah",
    team_name: "FarmSpeak",
    repo_url: "https://github.com/farmspeak/crop-scanner",
    description:
      "An offline crop disease detection app that runs entirely on a smartphone camera without internet connectivity. The MobileNetV2 model was fine-tuned on 12,000 images of maize, cassava, and cocoa diseases common in West Africa. Inference takes under 2 seconds on mid-range Android phones. Includes voice-based results in Twi and Ewe for farmers who are not literate.",
    claimed_technologies: ["TensorFlow Lite", "Android", "Kotlin", "MobileNetV2", "MediaPipe"],
    country: "Ghana",
    city: "Accra",
    status: "evaluated",
    created_at: "2025-03-14T16:10:00Z",
  },
  // 5. ShieldDrone — EVALUATED (Advance, 85)
  {
    id: SUB_SHIELDDRONE,
    challenge_id: CH_2025,
    user_id: USR_5,
    participant_name: "Emeka Okafor",
    team_name: "ShieldDrone",
    repo_url: "https://github.com/shielddrone/uav-surveillance",
    documentation_url: "https://shielddrone.readthedocs.io",
    video_pitch_url: "https://www.loom.com/share/shielddrone-pitch-2025",
    description:
      "An autonomous border surveillance UAV system that uses onboard computer vision to detect and classify unauthorized crossings in real time. The perception stack runs on an NVIDIA Jetson Orin Nano and fuses RGB, thermal, and LiDAR data. The system operates autonomously for 45-minute missions with automatic return-to-base and can cover a 12km patrol corridor. Designed for use by national security agencies in terrain where ground patrols are impractical.",
    claimed_technologies: ["ROS 2", "NVIDIA Jetson", "YOLOv8", "LiDAR", "PX4", "C++", "Python"],
    country: "Nigeria",
    city: "Abuja",
    status: "evaluated",
    created_at: "2025-03-09T09:15:00Z",
  },
  // 6. MediScan — EVALUATED (Review, 71)
  {
    id: SUB_MEDISCAN,
    challenge_id: CH_2025,
    user_id: USR_6,
    participant_name: "Selamawit Gebru",
    team_name: "MediScan",
    video_pitch_url: "https://www.loom.com/share/mediscan-pitch-2025",
    description:
      "A portable sickle-cell screening device that uses a smartphone microscope attachment and a trained convolutional neural network to identify sickle-shaped red blood cells in peripheral blood smears. The device costs under $15 to manufacture and the app runs offline on Android 8+. Preliminary testing at Tikur Anbessa Hospital showed 89% sensitivity and 93% specificity compared to gold-standard hemoglobin electrophoresis.",
    claimed_technologies: ["PyTorch Mobile", "Android", "OpenCV", "3D Printing", "Java"],
    country: "Ethiopia",
    city: "Addis Ababa",
    status: "evaluated",
    created_at: "2025-03-11T13:00:00Z",
  },
  // 7. CryptoVault — EVALUATED (Reject, 42)
  {
    id: SUB_CRYPTOVAULT,
    challenge_id: CH_2025,
    user_id: USR_7,
    participant_name: "Jean-Pierre Habimana",
    team_name: "CryptoVault",
    repo_url: "https://github.com/cryptovault-rw/zk-identity",
    description:
      "A zero-knowledge proof identity verification system for mobile banking in East Africa. Uses zk-SNARKs to allow users to prove their identity to financial institutions without revealing underlying personal data. Built on a Circom circuit that generates proofs on-device in under 10 seconds on modern smartphones.",
    claimed_technologies: ["Circom", "SnarkJS", "React Native", "Node.js", "Solidity"],
    country: "Rwanda",
    city: "Kigali",
    status: "evaluated",
    created_at: "2025-03-15T10:20:00Z",
  },
  // 8. ClimateNet — PENDING
  {
    id: SUB_CLIMATENET,
    challenge_id: CH_2025,
    user_id: USR_8,
    participant_name: "Fatima El-Amin",
    team_name: "ClimateNet",
    repo_url: "https://github.com/climatenet-eg/sat-predict",
    description:
      "A satellite-based climate prediction model that downscales ERA5 reanalysis data to 1km resolution for North Africa using a conditional diffusion model. The system ingests Sentinel-2 imagery and MODIS land surface temperature to produce 7-day precipitation and temperature forecasts tailored to Egyptian agricultural zones.",
    claimed_technologies: ["Python", "xarray", "PyTorch", "Diffusion Models", "Google Earth Engine", "dask"],
    country: "Egypt",
    city: "Cairo",
    status: "pending",
    created_at: "2025-03-18T07:45:00Z",
  },
  // 9. NeuroBridge — PENDING
  {
    id: SUB_NEUROBRIDGE,
    challenge_id: CH_2025,
    user_id: USR_9,
    participant_name: "Zanele Dlamini",
    team_name: "NeuroBridge",
    description:
      "A brain-computer interface system for paralysis rehabilitation that uses low-cost EEG headsets to detect motor imagery patterns and drive a gamified physical therapy protocol. The system adapts difficulty in real time based on patient engagement and neural signal quality, making neuroplasticity-driven rehab accessible outside specialist hospitals.",
    claimed_technologies: ["Python", "OpenBCI", "scikit-learn", "Unity", "C#", "WebSocket"],
    country: "South Africa",
    city: "Cape Town",
    status: "pending",
    created_at: "2025-03-19T15:30:00Z",
  },
  // 10. PowerHarvest — EVALUATING
  {
    id: SUB_POWERHARVEST,
    challenge_id: CH_2025,
    user_id: USR_10,
    participant_name: "Amina Juma",
    team_name: "PowerHarvest",
    repo_url: "https://github.com/powerharvest-tz/piezo-energy",
    video_pitch_url: "https://www.loom.com/share/powerharvest-pitch-2025",
    description:
      "A piezoelectric energy harvesting system that generates electricity from pedestrian foot traffic in high-density areas such as bus terminals and markets. Each tile module produces 5-8W under sustained traffic and stores energy in supercapacitors for charging mobile phones and powering LED lighting. The system was tested at Kariakoo Market with over 2,000 daily footfalls recorded.",
    claimed_technologies: ["Arduino", "Piezoelectric Ceramics", "PCB Design", "C", "React", "Firebase"],
    country: "Tanzania",
    city: "Dar es Salaam",
    status: "evaluating",
    created_at: "2025-03-16T12:00:00Z",
  },
];

// =============================================================================
// EVALUATIONS
// =============================================================================

export const EVALUATIONS: Evaluation[] = [
  // 1. SolarGrid AI — 87, Advance
  {
    id: EVAL_SOLARGRID,
    submission_id: SUB_SOLARGRID,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 90,
        reasoning:
          "The edge ML pipeline is well-architected with clear separation between data ingestion, feature engineering, and inference. The TFLite model achieves sub-100ms inference on a Raspberry Pi 4, and the MQTT-based communication protocol handles intermittent connectivity gracefully with local buffering. Error handling is thorough with fallback heuristics when the model cannot produce a confident prediction.",
        strengths: [
          "Sub-100ms inference latency on target hardware",
          "Graceful degradation under connectivity loss with local decision buffer",
          "Real metering data from 3 operational sites validates the approach",
        ],
        weaknesses: [
          "No automated model retraining pipeline — model drift could be an issue after 6+ months",
          "Battery state-of-charge estimation relies on voltage curves that vary by chemistry",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 88,
        reasoning:
          "The team made several clever trade-offs: using a hybrid rule-based + ML approach where the model handles demand forecasting but a deterministic controller manages safety-critical battery cutoffs. The decision to use MQTT over HTTP reduces bandwidth requirements by 94% in their testing. The rolling-horizon optimization approach is well-suited to the intermittent data availability.",
        strengths: [
          "Hybrid ML + rule-based architecture balances accuracy with safety",
          "MQTT protocol choice dramatically reduces bandwidth requirements",
        ],
        weaknesses: [
          "The demand-response signaling mechanism is simplistic and would not scale to larger grids",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 82,
        reasoning:
          "Good README with architecture diagrams and deployment instructions. Decision log explains key trade-offs but lacks dates and authorship. The Notion documentation covers setup well but is missing troubleshooting guides for field deployment scenarios.",
        strengths: [
          "Clear architecture diagrams with data flow annotations",
          "Reproducible Docker-based setup for the dashboard component",
        ],
        weaknesses: [
          "Decision log is sparse — key choices like model architecture selection are documented but lack context on alternatives considered",
          "No hardware BOM or assembly guide for the sensor node",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 85,
        reasoning:
          "Direct applicability to a well-documented problem: diesel dependency in African mini-grids. The 30% diesel reduction claim is backed by 14 months of comparative data. The Grafana dashboard is functional but could be more accessible to non-technical grid operators. Evidence of iteration based on feedback from mini-grid operators at Arnergy.",
        strengths: [
          "Validated diesel reduction metrics from real field deployment",
          "Partnership with an established mini-grid operator provides deployment path",
        ],
        weaknesses: [
          "Dashboard assumes English literacy and basic data visualization competency",
        ],
      },
    ],
    overall_score: 87,
    recommendation: "Advance",
    summary:
      "SolarGrid AI presents a technically strong edge ML system with real-world validation data from 3 Nigerian mini-grid sites. The hybrid ML + rule-based architecture is a pragmatic choice for safety-critical energy infrastructure. The 30% diesel reduction claim is well-supported. Minor gaps in documentation and dashboard accessibility do not diminish the core technical achievement. Recommended to advance to the interview stage.",
    code_analysis: {
      languages: ["Python", "JavaScript", "Shell"],
      quality:
        "Well-structured Python codebase with type hints, unit tests covering core inference logic, and clear module separation. JavaScript dashboard code is functional but less polished. CI pipeline uses GitHub Actions for linting and testing.",
      architecture_notes:
        "Monorepo with /edge (TFLite inference), /gateway (MQTT broker + InfluxDB writer), and /dashboard (Grafana + custom React panels). Clean separation of concerns. The edge module could benefit from a more formal state machine for operational modes.",
    },
    video_analysis: {
      transcript:
        "Our team built SolarGrid AI to tackle one of the biggest barriers to mini-grid viability in Nigeria: diesel generator dependency. We deployed edge ML models on Raspberry Pi units at three sites in Ogun State. The system predicts load demand 4 hours ahead and optimizes battery dispatch to minimize generator runtime. Over 14 months we measured a 30% reduction in diesel consumption.",
      presentation_quality: 82,
      technical_understanding: 90,
      key_points: [
        "30% diesel reduction validated over 14 months at 3 sites",
        "Sub-100ms inference on Raspberry Pi 4 hardware",
        "Hybrid ML + rule-based safety architecture",
        "Partnership with Arnergy for commercial deployment",
      ],
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 48200,
    created_at: "2025-04-02T10:15:00Z",
  },

  // 2. CureBionics — 92, Advance
  {
    id: EVAL_CUREBIONICS,
    submission_id: SUB_CUREBIONICS,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 95,
        reasoning:
          "Exceptional embedded systems engineering. The EMG signal processing pipeline runs on an STM32F4 at 1kHz sampling rate with real-time feature extraction and a lightweight neural classifier that achieves 94% grip pattern recognition accuracy across 3 distinct patterns. Power management is elegant — the entire system draws under 200mA and achieves 18-hour battery life. The mechanical design uses a clever underactuated linkage that reduces actuator count from 5 to 2 while maintaining functional grip capability.",
        strengths: [
          "94% grip pattern recognition with only 2 surface EMG channels",
          "Underactuated mechanical design reduces cost and complexity significantly",
          "$85 BOM vs $3,000+ for imported alternatives — genuine cost breakthrough",
          "18-hour battery life on a single charge",
        ],
        weaknesses: [
          "Limited to 3 grip patterns — expansion would require architecture changes",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 92,
        reasoning:
          "The team's approach to cost reduction is genuinely creative. Using recycled PETG for 3D-printed housing, designing an underactuated mechanism to reduce motor count, and implementing a multi-stage EMG classifier that runs on a $12 microcontroller are all smart engineering choices. The decision to use surface EMG instead of implantable sensors makes the device practical for the target market.",
        strengths: [
          "Underactuated linkage is a novel mechanical solution for this price point",
          "Recycled PETG housing is both cost-effective and environmentally conscious",
          "Multi-stage classifier architecture handles noisy EMG signals robustly",
        ],
        weaknesses: [
          "Calibration process still requires a trained technician — limiting scale without further automation",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 88,
        reasoning:
          "Comprehensive GitBook documentation covering mechanical assembly, firmware flashing, EMG calibration, and patient fitting procedures. Includes a detailed BOM with supplier links for sourcing in Africa. Decision logs are timestamped and reference specific patient feedback sessions. CAD files are provided in both Fusion 360 native and STEP formats.",
        strengths: [
          "Detailed BOM with African supplier links — not just Mouser/Digikey",
          "Patient fitting guide with photos and troubleshooting steps",
          "Full CAD files in multiple formats for reproducibility",
        ],
        weaknesses: [
          "Firmware documentation could include more inline code comments for future contributors",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 91,
        reasoning:
          "Direct clinical testing with 6 patients at CHU Ibn Rochd demonstrates real-world applicability. The $85 price point is genuinely transformative for the market. Feedback from prosthetists was incorporated into the design — specifically the quick-release socket mechanism that was added after the first 2 fittings. The team has a clear pathway to regulatory approval through Morocco's ANAM.",
        strengths: [
          "Clinical testing with real patients at a teaching hospital",
          "Iterative design based on prosthetist and patient feedback",
          "Clear regulatory pathway identified and documented",
        ],
        weaknesses: [
          "Only tested on below-elbow amputations — market sizing should address other amputation levels",
        ],
      },
    ],
    overall_score: 92,
    recommendation: "Advance",
    summary:
      "CureBionics is the strongest submission in this cohort. The $85 bionic prosthetic represents a genuine 35x cost reduction over imported alternatives, backed by clinical testing at a major teaching hospital. The embedded systems engineering is exemplary — running a real-time EMG classifier on a $12 microcontroller is impressive. The underactuated mechanical design is creative and practical. Documentation is thorough and clearly written for reproducibility across African fabrication labs. Strongly recommended to advance.",
    code_analysis: {
      languages: ["C", "C++", "Python"],
      quality:
        "Firmware is clean, well-commented C with clear state machine architecture. Python scripts for EMG training are functional with good data pipeline separation. Unit tests cover signal processing math. Build system uses PlatformIO with reproducible CI.",
      architecture_notes:
        "Firmware uses a layered architecture: HAL drivers → signal processing → feature extraction → classifier → actuator control. Clean separation makes it possible to swap the classifier without touching hardware abstraction. Python training pipeline is separate and produces quantized TFLite models that are compiled to C arrays for the STM32.",
    },
    video_analysis: {
      transcript:
        "CureBionics started from a simple question: why does a bionic hand cost three thousand dollars when the components inside it cost less than a hundred? We built a below-elbow prosthetic from scratch using surface EMG, an STM32 microcontroller, and 3D-printed parts from recycled plastic. We have tested it with six patients at CHU Ibn Rochd and the results exceeded our expectations. We believe affordable prosthetics should be manufactured in Africa, for Africa.",
      presentation_quality: 90,
      technical_understanding: 95,
      key_points: [
        "$85 BOM — 35x cheaper than imported alternatives",
        "94% grip pattern recognition with 2-channel surface EMG",
        "6-patient clinical testing at CHU Ibn Rochd hospital",
        "3D-printed from recycled PETG for local manufacturability",
      ],
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 52100,
    created_at: "2025-04-01T14:30:00Z",
  },

  // 3. AquaSense — 78, Advance
  {
    id: EVAL_AQUASENSE,
    submission_id: SUB_AQUASENSE,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 80,
        reasoning:
          "Solid IoT implementation with appropriate technology choices. LoRaWAN provides the range needed for rural borehole coverage without cellular costs. The anomaly detection model is a well-tuned Isolation Forest that handles the noisy sensor data reasonably well. The Node.js backend is functional but shows signs of rapid prototyping — some endpoints lack input validation and error handling is inconsistent.",
        strengths: [
          "LoRaWAN gateway covers 8km radius with reliable packet delivery",
          "Isolation Forest handles sensor noise better than threshold-based alternatives",
          "SMS alert system integrates well with existing county water officer workflows",
        ],
        weaknesses: [
          "Backend lacks input validation on several API endpoints",
          "No sensor calibration drift compensation — accuracy will degrade over time",
          "Dashboard is not mobile-responsive despite target users primarily using phones",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 75,
        reasoning:
          "Good choice of LoRaWAN over cellular for cost reasons, and the decision to use SMS alerts rather than app notifications shows understanding of the target users. The multi-sensor fusion approach is standard but well-executed. The solar-powered sensor nodes are a practical necessity rather than an innovation.",
        strengths: [
          "SMS-based alerts match the communication preferences of county water officers",
          "Solar-powered nodes eliminate the need for grid connection at borehole sites",
        ],
        weaknesses: [
          "Anomaly detection approach is relatively standard — limited novelty in the ML component",
          "No offline capability for the dashboard",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 76,
        reasoning:
          "README covers setup and deployment but lacks depth on sensor calibration procedures and field maintenance. Architecture diagram exists but is a simple box-and-arrow sketch without data flow annotations. No decision log documenting technology selection rationale.",
        strengths: [
          "Clear deployment guide with photos of installed sensor nodes",
          "Wiring diagrams for the sensor node assembly",
        ],
        weaknesses: [
          "No decision log or architecture decision records",
          "Sensor calibration procedure is undocumented",
          "Missing maintenance and troubleshooting guide for field technicians",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 80,
        reasoning:
          "Strong problem-market fit — waterborne disease from contaminated boreholes is a well-documented issue in Kiambu County. The partnership with county water authorities provides a deployment pathway. However, the dashboard UX needs work to be usable by water officers who may have limited technical literacy.",
        strengths: [
          "Partnership with Kiambu County Water Authority validates demand",
          "SMS alerts are actionable and context-rich",
        ],
        weaknesses: [
          "Dashboard requires significant UX improvement for target user group",
          "No Swahili language support despite target users being primarily Swahili-speaking",
        ],
      },
    ],
    overall_score: 78,
    recommendation: "Advance",
    summary:
      "AquaSense demonstrates solid IoT engineering applied to a real public health problem. The LoRaWAN + SMS architecture is well-matched to the infrastructure constraints of rural Kenya. The Isolation Forest anomaly detection works but is not particularly novel. Documentation and dashboard UX are the weakest areas. The county water authority partnership provides strong deployment credibility. Recommended to advance with the expectation that documentation and UX gaps are addressed during the interview.",
    code_analysis: {
      languages: ["JavaScript", "Python", "C++"],
      quality:
        "Node.js backend is functional but shows rapid prototype characteristics. Arduino firmware for sensor nodes is clean. Python ML pipeline is adequate. Limited test coverage — only 3 unit tests found in the repository.",
      architecture_notes:
        "Three-tier: ESP32 sensor nodes → LoRaWAN gateway → Node.js API + PostgreSQL. Dashboard is a separate React app. The architecture is sound but the backend would benefit from proper middleware for auth and validation.",
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 41800,
    created_at: "2025-04-03T09:00:00Z",
  },

  // 4. FarmSpeak — 65, Review
  {
    id: EVAL_FARMSPEAK,
    submission_id: SUB_FARMSPEAK,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 68,
        reasoning:
          "The MobileNetV2 fine-tuning achieves reasonable accuracy (83% on held-out test set) but the model was trained on a limited dataset that skews heavily toward maize — cassava and cocoa disease classes are underrepresented. Inference speed of under 2 seconds on mid-range Android is acceptable. The offline-first architecture works but lacks a sync mechanism for when connectivity is available. The voice output feature using Android TTS is functional but pronunciation of Twi agricultural terms is often incorrect.",
        strengths: [
          "Fully offline inference on mid-range Android hardware",
          "Sub-2-second inference time is acceptable for field use",
          "Voice output feature addresses literacy barriers",
        ],
        weaknesses: [
          "Dataset imbalance: 70% maize, 20% cassava, 10% cocoa — performance on minority classes is poor",
          "No data sync mechanism when connectivity is available",
          "TTS pronunciation of Twi terms is inaccurate and could mislead users",
          "No confidence threshold — the model always returns a prediction even when uncertain",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 62,
        reasoning:
          "The voice-based results feature is a thoughtful inclusion for the target audience. However, the underlying ML approach is a straightforward transfer learning exercise without significant creative adaptation for the resource-constrained context. No novel data augmentation strategies for the limited training data.",
        strengths: [
          "Voice output for low-literacy users is a considerate design choice",
          "Android-only focus is pragmatic for the target market",
        ],
        weaknesses: [
          "Standard transfer learning approach without novel adaptation",
          "No active learning or user feedback loop to improve the model over time",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 60,
        reasoning:
          "README exists but is sparse. No architecture diagrams. The model training notebook is provided but lacks markdown explanation cells. No documentation of the dataset collection process or data governance approach. No decision log.",
        strengths: [
          "Training notebook is reproducible with clear cell outputs",
        ],
        weaknesses: [
          "No architecture diagram or system overview",
          "Dataset collection methodology is undocumented",
          "No data governance or ethics documentation for agricultural imagery",
          "Missing APK build instructions",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 68,
        reasoning:
          "The problem is highly relevant — crop disease identification is a real need for smallholder farmers. However, the limited crop coverage (3 crops) and poor Twi TTS quality reduce practical utility. No evidence of user testing with actual farmers. The UI is functional but not designed for outdoor visibility or one-handed use in the field.",
        strengths: [
          "Addresses a well-documented need in West African agriculture",
          "Offline capability matches the connectivity reality of rural farming areas",
        ],
        weaknesses: [
          "No evidence of user testing with target farmers",
          "UI not optimized for outdoor use — low contrast, small touch targets",
          "Only 3 crop types covered limits practical value",
        ],
      },
    ],
    overall_score: 65,
    recommendation: "Review",
    summary:
      "FarmSpeak addresses a real need but the execution has significant gaps. The dataset imbalance undermines accuracy for 2 of the 3 target crops. The Twi voice feature is a good idea but poorly executed with current TTS quality. Documentation is below the expected standard. The team should address dataset balance, add user testing evidence, and improve documentation before reconsideration. Recommended for review — potential to advance if gaps are addressed.",
    code_analysis: {
      languages: ["Kotlin", "Python"],
      quality:
        "Kotlin Android code is reasonably structured with MVVM architecture. Python training code is notebook-based without proper packaging. No unit tests. Gradle build configuration is standard.",
      architecture_notes:
        "Single Android app with embedded TFLite model. No backend component. The architecture is simple, which is appropriate for an offline app, but the lack of any data collection or sync mechanism limits the ability to improve the model over time.",
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 38500,
    created_at: "2025-04-04T11:20:00Z",
  },

  // 5. ShieldDrone — 85, Advance
  {
    id: EVAL_SHIELDDRONE,
    submission_id: SUB_SHIELDDRONE,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 90,
        reasoning:
          "Sophisticated perception stack that fuses RGB, thermal, and LiDAR data in real time on a Jetson Orin Nano. The multi-modal fusion approach achieves 96% detection accuracy in daytime and 89% at night using thermal fallback. The PX4 integration for autonomous flight is well-implemented with proper failsafe modes. The YOLOv8 model was custom-trained on a proprietary dataset of border crossing scenarios. Flight controller communication uses MAVLink with redundant telemetry channels.",
        strengths: [
          "Multi-modal sensor fusion (RGB + thermal + LiDAR) is sophisticated",
          "96% daytime / 89% nighttime detection accuracy",
          "Proper failsafe modes for autonomous operation",
          "45-minute autonomous mission duration is competitive",
        ],
        weaknesses: [
          "Jetson Orin Nano power consumption limits flight time vs. lighter compute alternatives",
          "No encrypted telemetry channel — security concern for defense application",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 82,
        reasoning:
          "The thermal fallback for nighttime operation is well-implemented. The adaptive patrol routing algorithm that adjusts to historical crossing patterns is a smart feature. The decision to use LiDAR for terrain-following in low-altitude flight shows good systems thinking. However, the overall architecture follows established UAV surveillance patterns rather than introducing fundamentally new approaches.",
        strengths: [
          "Adaptive patrol routing based on historical crossing data",
          "Terrain-following LiDAR mode enables low-altitude operations in rough terrain",
        ],
        weaknesses: [
          "Architecture follows established patterns — limited fundamental innovation",
          "No edge case handling for adverse weather conditions beyond wind speed limits",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 80,
        reasoning:
          "ReadTheDocs documentation is well-organized with clear API references, system architecture diagrams, and deployment procedures. The simulation environment for testing is documented. Some gaps in the hardware assembly guide and power budget analysis.",
        strengths: [
          "Comprehensive ReadTheDocs with architecture diagrams",
          "Simulation environment setup is well-documented",
          "API documentation is thorough",
        ],
        weaknesses: [
          "Hardware assembly guide lacks detail on wiring harness and vibration dampening",
          "No power budget analysis for mission planning",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 84,
        reasoning:
          "Clear use case with identified stakeholders in national security agencies. The system addresses a genuine operational gap where ground patrols are impractical. The autonomous mission capability reduces operator training requirements. However, regulatory and ethical considerations for UAV surveillance are not adequately addressed in the documentation.",
        strengths: [
          "Addresses a real operational gap in border security",
          "Autonomous capability reduces operator skill requirements",
          "Ground control station UI is well-designed for non-specialist operators",
        ],
        weaknesses: [
          "Regulatory compliance (UAV airspace) not addressed",
          "No ethical framework for autonomous surveillance operations",
        ],
      },
    ],
    overall_score: 85,
    recommendation: "Advance",
    summary:
      "ShieldDrone demonstrates strong systems engineering across perception, flight control, and ground station components. The multi-modal sensor fusion is the technical highlight. Some gaps in security (unencrypted telemetry) and regulatory/ethical documentation should be addressed. Recommended to advance — the team should be asked about their approach to encrypted communications and regulatory compliance during the interview.",
    code_analysis: {
      languages: ["C++", "Python", "Shell"],
      quality:
        "C++ codebase is well-structured with proper ROS 2 packaging and lifecycle management. Python perception code uses clean interfaces. Build system is well-configured with proper dependency management. Integration tests exist for the simulation environment.",
      architecture_notes:
        "ROS 2-based architecture with distinct nodes: perception, planning, control, and telemetry. The perception node handles sensor fusion and runs the YOLO inference pipeline. Clean service/topic separation. Docker-based deployment for the ground station.",
    },
    video_analysis: {
      transcript:
        "ShieldDrone is an autonomous surveillance system designed for border security in terrain where ground patrols are dangerous or impractical. Our UAV carries three sensor modalities: RGB camera, thermal camera, and a compact LiDAR for terrain following. All processing happens onboard using an NVIDIA Jetson Orin Nano. A single operator can manage multiple autonomous patrol missions from a ground control station. We have tested in simulated border environments and achieved 96% detection accuracy in daylight conditions.",
      presentation_quality: 85,
      technical_understanding: 92,
      key_points: [
        "Multi-modal sensor fusion: RGB + thermal + LiDAR",
        "96% daylight detection accuracy on Jetson Orin Nano",
        "45-minute autonomous patrol missions",
        "Single-operator multi-drone management capability",
      ],
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 46700,
    created_at: "2025-04-02T16:45:00Z",
  },

  // 6. MediScan — 71, Review
  {
    id: EVAL_MEDISCAN,
    submission_id: SUB_MEDISCAN,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 74,
        reasoning:
          "The CNN classifier achieves 89% sensitivity and 93% specificity, which is promising for a screening tool but below the threshold for diagnostic use. The smartphone microscope attachment is a clever hardware solution but image quality varies significantly across phone models. The PyTorch Mobile model runs offline but takes 4-6 seconds on older devices, which is slower than claimed. The app handles the image capture → preprocessing → inference pipeline adequately.",
        strengths: [
          "89% sensitivity / 93% specificity is reasonable for a screening tool",
          "$15 hardware cost makes it accessible at scale",
          "Offline inference on Android 8+ covers most African smartphones",
        ],
        weaknesses: [
          "Image quality inconsistency across phone models affects classification accuracy",
          "Inference time of 4-6 seconds on older phones exceeds the claimed 2 seconds",
          "No confidence calibration — the model is overconfident on ambiguous samples",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 70,
        reasoning:
          "The microscope attachment design is creative for the price point. Using phone LED as illumination source is practical. However, the ML approach is a standard image classification pipeline without novel techniques for handling the significant domain shift between training data (lab microscope) and deployment data (phone microscope).",
        strengths: [
          "Microscope attachment design is manufacturable with basic injection molding",
          "Using phone LED as illumination source eliminates external power requirement",
        ],
        weaknesses: [
          "No domain adaptation techniques to handle lab → phone microscope shift",
          "Training data was collected on a lab microscope — significant domain gap",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 65,
        reasoning:
          "Documentation is minimal. No architecture diagrams. The training process is described in a single Jupyter notebook without narrative explanation. Clinical testing results are mentioned but no formal study protocol or IRB documentation is provided. The microscope attachment build instructions are provided as a video only, with no written guide.",
        strengths: [
          "Clinical results from Tikur Anbessa provide credibility",
        ],
        weaknesses: [
          "No written documentation of the clinical study protocol",
          "Missing IRB or ethics review documentation",
          "No architecture diagrams or system overview",
          "Build instructions are video-only with no written complement",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 73,
        reasoning:
          "Sickle cell disease is a major health burden in Sub-Saharan Africa and current screening methods require expensive lab equipment. The $15 price point is compelling. However, the sensitivity of 89% means 11% of positive cases would be missed — the clinical implications of false negatives need more careful consideration. No evidence of testing with community health workers who would be the primary users.",
        strengths: [
          "Addresses a genuine diagnostic gap in sickle cell screening",
          "Price point enables deployment at community health posts",
        ],
        weaknesses: [
          "11% false negative rate has serious clinical implications — needs clearer risk communication",
          "No testing with community health workers (the target end users)",
          "App UI is in English only — no Amharic support",
        ],
      },
    ],
    overall_score: 71,
    recommendation: "Review",
    summary:
      "MediScan tackles an important health challenge with a creative hardware solution at an accessible price point. However, the ML pipeline has significant gaps: domain shift between training and deployment, overconfident predictions, and a false negative rate that has real clinical consequences. Documentation is well below expectations, particularly the absence of ethics review documentation for clinical testing. Recommended for review — the team should address domain adaptation, clinical validation rigor, and documentation before reconsideration.",
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 35200,
    created_at: "2025-04-03T15:10:00Z",
  },

  // 7. CryptoVault — 42, Reject
  {
    id: EVAL_CRYPTOVAULT,
    submission_id: SUB_CRYPTOVAULT,
    criteria_scores: [
      {
        name: "Technical Implementation",
        weight: 35,
        score: 45,
        reasoning:
          "The Circom circuit compiles but proof generation takes 45 seconds on a high-end smartphone and over 2 minutes on a mid-range device — far from the claimed 10 seconds. The circuit complexity is modest and does not handle the identity attributes needed for KYC compliance. The React Native app is a thin wrapper around a web-based prover with significant latency. The Solidity smart contract was not deployed to any testnet. The Node.js backend has critical security issues including hardcoded API keys and no rate limiting.",
        strengths: [
          "The Circom circuit does compile and produce valid proofs",
          "The conceptual architecture is sound for the stated use case",
        ],
        weaknesses: [
          "Proof generation is 4.5x slower than claimed on target hardware",
          "Hardcoded API keys in the backend are a critical security issue",
          "Smart contract was never deployed — no on-chain verification",
          "Identity attributes are insufficient for actual KYC compliance",
          "React Native app is essentially a WebView wrapper",
        ],
      },
      {
        name: "Creative Problem-Solving",
        weight: 25,
        score: 40,
        reasoning:
          "The application of zk-SNARKs to mobile banking identity is a well-explored area with existing production solutions (e.g., Worldcoin, Polygon ID). The submission does not demonstrate awareness of prior art or explain how this approach differs or improves upon existing work. The circuit design does not introduce novel techniques.",
        strengths: [
          "Correct identification of privacy as a barrier to financial inclusion",
        ],
        weaknesses: [
          "No differentiation from existing zk-identity solutions",
          "No novel cryptographic techniques or optimizations",
          "Lack of prior art research is evident",
        ],
      },
      {
        name: "Process Documentation",
        weight: 20,
        score: 38,
        reasoning:
          "Documentation is minimal. The README has setup instructions that do not work as written (missing environment variable documentation). No architecture diagrams. No security audit or threat model despite this being a cryptographic application. No explanation of the trust assumptions in the system.",
        strengths: [
          "README exists and attempts to explain the project",
        ],
        weaknesses: [
          "Setup instructions are broken — missing required configuration",
          "No threat model or security analysis for a cryptographic application",
          "No architecture diagram",
          "No documentation of trust assumptions",
        ],
      },
      {
        name: "Usability & Relevance",
        weight: 20,
        score: 42,
        reasoning:
          "While the problem statement is relevant, the implementation is too far from production readiness to be usable. The proof generation time makes it impractical for real-world mobile banking workflows. No user testing was conducted. No engagement with financial institutions or regulators was documented. The Solidity dependency suggests a blockchain-based approach that faces adoption barriers in the target market.",
        strengths: [
          "Financial inclusion for the unbanked is a genuine need",
        ],
        weaknesses: [
          "Proof generation time is impractical for mobile banking UX expectations",
          "No regulatory engagement or compliance analysis",
          "Blockchain dependency faces adoption barriers in the target market",
          "No user testing or stakeholder validation",
        ],
      },
    ],
    overall_score: 42,
    recommendation: "Reject",
    summary:
      "CryptoVault attempts to apply zero-knowledge proofs to mobile banking identity but falls significantly short in execution. Performance claims are not met (45s vs. 10s proof generation), the implementation has critical security issues (hardcoded API keys), and there is no evidence of deployment, testing, or regulatory engagement. The submission does not demonstrate awareness of existing solutions in this space. The team is encouraged to study prior art, address the fundamental performance constraints of client-side ZK proving, and engage with financial regulators before resubmitting.",
    code_analysis: {
      languages: ["JavaScript", "TypeScript", "Solidity", "Circom"],
      quality:
        "Code quality is poor. Hardcoded secrets in the repository, no tests, inconsistent code style, and several TODO comments indicating unfinished work. The Circom circuit is the most complete component. The React Native app is largely boilerplate.",
      architecture_notes:
        "Four separate repositories loosely connected: Circom circuits, Solidity contracts, Node.js API, React Native app. No integration testing or deployment pipeline. The architecture suggests the components were developed independently without integration planning.",
    },
    evaluated_by: "adt_evaluator_v2",
    duration_ms: 31400,
    created_at: "2025-04-05T08:30:00Z",
  },
];

// =============================================================================
// INTERVIEW SESSIONS
// =============================================================================

export const INTERVIEW_SESSIONS: InterviewSession[] = [
  // 1. SolarGrid AI — completed, Advance to Panel
  {
    id: INT_SOLARGRID,
    submission_id: SUB_SOLARGRID,
    user_id: USR_1,
    participant_name: "Adaeze Okonkwo",
    status: "completed",
    questions: [
      {
        id: IQ_SG_1,
        order: 1,
        category: "technical",
        question: "Walk us through the feature engineering pipeline for your load forecasting model. What input features did you select and why?",
        context: "The submission uses a TFLite model for 4-hour-ahead demand forecasting on a Raspberry Pi.",
        expected_depth: "Should discuss time-of-day encoding, weather features, historical load patterns, and any domain-specific features like prayer time load spikes.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_SG_2,
        order: 2,
        category: "technical",
        question: "How do you handle the cold-start problem when deploying to a new mini-grid site with no historical data?",
        context: "The model was trained on data from 3 sites in Ogun State.",
        expected_depth: "Should discuss transfer learning, synthetic data, or rule-based fallback strategies for the initial deployment period.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_SG_3,
        order: 3,
        category: "process",
        question: "Describe a situation where your model made an incorrect prediction that had real-world consequences. How did you discover it and what did you change?",
        context: "The system is deployed on live mini-grids where incorrect predictions affect diesel consumption and battery health.",
        expected_depth: "Should provide a specific example with before/after metrics and demonstrate systematic debugging approach.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_SG_4,
        order: 4,
        category: "authenticity",
        question: "Your evaluation noted that the MQTT protocol choice reduced bandwidth by 94%. Can you explain the specific measurements and how you arrived at that figure?",
        context: "Evaluator flagged this as a key technical claim that should be verified.",
        expected_depth: "Should provide specific byte-level comparison between MQTT and HTTP for their payload structure and measurement methodology.",
        max_duration_seconds: 120,
      },
      {
        id: IQ_SG_5,
        order: 5,
        category: "behavioral",
        question: "How did you manage the relationship with the mini-grid operators at Arnergy? What was the hardest feedback to incorporate?",
        context: "The submission mentions partnership with Arnergy for field deployment.",
        expected_depth: "Should demonstrate stakeholder management skills and ability to incorporate non-technical feedback into technical decisions.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_SG_6,
        order: 6,
        category: "technical",
        question: "If you were given $20,000 in grant funding, what would your first three months look like? What would you build or validate first?",
        context: "Assessing the candidate's ability to plan and prioritize with limited resources.",
        expected_depth: "Should demonstrate structured thinking about resource allocation, risk mitigation, and milestone planning.",
        max_duration_seconds: 180,
      },
    ],
    overall_report: {
      overall_score: 88,
      recommendation: "Advance to Panel",
      summary:
        "Adaeze demonstrated deep technical knowledge of edge ML systems and provided specific, verifiable details about the SolarGrid deployment. Her answers revealed genuine field experience — the debugging story about the Ramadan load spike was particularly convincing. She showed strong stakeholder management skills and a clear, well-prioritized plan for grant utilization. The bandwidth reduction claim was well-substantiated with measurement data. Minor gap: could have discussed model monitoring and retraining more concretely.",
      strength_areas: [
        "Deep understanding of edge deployment constraints and trade-offs",
        "Specific, data-backed answers with real deployment metrics",
        "Strong stakeholder management and ability to translate technical concepts for non-technical operators",
        "Well-structured grant utilization plan with clear milestones",
      ],
      concern_areas: [
        "Model retraining and drift monitoring strategy needs more development",
        "Cold-start strategy relies heavily on manual calibration — could be more automated",
      ],
      red_flags: [],
      follow_up_questions: [
        "What is the minimum data collection period needed before the model outperforms the rule-based fallback?",
        "Have you considered federated learning across mini-grid sites to improve model generalization?",
      ],
    },
    created_at: "2025-04-10T09:00:00Z",
    completed_at: "2025-04-10T10:15:00Z",
  },

  // 2. CureBionics — completed, Advance to Panel
  {
    id: INT_CUREBIONICS,
    submission_id: SUB_CUREBIONICS,
    user_id: USR_2,
    participant_name: "Youssef Benali",
    status: "completed",
    questions: [
      {
        id: IQ_CB_1,
        order: 1,
        category: "technical",
        question: "Explain the underactuated linkage mechanism in your prosthetic hand. How does 2 motors achieve functional grip across 3 distinct patterns?",
        context: "The submission claims a novel underactuated design that reduces motor count from 5 to 2.",
        expected_depth: "Should discuss the mechanical advantage, tendon routing, and adaptive grip mechanics in specific detail.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_CB_2,
        order: 2,
        category: "technical",
        question: "Walk us through your EMG signal processing pipeline. How do you handle noise from electrode movement and sweat artifacts?",
        context: "The system uses 2-channel surface EMG for 3-pattern classification.",
        expected_depth: "Should discuss filtering stages, feature extraction (RMS, MAV, zero crossings), and the classification architecture.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_CB_3,
        order: 3,
        category: "process",
        question: "You tested with 6 patients at CHU Ibn Rochd. Describe the clinical testing protocol — how did you recruit patients and what outcomes did you measure?",
        context: "Clinical validation is a key strength of this submission.",
        expected_depth: "Should describe IRB/ethics approval, patient selection criteria, outcome measures, and any adverse events.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_CB_4,
        order: 4,
        category: "authenticity",
        question: "Your BOM lists $85 total cost. Can you walk through the top 5 cost items and explain where you sourced them?",
        context: "The $85 cost claim is a central value proposition that needs verification.",
        expected_depth: "Should provide specific component costs, supplier names, and explain how costs would change at different production volumes.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_CB_5,
        order: 5,
        category: "behavioral",
        question: "What was the most difficult patient feedback you received during clinical testing, and how did it change your design?",
        context: "The submission mentions iterative design based on prosthetist and patient feedback.",
        expected_depth: "Should provide a specific, emotionally grounded answer that demonstrates empathy and design thinking.",
        max_duration_seconds: 150,
      },
    ],
    overall_report: {
      overall_score: 93,
      recommendation: "Advance to Panel",
      summary:
        "Youssef is an exceptional candidate with deep, hands-on knowledge across mechanical design, embedded firmware, and clinical testing. His explanation of the underactuated linkage was detailed enough to be peer-reviewed. The EMG pipeline discussion revealed genuine signal processing expertise. The clinical testing protocol was well-designed, and his description of patient interactions was deeply empathetic. The BOM breakdown was precise and included realistic scaling projections. This is one of the strongest interview performances in this cohort.",
      strength_areas: [
        "Exceptional depth in both mechanical and electrical engineering",
        "Clinical testing protocol was rigorous and ethically sound",
        "BOM is well-researched with realistic scaling projections",
        "Patient empathy is genuine and informs design decisions",
        "Clear vision for regulatory pathway through ANAM",
      ],
      concern_areas: [
        "Manufacturing scale-up plan could be more detailed — transition from 3D printing to injection molding is hand-waved",
      ],
      red_flags: [],
      follow_up_questions: [
        "What is the failure mode for the underactuated linkage — how does the hand behave when a tendon breaks?",
        "Have you explored partnerships with existing prosthetics companies for distribution?",
      ],
    },
    created_at: "2025-04-11T14:00:00Z",
    completed_at: "2025-04-11T15:30:00Z",
  },

  // 3. AquaSense — in_progress (3 of 6 answered)
  {
    id: INT_AQUASENSE,
    submission_id: SUB_AQUASENSE,
    user_id: USR_3,
    participant_name: "Njeri Wambui",
    status: "in_progress",
    questions: [
      {
        id: IQ_AQ_1,
        order: 1,
        category: "technical",
        question: "Explain how your Isolation Forest model detects contamination events. What features do you use and how did you set the contamination threshold?",
        context: "The anomaly detection is a core differentiator of the system.",
        expected_depth: "Should discuss feature engineering from raw sensor data, contamination fraction parameter selection, and false positive analysis.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_AQ_2,
        order: 2,
        category: "technical",
        question: "How do you handle sensor calibration drift over time? Your evaluation noted this as a concern.",
        context: "Water quality sensors are known to drift, especially pH and dissolved oxygen.",
        expected_depth: "Should discuss calibration schedules, drift detection, or automatic compensation strategies.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_AQ_3,
        order: 3,
        category: "process",
        question: "Describe your deployment process for a new sensor node. How long does it take and what expertise is required?",
        context: "Scalability depends on ease of deployment.",
        expected_depth: "Should discuss physical installation, network configuration, calibration, and ongoing maintenance requirements.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_AQ_4,
        order: 4,
        category: "authenticity",
        question: "Your evaluation noted that the backend lacks input validation on several endpoints. Can you explain why and what your plan is to address it?",
        context: "Code quality concern from the evaluation.",
        expected_depth: "Should acknowledge the gap honestly and describe a concrete plan to address it.",
        max_duration_seconds: 120,
      },
      {
        id: IQ_AQ_5,
        order: 5,
        category: "behavioral",
        question: "How did you establish the partnership with Kiambu County Water Authority? What was the most challenging aspect of working with a government entity?",
        context: "Government partnership provides deployment credibility.",
        expected_depth: "Should demonstrate relationship-building skills and patience navigating bureaucratic processes.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_AQ_6,
        order: 6,
        category: "technical",
        question: "If connectivity to the LoRaWAN gateway is lost for 48 hours, what happens to the data and alerts?",
        context: "Reliability in connectivity-constrained environments is critical.",
        expected_depth: "Should discuss local data buffering, alert queuing, and recovery procedures.",
        max_duration_seconds: 150,
      },
    ],
    created_at: "2025-04-14T10:00:00Z",
  },

  // 4. ShieldDrone — pending (questions generated but not started)
  {
    id: INT_SHIELDDRONE,
    submission_id: SUB_SHIELDDRONE,
    user_id: USR_5,
    participant_name: "Emeka Okafor",
    status: "pending",
    questions: [
      {
        id: IQ_SD_1,
        order: 1,
        category: "technical",
        question: "Explain your multi-modal sensor fusion architecture. How do you handle temporal misalignment between the RGB, thermal, and LiDAR streams?",
        context: "Sensor fusion is the technical core of the system.",
        expected_depth: "Should discuss synchronization strategies, coordinate frame alignment, and late vs. early fusion trade-offs.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_SD_2,
        order: 2,
        category: "technical",
        question: "Your evaluation flagged unencrypted telemetry as a security concern. How would you address this for a defense application?",
        context: "Security is critical for the defense use case.",
        expected_depth: "Should discuss encryption options, key management, and the trade-off between security and latency.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_SD_3,
        order: 3,
        category: "process",
        question: "Describe your testing methodology for the autonomous flight system. How do you validate safety-critical failsafe modes?",
        context: "Safety validation is essential for autonomous UAV operations.",
        expected_depth: "Should discuss simulation testing, hardware-in-the-loop testing, and field test protocols.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_SD_4,
        order: 4,
        category: "authenticity",
        question: "You report 96% daytime detection accuracy. What was your test dataset and how did you prevent data leakage between training and evaluation?",
        context: "Accuracy claims need validation against rigorous evaluation methodology.",
        expected_depth: "Should describe dataset composition, train/test split strategy, and cross-validation approach.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_SD_5,
        order: 5,
        category: "behavioral",
        question: "Autonomous surveillance raises ethical concerns. How do you think about the ethical implications of your system, and what safeguards have you considered?",
        context: "The evaluation noted the absence of an ethical framework.",
        expected_depth: "Should demonstrate thoughtful engagement with dual-use technology ethics and propose specific safeguards.",
        max_duration_seconds: 180,
      },
    ],
    created_at: "2025-04-15T08:00:00Z",
  },

  // 5. FarmSpeak — reviewed, Needs Follow-up
  {
    id: INT_FARMSPEAK,
    submission_id: SUB_FARMSPEAK,
    user_id: USR_4,
    participant_name: "Kwame Mensah",
    status: "reviewed",
    questions: [
      {
        id: IQ_FS_1,
        order: 1,
        category: "technical",
        question: "Your evaluation noted a significant dataset imbalance: 70% maize, 20% cassava, 10% cocoa. What is your plan to address this and how does it affect model performance?",
        context: "Dataset imbalance was flagged as a key weakness.",
        expected_depth: "Should discuss data collection plans, augmentation strategies, or class weighting approaches.",
        max_duration_seconds: 180,
      },
      {
        id: IQ_FS_2,
        order: 2,
        category: "technical",
        question: "How does your model handle images that do not contain any of the target diseases — for example, a healthy leaf or a non-crop plant?",
        context: "No confidence threshold was flagged in the evaluation.",
        expected_depth: "Should discuss out-of-distribution detection, confidence calibration, or abstain mechanisms.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_FS_3,
        order: 3,
        category: "process",
        question: "Have you tested the app with actual farmers in the field? If so, describe the experience. If not, explain why and what your plan is.",
        context: "No evidence of user testing was noted in the evaluation.",
        expected_depth: "Should provide honest account and concrete user testing plan.",
        max_duration_seconds: 150,
      },
      {
        id: IQ_FS_4,
        order: 4,
        category: "authenticity",
        question: "The voice output feature in Twi was noted as having pronunciation issues. Can you demonstrate it and explain how you generated the Twi audio?",
        context: "Voice output quality was flagged as a concern.",
        expected_depth: "Should explain the TTS approach and acknowledge limitations honestly.",
        max_duration_seconds: 120,
      },
      {
        id: IQ_FS_5,
        order: 5,
        category: "behavioral",
        question: "If you had to start this project over, what would you do differently?",
        context: "Assessing self-awareness and learning ability.",
        expected_depth: "Should demonstrate reflection on mistakes and prioritization of user research.",
        max_duration_seconds: 150,
      },
    ],
    overall_report: {
      overall_score: 58,
      recommendation: "Needs Follow-up",
      summary:
        "Kwame showed genuine passion for the problem but the interview revealed significant gaps in execution rigor. He acknowledged the dataset imbalance but did not have a concrete plan to address it beyond 'collecting more images.' The lack of user testing is concerning — he admitted that he had not yet visited any farms. The Twi voice output demonstration confirmed the pronunciation issues flagged in the evaluation. On the positive side, he was honest about limitations and showed good instincts about what needs to improve. A follow-up is recommended after he has conducted user testing with at least 5 farmers and addressed the dataset imbalance.",
      strength_areas: [
        "Genuine passion for agricultural technology and farmer empowerment",
        "Honest about limitations and open to feedback",
        "Good intuition about the importance of voice-based interaction for the target audience",
      ],
      concern_areas: [
        "No user testing conducted with target farmers",
        "Dataset imbalance plan is vague — needs specific data collection strategy",
        "Twi TTS quality is not adequate for production use",
        "No confidence threshold or out-of-distribution detection in the current model",
      ],
      red_flags: [
        "Claimed in the submission to have evidence of user testing, but admitted during interview that no field testing has occurred",
      ],
      follow_up_questions: [
        "After conducting user testing with farmers, what were the top 3 issues they identified?",
        "Can you demonstrate a balanced dataset with at least 1,000 cassava and 500 cocoa disease images?",
      ],
    },
    created_at: "2025-04-12T11:00:00Z",
    completed_at: "2025-04-12T12:00:00Z",
  },
];

// =============================================================================
// INTERVIEW ANSWERS
// =============================================================================

export const INTERVIEW_ANSWERS: InterviewAnswer[] = [
  // --- SolarGrid AI (6 answers — completed) ---
  {
    id: IA_SG_1,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_1,
    transcript:
      "The feature engineering was really the hardest part because mini-grid load patterns in Nigeria are unlike anything in the literature. We use 14 features grouped into three categories. Time features: hour of day encoded as sine and cosine, day of week, and a binary flag for public holidays and Friday prayers. Environmental features: ambient temperature and solar irradiance from an onboard pyranometer. Historical features: lagged load values at 1, 2, 4, and 24-hour intervals plus a rolling 7-day average. The most impactful feature we discovered was what we called 'prayer spike' — a binary feature that activates 30 minutes before and after Jumu'ah prayer on Fridays, when load drops as businesses close temporarily and then surges when they reopen. That single feature improved our RMSE by about 8% on the Ogijo site.",
    duration_seconds: 165,
    evaluation: {
      technical_accuracy: 92,
      depth_of_understanding: 90,
      authenticity: 95,
      communication_quality: 88,
      overall_score: 91,
      reasoning: "Highly specific answer with domain knowledge that would be difficult to fabricate. The 'prayer spike' feature is a genuinely insightful observation that reflects real deployment experience in a Muslim-majority community. Feature grouping is well-reasoned.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 45, note: "Prayer spike feature shows genuine cultural context awareness", type: "positive" },
        { timestamp_seconds: 120, note: "Specific RMSE improvement figure suggests rigorous experimentation", type: "positive" },
      ],
    },
    created_at: "2025-04-10T09:05:00Z",
  },
  {
    id: IA_SG_2,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_2,
    transcript:
      "This is actually our biggest unsolved challenge. Right now, we use a rule-based fallback for the first 2 weeks at a new site. The rules are conservative — they keep the battery state of charge above 60% and only allow the diesel generator to turn off when solar irradiance exceeds a threshold. After 2 weeks of data collection, we fine-tune the base model using transfer learning from the best-performing existing site. But honestly, the performance during that first 2 weeks is not great — diesel savings are maybe 10% compared to the 30% we see with the trained model. We have been exploring whether synthetic data from PVsyst simulations could help but we have not validated that approach yet.",
    duration_seconds: 142,
    evaluation: {
      technical_accuracy: 80,
      depth_of_understanding: 82,
      authenticity: 92,
      communication_quality: 85,
      overall_score: 84,
      reasoning: "Honest about the current limitations. The 2-week rule-based fallback is a reasonable engineering choice. The transfer learning approach is sound. Acknowledging that synthetic data has not been validated shows intellectual honesty. Could have been stronger with a more concrete plan.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 30, note: "Honest about the 2-week gap in performance", type: "positive" },
        { timestamp_seconds: 110, note: "Synthetic data exploration mentioned but unvalidated — honest but shows gap", type: "concern" },
      ],
    },
    created_at: "2025-04-10T09:10:00Z",
  },
  {
    id: IA_SG_3,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_3,
    transcript:
      "Yes, this actually happened during Ramadan last year at the Ijebu-Ode site. The model had never seen Ramadan patterns before because our training data only covered 14 months and the previous Ramadan fell during a period when the sensors were down. During Ramadan, the evening load pattern completely shifted — people cook Iftar meals at sunset, so there is a massive spike between 6:30 and 7:30 PM that our model did not predict. The battery drained to critical levels on the third day and the diesel generator had to run for 6 continuous hours. We discovered it through the Grafana alert when battery SOC dropped below 20%. The fix was twofold: we added a Ramadan flag to the feature set and increased the conservative battery reserve from 20% to 35% during Ramadan. After retraining, the model handled the remaining 27 days without a single diesel overshoot.",
    duration_seconds: 170,
    evaluation: {
      technical_accuracy: 88,
      depth_of_understanding: 90,
      authenticity: 97,
      communication_quality: 90,
      overall_score: 91,
      reasoning: "This is an excellent answer. The Ramadan story is specific, verifiable, and demonstrates exactly the kind of real-world deployment experience that cannot be fabricated. The systematic approach to discovering, diagnosing, and fixing the issue is impressive. The before/after metrics are concrete.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 60, note: "Ramadan load pattern shift is a highly specific, culturally relevant deployment challenge", type: "positive" },
        { timestamp_seconds: 140, note: "Clear before/after fix with measurable outcome", type: "positive" },
      ],
    },
    created_at: "2025-04-10T09:18:00Z",
  },
  {
    id: IA_SG_4,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_4,
    transcript:
      "The 94% figure comes from comparing the total bytes transferred over a 72-hour period between our MQTT implementation and an HTTP REST baseline we ran in parallel. MQTT messages average 128 bytes per telemetry packet including topic and QoS overhead. The equivalent HTTP POST with headers, JSON body, and TLS handshake averages about 2.1 kilobytes. At our 30-second transmission interval, MQTT used 442KB over 72 hours while HTTP used 7.2MB. That is a 93.8% reduction which we rounded to 94%. The key factors are MQTT's persistent connection eliminating repeated TLS handshakes, and the compact binary payload versus verbose JSON with HTTP headers.",
    duration_seconds: 105,
    evaluation: {
      technical_accuracy: 95,
      depth_of_understanding: 88,
      authenticity: 90,
      communication_quality: 92,
      overall_score: 91,
      reasoning: "Precise measurement methodology with specific byte counts and timeframes. The comparison methodology is fair — running both protocols in parallel eliminates confounding variables. The technical explanation of why MQTT is more efficient is accurate.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 30, note: "Specific byte counts for both protocols — well-measured", type: "positive" },
        { timestamp_seconds: 85, note: "Parallel testing methodology eliminates confounding variables", type: "positive" },
      ],
    },
    created_at: "2025-04-10T09:25:00Z",
  },
  {
    id: IA_SG_5,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_5,
    transcript:
      "Working with Arnergy was honestly more challenging than the engineering. Their operations team was initially skeptical because they had seen academic projects promise savings before. The hardest feedback was when their head of operations told us our Grafana dashboard was useless because none of their field technicians use laptops — they all work from phones. That meant we had to rebuild the monitoring interface as a mobile-first Progressive Web App, which took us 3 weeks we had not planned for. But it was the right call because now their technicians actually use it. We also had to learn to present results in terms of naira saved per month rather than kilowatt-hours optimized, because that is the metric their finance team cares about. Small thing, but it changed how they perceived the value of the system.",
    duration_seconds: 148,
    evaluation: {
      technical_accuracy: 82,
      depth_of_understanding: 85,
      authenticity: 95,
      communication_quality: 90,
      overall_score: 88,
      reasoning: "Genuine stakeholder management story. The mobile-first pivot and the naira framing show real user empathy and willingness to adapt. The initial skepticism from Arnergy's operations team rings true for anyone who has worked with field operations teams.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 55, note: "Mobile-first pivot based on field technician feedback shows adaptability", type: "positive" },
        { timestamp_seconds: 130, note: "Reframing value in naira rather than kWh demonstrates business awareness", type: "positive" },
      ],
    },
    created_at: "2025-04-10T09:35:00Z",
  },
  {
    id: IA_SG_6,
    session_id: INT_SOLARGRID,
    question_id: IQ_SG_6,
    transcript:
      "I would split the $20,000 into four phases. First month: $5,000 for component procurement — we need 10 more Raspberry Pi units, industrial-grade current sensors, and weatherproof enclosures. We would deploy at 2 new Arnergy sites that have already agreed to host us. Second month: $5,000 for a dedicated field engineer to manage deployment and collect ground-truth data. We need someone physically at the sites calibrating sensors and verifying that our predictions match actual diesel consumption. Third month: $5,000 for iterating on the model using the new site data — specifically addressing the cold-start problem I mentioned. We would also run a customer discovery sprint to understand whether independent mini-grid operators beyond Arnergy have the same pain points. The last $5,000 is a buffer for unexpected costs, which in my experience with field deployments in Nigeria, always come up. Import duties, customs delays, generator repairs at the site — you always need a contingency.",
    duration_seconds: 175,
    evaluation: {
      technical_accuracy: 85,
      depth_of_understanding: 88,
      authenticity: 90,
      communication_quality: 92,
      overall_score: 89,
      reasoning: "Well-structured plan with realistic budget allocation. The contingency buffer shows field deployment experience. The customer discovery sprint in month 3 demonstrates business thinking beyond pure engineering. Linking back to the cold-start problem shows session coherence.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 100, note: "Customer discovery sprint shows business awareness beyond engineering", type: "positive" },
        { timestamp_seconds: 155, note: "Contingency budget reflects genuine field deployment experience", type: "positive" },
      ],
    },
    created_at: "2025-04-10T09:45:00Z",
  },

  // --- CureBionics (5 answers — completed) ---
  {
    id: IA_CB_1,
    session_id: INT_CUREBIONICS,
    question_id: IQ_CB_1,
    transcript:
      "The key insight was that most daily grip tasks fall into three patterns: cylindrical grasp for bottles and handles, lateral pinch for keys and cards, and tip pinch for small objects. Our underactuated linkage uses two N20 gear motors — one drives the index and middle fingers through a shared tendon, the other drives the ring and little fingers with the thumb. The magic is in the differential tendon routing: when the fingers encounter an object, the tendons redistribute force automatically to conform around it. This is inspired by the Yale OpenHand project but we simplified the routing significantly. The fingers have compliant joints made from TPU printed at 30% infill, which gives them enough flex to adapt without needing individual motor control. One motor controls power grip and the other controls precision grip — the EMG classifier just selects which motor pair activates.",
    duration_seconds: 162,
    evaluation: {
      technical_accuracy: 95,
      depth_of_understanding: 96,
      authenticity: 93,
      communication_quality: 90,
      overall_score: 94,
      reasoning: "Exceptionally detailed mechanical explanation. The differential tendon routing with force redistribution is a real technique used in underactuated grippers. The reference to Yale OpenHand shows awareness of the field. The TPU compliant joint detail is specific and verifiable. This person clearly built the mechanism.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 50, note: "Differential tendon routing explanation is technically precise", type: "positive" },
        { timestamp_seconds: 120, note: "Yale OpenHand reference shows deep field knowledge", type: "positive" },
      ],
    },
    created_at: "2025-04-11T14:08:00Z",
  },
  {
    id: IA_CB_2,
    session_id: INT_CUREBIONICS,
    question_id: IQ_CB_2,
    transcript:
      "The EMG pipeline has four stages running on the STM32 at 1kHz. First, we apply a 20-450Hz bandpass filter to remove motion artifacts and high-frequency noise. Then we do 50Hz notch filtering for power line interference — this was essential because the outlets at the hospital had terrible grounding. Feature extraction runs on 200ms windows with 50% overlap: we compute RMS amplitude, mean absolute value, waveform length, and zero crossings for each channel, giving us an 8-dimensional feature vector per window. The classifier is a single-hidden-layer neural network with 16 neurons — we tried random forests and SVMs first, but the neural network was the only one that fit in the STM32's 64KB RAM after quantization to 8-bit integers. We validated on 6 patients with a leave-one-patient-out cross-validation and got 94% average accuracy, with the worst patient at 87%.",
    duration_seconds: 158,
    evaluation: {
      technical_accuracy: 96,
      depth_of_understanding: 95,
      authenticity: 94,
      communication_quality: 92,
      overall_score: 95,
      reasoning: "Textbook-quality EMG pipeline description with specific technical parameters. The 50Hz notch filter anecdote about hospital grounding is the kind of detail that comes from real deployment. The progression from SVM/RF to neural network driven by memory constraints shows genuine embedded development experience. Leave-one-patient-out validation is the correct methodology for this application.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 45, note: "Hospital grounding issue — real-world deployment detail", type: "positive" },
        { timestamp_seconds: 130, note: "Leave-one-patient-out CV is the correct validation methodology", type: "positive" },
      ],
    },
    created_at: "2025-04-11T14:18:00Z",
  },
  {
    id: IA_CB_3,
    session_id: INT_CUREBIONICS,
    question_id: IQ_CB_3,
    transcript:
      "We went through the CHU Ibn Rochd ethics committee, which took about 6 weeks. We recruited patients through the prosthetics department — Dr. Amrani, the head prosthetist, identified candidates from their existing patient list. Inclusion criteria were unilateral below-elbow amputation at least 6 months post-surgery, age 18-65, and no skin conditions at the electrode sites. We excluded patients with neuromuscular disorders. Each patient did 3 sessions over 2 weeks: initial fitting and calibration, 1-week home trial with a daily activity diary, and a final assessment using the Southampton Hand Assessment Procedure. We measured grip force, pattern recognition accuracy, and patient-reported satisfaction on a 1-10 scale. The average SHAP score was 62 out of 100 — for context, a healthy hand scores around 96 and a basic body-powered prosthetic scores about 40. No adverse events occurred.",
    duration_seconds: 174,
    evaluation: {
      technical_accuracy: 90,
      depth_of_understanding: 92,
      authenticity: 96,
      communication_quality: 90,
      overall_score: 92,
      reasoning: "Detailed clinical protocol with appropriate methodology. Naming the specific assessment tool (SHAP) and providing contextual scores demonstrates genuine clinical research experience. Ethics committee timeline, inclusion/exclusion criteria, and the named clinician all add credibility. No adverse events is important to document.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 80, note: "SHAP assessment tool and contextual scoring shows clinical research literacy", type: "positive" },
        { timestamp_seconds: 160, note: "Clear inclusion/exclusion criteria reflect proper protocol design", type: "positive" },
      ],
    },
    created_at: "2025-04-11T14:30:00Z",
  },
  {
    id: IA_CB_4,
    session_id: INT_CUREBIONICS,
    question_id: IQ_CB_4,
    transcript:
      "Sure, the top 5 items by cost. The two N20 gear motors are $12 each, so $24 total — we source them from Dongguan through AliExpress but at scale we would go direct. The STM32F401 board is $8 from MicroElectronics in Casablanca — they are a local distributor. The LiPo battery, a 2S 2000mAh pack, is $11 from the same supplier. The EMG electrodes and analog front-end circuit — the AD8232 module plus reusable Ag/AgCl electrodes — run about $15 combined. And the PETG filament for the housing is about $7 per hand, using recycled filament from a local company called Eko3D. That totals $65 for the major components, and the remaining $20 covers the PCB fabrication, wiring, fasteners, silicone finger pads, and the socket liner. At volume — say 500 units — we estimate we could bring it down to $60-65 by buying motors and batteries in bulk.",
    duration_seconds: 138,
    evaluation: {
      technical_accuracy: 92,
      depth_of_understanding: 90,
      authenticity: 95,
      communication_quality: 93,
      overall_score: 92,
      reasoning: "Precise BOM breakdown with named suppliers and realistic pricing. The distinction between AliExpress for prototyping and direct sourcing at scale shows procurement awareness. Local supplier naming (MicroElectronics, Eko3D) adds strong authenticity. Volume pricing estimate is realistic.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 40, note: "Named local suppliers in Casablanca — genuine sourcing knowledge", type: "positive" },
        { timestamp_seconds: 120, note: "Volume pricing reduction estimate is realistic and well-reasoned", type: "positive" },
      ],
    },
    created_at: "2025-04-11T14:42:00Z",
  },
  {
    id: IA_CB_5,
    session_id: INT_CUREBIONICS,
    question_id: IQ_CB_5,
    transcript:
      "The hardest feedback came from our third patient, a 34-year-old carpenter named Mourad. After his 1-week home trial, he told us the hand was too slow for his work. He needed to switch grip patterns quickly when moving between different tools, but the EMG reclassification took about 1.5 seconds — which felt like an eternity when you are holding a hammer and need to grab a nail. He said something that stuck with me: 'A hand that thinks is worse than no hand at all.' That was painful to hear because we were proud of the recognition accuracy. But he was right — speed matters more than accuracy for real work. So we redesigned the classification pipeline to use a sliding window with majority voting over the last 3 predictions instead of waiting for a single high-confidence prediction. That brought the transition time down to about 400 milliseconds, which Mourad said felt natural enough to work with.",
    duration_seconds: 155,
    evaluation: {
      technical_accuracy: 88,
      depth_of_understanding: 90,
      authenticity: 98,
      communication_quality: 95,
      overall_score: 93,
      reasoning: "This is an outstanding answer. The named patient with a specific occupation and a quoted criticism demonstrates genuine human-centered design experience. The emotional resonance of 'a hand that thinks is worse than no hand at all' is powerful and authentic. The technical fix — sliding window majority voting — is a real and appropriate solution to the latency problem.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 55, note: "Patient quote 'a hand that thinks is worse than no hand at all' is deeply authentic", type: "positive" },
        { timestamp_seconds: 135, note: "Technical fix directly addresses the patient feedback", type: "positive" },
      ],
    },
    created_at: "2025-04-11T14:55:00Z",
  },

  // --- AquaSense (3 answers — in_progress) ---
  {
    id: IA_AQ_1,
    session_id: INT_AQUASENSE,
    question_id: IQ_AQ_1,
    transcript:
      "We use 5 features from each sensor reading: pH, turbidity in NTU, dissolved oxygen in milligrams per liter, temperature, and a derived feature which is the rate of change of turbidity over the last 4 readings. The Isolation Forest was trained on 3 months of 'clean' data from when the boreholes were known to be safe. We set the contamination fraction at 0.02, meaning we expect about 2% of readings to be anomalous. We tuned this parameter by manually reviewing flagged events over a 2-week validation period with the county water officers — they confirmed 85% of our alerts were genuine contamination events. The remaining 15% were mostly false positives caused by heavy rainfall events that temporarily spike turbidity without indicating harmful contamination.",
    duration_seconds: 140,
    evaluation: {
      technical_accuracy: 82,
      depth_of_understanding: 80,
      authenticity: 88,
      communication_quality: 85,
      overall_score: 83,
      reasoning: "Solid explanation of the Isolation Forest setup with appropriate detail. The 2% contamination fraction is reasonable and the validation with water officers adds credibility. The rainfall false positive issue is a real challenge in water quality monitoring. Could have discussed more sophisticated feature engineering or ensemble approaches.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 80, note: "Validation with county water officers grounds the technical approach in practice", type: "positive" },
        { timestamp_seconds: 125, note: "Rainfall false positives are a known issue — good awareness", type: "positive" },
      ],
    },
    created_at: "2025-04-14T10:08:00Z",
  },
  {
    id: IA_AQ_2,
    session_id: INT_AQUASENSE,
    question_id: IQ_AQ_2,
    transcript:
      "I have to be honest, this is a gap in our current system. Right now we do manual calibration every 3 months by taking reference samples to the KEWI lab in Nairobi and comparing our sensor readings against their certified instruments. But between calibrations, drift does happen — especially with the pH sensor, which can drift by 0.3 units over a month. We do not have any automatic drift compensation yet. My plan is to implement a linear drift model that estimates the calibration offset based on the last two calibration points and applies a continuous correction. I also want to add a cross-sensor consistency check — if pH and dissolved oxygen are both drifting in the same direction, it is more likely to be a real environmental change than sensor drift.",
    duration_seconds: 132,
    evaluation: {
      technical_accuracy: 75,
      depth_of_understanding: 78,
      authenticity: 92,
      communication_quality: 82,
      overall_score: 80,
      reasoning: "Refreshingly honest about a real gap. The manual calibration approach is practical but the 3-month interval is long for pH sensors. The planned linear drift model and cross-sensor consistency check are reasonable approaches but unimplemented. Authenticity score is high because the honest acknowledgment of the gap is more trustworthy than a polished non-answer.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 15, note: "Honest acknowledgment of the calibration drift gap", type: "positive" },
        { timestamp_seconds: 100, note: "Cross-sensor consistency check is a smart planned improvement", type: "positive" },
      ],
    },
    created_at: "2025-04-14T10:18:00Z",
  },
  {
    id: IA_AQ_3,
    session_id: INT_AQUASENSE,
    question_id: IQ_AQ_3,
    transcript:
      "Deploying a new node takes about half a day with two people. First, we install the solar panel and the enclosure on a concrete pad near the borehole — this takes about 2 hours because we need to orient the panel correctly and run the waterproof cable gland into the enclosure. Then we submerge the sensor probe into the borehole outlet pipe and secure it with stainless steel hose clamps. The LoRaWAN antenna placement is critical — we learned the hard way that mounting it inside the enclosure cuts range by 60%, so now we always mount it externally on a short mast. Network configuration takes about 30 minutes: we register the device on The Things Network, configure the OTAA keys, and verify uplink reception at the gateway. Then we do an initial calibration using reference solutions for pH 4.0, 7.0, and 10.0. The whole process requires someone who is comfortable with basic electronics and can solder a connector if needed, but it does not require an engineer.",
    duration_seconds: 155,
    evaluation: {
      technical_accuracy: 85,
      depth_of_understanding: 82,
      authenticity: 90,
      communication_quality: 88,
      overall_score: 86,
      reasoning: "Detailed deployment procedure with specific timing estimates. The LoRaWAN antenna placement lesson is exactly the kind of field knowledge that comes from real deployments. The calibration reference solutions are standard. Good assessment of the skill level required for deployment.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 80, note: "Antenna placement lesson from experience — genuine field knowledge", type: "positive" },
        { timestamp_seconds: 140, note: "Realistic skill assessment for deployment personnel", type: "positive" },
      ],
    },
    created_at: "2025-04-14T10:30:00Z",
  },

  // --- FarmSpeak (5 answers — reviewed) ---
  {
    id: IA_FS_1,
    session_id: INT_FARMSPEAK,
    question_id: IQ_FS_1,
    transcript:
      "Yes, the imbalance is a real problem and I did not give it enough attention during development. The maize data came from the PlantVillage dataset, which has extensive maize coverage. For cassava I used about 2,000 images from the iCassava challenge, and for cocoa I could only find about 500 images that I collected myself at a farm near Kumasi. The model performs well on maize — about 91% accuracy — but drops to 76% on cassava and only 62% on cocoa. My plan is to organize a data collection campaign with agricultural extension officers in the Ashanti and Eastern regions. I think I could collect 2,000-3,000 images per crop over a 2-week period if I can get 5-6 extension officers to use a standardized image capture protocol on their phones.",
    duration_seconds: 145,
    evaluation: {
      technical_accuracy: 72,
      depth_of_understanding: 68,
      authenticity: 85,
      communication_quality: 78,
      overall_score: 74,
      reasoning: "Honest about the problem and provides specific accuracy numbers per crop. However, the data collection plan is optimistic and underdeveloped — 2,000-3,000 images per crop in 2 weeks with extension officers is ambitious without an established relationship. No mention of data quality controls, labeling verification, or augmentation strategies to bridge the gap in the meantime.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 40, note: "PlantVillage dependency explains the maize bias — honest", type: "positive" },
        { timestamp_seconds: 120, note: "Data collection plan lacks quality control details", type: "concern" },
      ],
    },
    created_at: "2025-04-12T11:08:00Z",
  },
  {
    id: IA_FS_2,
    session_id: INT_FARMSPEAK,
    question_id: IQ_FS_2,
    transcript:
      "Right now, the model always returns a prediction. If you point it at your shoe, it will tell you it has cassava mosaic disease. I know that is a problem. I looked into adding a confidence threshold but the softmax outputs from MobileNetV2 are not well-calibrated — the model is very confident even when it is wrong. I think the right approach would be to add an 'unknown' class trained on negative examples — photos of healthy plants, non-plant objects, and other crops. But I have not implemented this yet. It is on my roadmap for the next version.",
    duration_seconds: 98,
    evaluation: {
      technical_accuracy: 65,
      depth_of_understanding: 62,
      authenticity: 88,
      communication_quality: 80,
      overall_score: 72,
      reasoning: "Good self-awareness about the problem. The shoe example is disarming and honest. However, the proposed solution (unknown class) is simplistic — more sophisticated approaches like temperature scaling for calibration or out-of-distribution detection using feature-space distances were not mentioned. Shows awareness of the issue but limited depth in the solution space.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 20, note: "Shoe example shows honest awareness of the limitation", type: "positive" },
        { timestamp_seconds: 75, note: "Solution proposal is simplistic — unknown class alone is insufficient", type: "concern" },
      ],
    },
    created_at: "2025-04-12T11:15:00Z",
  },
  {
    id: IA_FS_3,
    session_id: INT_FARMSPEAK,
    question_id: IQ_FS_3,
    transcript:
      "I have not done formal user testing with farmers yet. I showed it to some friends and family who have farms, but that is not the same thing. The reason is honestly logistical — I am based in Accra and the main cocoa and cassava farming areas are in Ashanti and Brong-Ahafo regions, which are 4-5 hours away. I did not have the budget for travel and accommodation. But I recognize this is a critical gap. My plan is to partner with the Ministry of Food and Agriculture's extension officer network in Kumasi. They visit farmers regularly and could facilitate introductions and testing sessions. I want to do at least 5 farm visits with 3-4 farmers each, observe them using the app, and collect structured feedback.",
    duration_seconds: 130,
    evaluation: {
      technical_accuracy: 60,
      depth_of_understanding: 65,
      authenticity: 82,
      communication_quality: 78,
      overall_score: 70,
      reasoning: "Honest about the lack of user testing. The logistical explanation is understandable but does not excuse building a farmer-facing tool without ever talking to farmers. The plan is reasonable but vague on timeline and budget. The submission materials implied user testing had occurred, which is a concerning discrepancy.",
      red_flags: ["Submission implied user testing had occurred but none was conducted"],
      annotations: [
        { timestamp_seconds: 20, note: "Admits no formal user testing — contradicts submission materials", type: "flag" },
        { timestamp_seconds: 100, note: "MOFA extension officer partnership is a good idea but unestablished", type: "concern" },
      ],
    },
    created_at: "2025-04-12T11:25:00Z",
  },
  {
    id: IA_FS_4,
    session_id: INT_FARMSPEAK,
    question_id: IQ_FS_4,
    transcript:
      "The Twi voice output uses Android's built-in text-to-speech engine, which does not have a native Twi voice. So it falls back to an English voice reading Twi words phonetically, which sounds robotic and gets the tonal patterns wrong. Twi is a tonal language so pronunciation accuracy really matters — the wrong tone can change the meaning of a word entirely. I explored using a custom TTS model but training one requires a large corpus of recorded Twi speech that I do not have. One option I am considering is pre-recording the most common result phrases with a native Twi speaker and bundling them as audio files in the app instead of using real-time TTS.",
    duration_seconds: 110,
    evaluation: {
      technical_accuracy: 70,
      depth_of_understanding: 72,
      authenticity: 85,
      communication_quality: 80,
      overall_score: 76,
      reasoning: "Good understanding of why the TTS fails for Twi — the tonal language explanation is correct. The pre-recorded audio approach is pragmatic and probably the right solution for the near term. However, this should have been the approach from the start rather than shipping a broken TTS that could confuse users with incorrect tonal pronunciation.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 35, note: "Understanding of Twi tonal system shows linguistic awareness", type: "positive" },
        { timestamp_seconds: 90, note: "Pre-recorded audio is a pragmatic solution", type: "positive" },
      ],
    },
    created_at: "2025-04-12T11:35:00Z",
  },
  {
    id: IA_FS_5,
    session_id: INT_FARMSPEAK,
    question_id: IQ_FS_5,
    transcript:
      "If I started over, the first thing I would do differently is spend the first month visiting farms instead of writing code. I jumped straight into the model training because that is what I am comfortable with, but the result is a technically functional app that I am not confident actually helps farmers. I would do at least 20 farm visits across different crops and regions before writing a single line of code. I would also focus on one crop first instead of three — probably cassava, because it is the most important food security crop in Ghana and the disease pressure is well-documented. And I would find a Twi-speaking agricultural extension officer to be a co-designer from day one, not just a translator after the fact.",
    duration_seconds: 125,
    evaluation: {
      technical_accuracy: 65,
      depth_of_understanding: 72,
      authenticity: 90,
      communication_quality: 85,
      overall_score: 78,
      reasoning: "Thoughtful reflection that demonstrates genuine learning. The insight about spending the first month on farms rather than code shows growth in product thinking. Narrowing to one crop and embedding a co-designer are both smart instincts. This answer raises confidence that Kwame would produce a better result with a second attempt.",
      red_flags: [],
      annotations: [
        { timestamp_seconds: 30, note: "Farms before code — strong product thinking insight", type: "positive" },
        { timestamp_seconds: 100, note: "Co-designer approach shows evolution in thinking", type: "positive" },
      ],
    },
    created_at: "2025-04-12T11:45:00Z",
  },
];

// =============================================================================
// GRANTS
// =============================================================================

export const GRANTS: Grant[] = [
  {
    id: GRANT_SOLARGRID,
    submission_id: SUB_SOLARGRID,
    user_id: USR_1,
    participant_name: "Adaeze Okonkwo",
    total_amount: 20000,
    currency: "USD",
    status: "active",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: GRANT_CUREBIONICS,
    submission_id: SUB_CUREBIONICS,
    user_id: USR_2,
    participant_name: "Youssef Benali",
    total_amount: 20000,
    currency: "USD",
    status: "active",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: GRANT_SHIELDDRONE,
    submission_id: SUB_SHIELDDRONE,
    user_id: USR_5,
    participant_name: "Emeka Okafor",
    total_amount: 15000,
    currency: "USD",
    status: "active",
    created_at: "2025-05-15T09:00:00Z",
  },
];

// =============================================================================
// MILESTONES
// =============================================================================

export const MILESTONES: Milestone[] = [
  // --- SolarGrid AI ---
  {
    id: MS_SG_1,
    grant_id: GRANT_SOLARGRID,
    order_num: 1,
    title: "Component Procurement & Assembly",
    description:
      "Procure 10 Raspberry Pi 4 units, industrial current sensors, weatherproof enclosures, and solar power modules. Assemble and bench-test all sensor node kits. Establish supply chain relationships with local electronics distributors.",
    evidence_requirements: [
      { type: "receipt", description: "Purchase receipts for all components with supplier details" },
      { type: "photo", description: "Photos of assembled sensor node kits on bench" },
      { type: "document", description: "Supply chain documentation with contact details for future orders" },
    ],
    amount: 5000,
    deadline: "2025-06-01T00:00:00Z",
    status: "approved",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_SG_2,
    grant_id: GRANT_SOLARGRID,
    order_num: 2,
    title: "Prototype Testing & Validation",
    description:
      "Deploy sensor nodes at 2 new Arnergy mini-grid sites. Collect 4 weeks of operational data. Validate load forecasting accuracy on the new sites and compare with the baseline rule-based controller. Document deployment procedures and field engineering lessons.",
    evidence_requirements: [
      { type: "data", description: "4 weeks of timestamped load forecasting predictions vs. actuals" },
      { type: "report", description: "Deployment report with photos, site configurations, and performance metrics" },
      { type: "video", description: "Video walkthrough of deployed system at one site" },
    ],
    amount: 5000,
    deadline: "2025-07-15T00:00:00Z",
    status: "submitted",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_SG_3,
    grant_id: GRANT_SOLARGRID,
    order_num: 3,
    title: "Field Deployment Pilot",
    description:
      "Expand deployment to 5 total sites. Implement automated model retraining pipeline triggered by performance degradation. Conduct A/B testing between ML-optimized and rule-based control to produce statistically significant diesel savings data.",
    evidence_requirements: [
      { type: "data", description: "A/B test results with statistical significance analysis" },
      { type: "code", description: "Link to automated retraining pipeline in repository" },
      { type: "report", description: "Comprehensive pilot report with diesel savings metrics across all sites" },
    ],
    amount: 5000,
    deadline: "2025-09-01T00:00:00Z",
    status: "pending",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_SG_4,
    grant_id: GRANT_SOLARGRID,
    order_num: 4,
    title: "Customer Discovery & Market Validation",
    description:
      "Conduct customer discovery interviews with 10+ independent mini-grid operators beyond Arnergy. Develop pricing model and partnership framework. Produce a market validation report with letter of intent from at least 2 new operators.",
    evidence_requirements: [
      { type: "report", description: "Customer discovery report with anonymized interview summaries" },
      { type: "document", description: "Letters of intent or MoUs from new operators" },
      { type: "document", description: "Pricing model and partnership framework document" },
    ],
    amount: 5000,
    deadline: "2025-10-15T00:00:00Z",
    status: "pending",
    created_at: "2025-05-01T09:00:00Z",
  },

  // --- CureBionics ---
  {
    id: MS_CB_1,
    grant_id: GRANT_CUREBIONICS,
    order_num: 1,
    title: "EMG Sensor Integration",
    description:
      "Redesign the analog front-end circuit for improved noise rejection. Implement the sliding-window majority voting classifier for faster grip transitions. Validate the improved EMG pipeline with 3 patients and document the improvement in grip transition latency.",
    evidence_requirements: [
      { type: "schematic", description: "Updated circuit schematic with noise analysis" },
      { type: "data", description: "Grip transition latency measurements: before vs. after" },
      { type: "video", description: "Patient demonstration video showing improved grip transitions" },
    ],
    amount: 5000,
    deadline: "2025-06-01T00:00:00Z",
    status: "approved",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_CB_2,
    grant_id: GRANT_CUREBIONICS,
    order_num: 2,
    title: "3D-Printed Housing & Packaging",
    description:
      "Redesign the prosthetic housing for injection molding compatibility while maintaining 3D-printability for prototyping. Source recycled PETG from local suppliers. Produce 5 complete prosthetic units with packaging and user guide.",
    evidence_requirements: [
      { type: "cad", description: "Updated CAD files in STEP and Fusion 360 formats" },
      { type: "photo", description: "Photos of 5 completed units with packaging" },
      { type: "document", description: "User guide with fitting instructions" },
    ],
    amount: 5000,
    deadline: "2025-07-15T00:00:00Z",
    status: "approved",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_CB_3,
    grant_id: GRANT_CUREBIONICS,
    order_num: 3,
    title: "Clinical Trial Preparation",
    description:
      "Prepare a formal clinical trial protocol for submission to ANAM (Morocco's medical device authority). Engage a regulatory consultant. Develop quality management system documentation per ISO 13485 requirements. Identify 20 patients for the expanded trial.",
    evidence_requirements: [
      { type: "document", description: "Clinical trial protocol document submitted to ANAM" },
      { type: "document", description: "ISO 13485 quality management system documentation" },
      { type: "document", description: "Patient recruitment plan with clinic partnerships" },
    ],
    amount: 5000,
    deadline: "2025-09-01T00:00:00Z",
    status: "pending",
    created_at: "2025-05-01T09:00:00Z",
  },
  {
    id: MS_CB_4,
    grant_id: GRANT_CUREBIONICS,
    order_num: 4,
    title: "Patient Testing & Iteration",
    description:
      "Conduct expanded clinical trial with 20 patients over 8 weeks. Collect SHAP scores, patient satisfaction surveys, and durability data. Iterate on the design based on clinical feedback. Publish preliminary results.",
    evidence_requirements: [
      { type: "data", description: "SHAP scores and satisfaction surveys for all 20 patients" },
      { type: "report", description: "Clinical trial report with statistical analysis" },
      { type: "document", description: "Design iteration log showing changes made from clinical feedback" },
    ],
    amount: 5000,
    deadline: "2025-11-01T00:00:00Z",
    status: "pending",
    created_at: "2025-05-01T09:00:00Z",
  },

  // --- ShieldDrone ---
  {
    id: MS_SD_1,
    grant_id: GRANT_SHIELDDRONE,
    order_num: 1,
    title: "Flight Controller & Navigation",
    description:
      "Implement encrypted MAVLink telemetry using AES-256. Develop terrain-following algorithms for low-altitude operations in variable terrain. Validate autonomous mission execution in the simulation environment with at least 50 simulated missions.",
    evidence_requirements: [
      { type: "code", description: "Encrypted telemetry implementation with security documentation" },
      { type: "data", description: "Simulation logs for 50+ autonomous missions" },
      { type: "video", description: "Simulation video demonstrating terrain-following in variable terrain" },
    ],
    amount: 5000,
    deadline: "2025-06-15T00:00:00Z",
    status: "pending",
    created_at: "2025-05-15T09:00:00Z",
  },
  {
    id: MS_SD_2,
    grant_id: GRANT_SHIELDDRONE,
    order_num: 2,
    title: "Computer Vision Integration",
    description:
      "Expand the detection model to handle adverse weather conditions (rain, dust, fog). Implement re-identification tracking for persistent monitoring of detected subjects. Optimize inference pipeline to maintain real-time performance on Jetson Orin Nano under thermal throttling.",
    evidence_requirements: [
      { type: "data", description: "Detection accuracy metrics across weather conditions" },
      { type: "code", description: "Re-identification tracking module with evaluation metrics" },
      { type: "report", description: "Thermal performance analysis under sustained operation" },
    ],
    amount: 5000,
    deadline: "2025-08-01T00:00:00Z",
    status: "pending",
    created_at: "2025-05-15T09:00:00Z",
  },
  {
    id: MS_SD_3,
    grant_id: GRANT_SHIELDDRONE,
    order_num: 3,
    title: "Field Testing & Documentation",
    description:
      "Conduct 10 field test missions in a controlled outdoor environment. Develop operational procedures manual and operator training curriculum. Produce an ethical use framework and propose regulatory compliance pathway for UAV operations.",
    evidence_requirements: [
      { type: "data", description: "Field test logs with GPS tracks and detection events" },
      { type: "document", description: "Operational procedures manual" },
      { type: "document", description: "Ethical use framework and regulatory compliance report" },
      { type: "video", description: "Field test compilation video" },
    ],
    amount: 5000,
    deadline: "2025-09-15T00:00:00Z",
    status: "pending",
    created_at: "2025-05-15T09:00:00Z",
  },
];

// =============================================================================
// MILESTONE EVIDENCE
// =============================================================================

export const MILESTONE_EVIDENCE: MilestoneEvidence[] = [
  // SolarGrid AI — Milestone 1 (approved)
  {
    id: EV_SG_1,
    milestone_id: MS_SG_1,
    user_id: USR_1,
    narrative:
      "All 10 Raspberry Pi 4 units have been procured and assembled with industrial-grade ACS712 current sensors and weatherproof IP67 enclosures. Solar power modules (20W panels + MPPT charge controllers) have been bench-tested and validated to sustain 24/7 operation. We established a supply chain relationship with MicroCity Electronics in Lagos and Kudelux in Ibadan for ongoing component sourcing. Total component spend was $4,620 — under budget by $380 which we will carry forward to Milestone 2 for additional cable management supplies needed for field deployment.",
    files: [
      { url: "https://storage.adt-demo.org/evidence/sg-m1-receipts.pdf", key: "sg-m1-receipts.pdf", type: "application/pdf", name: "Component purchase receipts" },
      { url: "https://storage.adt-demo.org/evidence/sg-m1-assembly.jpg", key: "sg-m1-assembly.jpg", type: "image/jpeg", name: "Assembled sensor node kits" },
      { url: "https://storage.adt-demo.org/evidence/sg-m1-supply-chain.pdf", key: "sg-m1-supply-chain.pdf", type: "application/pdf", name: "Supply chain documentation" },
    ],
    repo_url: "https://github.com/solargrid-ai/edge-optimizer/tree/milestone-1",
    ai_review: {
      completeness_score: 92,
      progress_assessment:
        "All deliverables have been met. Component procurement is complete with detailed receipts. Assembly photos confirm 10 functional sensor node kits. Supply chain documentation is thorough with backup supplier contacts. The under-budget delivery and plan to carry forward savings is well-managed.",
      concerns: [],
      recommendation: "Approve",
    },
    reviewer_decision: "approved",
    reviewer_notes:
      "Strong execution on procurement and assembly. Supply chain documentation exceeds expectations. Approved with commendation for budget management.",
    submitted_at: "2025-05-28T14:00:00Z",
    reviewed_at: "2025-06-02T10:00:00Z",
  },

  // SolarGrid AI — Milestone 2 (submitted, pending review)
  {
    id: EV_SG_2,
    milestone_id: MS_SG_2,
    user_id: USR_1,
    narrative:
      "We deployed sensor nodes at 2 new Arnergy mini-grid sites: Ogbomoso (50 households) and Sango-Ota (35 households). Both sites have been operational for 4 weeks. The load forecasting model achieved 18% diesel reduction at Ogbomoso and 22% at Sango-Ota during the initial data collection period — lower than the 30% at our original sites, which we attribute to the cold-start period. Performance is improving weekly as the model accumulates site-specific data. Deployment took 2 days per site with a 2-person team. Key field engineering lesson: the IP67 enclosures need additional ventilation holes in the Nigerian climate — internal temperatures reached 65 degrees Celsius on hot days, which caused the Pi to thermal-throttle. We added passive ventilation slots with mesh filters as a field modification.",
    files: [
      { url: "https://storage.adt-demo.org/evidence/sg-m2-forecast-data.csv", key: "sg-m2-forecast-data.csv", type: "text/csv", name: "4-week forecast predictions vs actuals" },
      { url: "https://storage.adt-demo.org/evidence/sg-m2-deployment-report.pdf", key: "sg-m2-deployment-report.pdf", type: "application/pdf", name: "Deployment report with site photos" },
      { url: "https://storage.adt-demo.org/evidence/sg-m2-walkthrough.mp4", key: "sg-m2-walkthrough.mp4", type: "video/mp4", name: "System walkthrough at Ogbomoso site" },
    ],
    repo_url: "https://github.com/solargrid-ai/edge-optimizer/tree/milestone-2",
    ai_review: {
      completeness_score: 85,
      progress_assessment:
        "Deployment at 2 new sites is confirmed with 4 weeks of operational data. Diesel reduction metrics (18-22%) are lower than the original sites but consistent with the expected cold-start period. The thermal management issue is a genuine concern that was proactively addressed with a field modification. Deployment report is detailed and includes useful field engineering lessons.",
      concerns: [
        "Diesel reduction at new sites is significantly below the 30% baseline — needs monitoring to confirm the model converges",
        "Thermal management issue suggests the hardware design needs revision before wider deployment",
      ],
      recommendation: "Approve",
    },
    submitted_at: "2025-07-12T16:00:00Z",
  },

  // CureBionics — Milestone 1 (approved)
  {
    id: EV_CB_1,
    milestone_id: MS_CB_1,
    user_id: USR_2,
    narrative:
      "The analog front-end has been redesigned with a dedicated instrumentation amplifier (INA128) replacing the AD8232 module, providing 20dB better common-mode rejection. The sliding-window majority voting classifier has been implemented and validated with 3 patients at CHU Ibn Rochd. Grip transition latency improved from 1.5 seconds to 380 milliseconds on average — below our 400ms target. All 3 patients reported a subjectively noticeable improvement in grip switching speed. Patient Mourad (our most demanding user) confirmed the speed is now acceptable for his carpentry work.",
    files: [
      { url: "https://storage.adt-demo.org/evidence/cb-m1-schematic.pdf", key: "cb-m1-schematic.pdf", type: "application/pdf", name: "Updated circuit schematic" },
      { url: "https://storage.adt-demo.org/evidence/cb-m1-latency-data.csv", key: "cb-m1-latency-data.csv", type: "text/csv", name: "Grip transition latency measurements" },
      { url: "https://storage.adt-demo.org/evidence/cb-m1-patient-demo.mp4", key: "cb-m1-patient-demo.mp4", type: "video/mp4", name: "Patient demonstration video" },
    ],
    ai_review: {
      completeness_score: 95,
      progress_assessment:
        "All deliverables exceeded expectations. The INA128 upgrade is a significant improvement over the AD8232. The 380ms grip transition latency beats the 400ms target. Patient validation with 3 subjects including the previously critical patient Mourad adds strong credibility. Video evidence is clear and convincing.",
      concerns: [],
      recommendation: "Approve",
    },
    reviewer_decision: "approved",
    reviewer_notes:
      "Outstanding milestone delivery. The latency improvement is clinically meaningful and well-validated. The patient follow-up with Mourad is a nice touch that demonstrates genuine user-centered development.",
    submitted_at: "2025-05-29T11:00:00Z",
    reviewed_at: "2025-06-03T09:00:00Z",
  },

  // CureBionics — Milestone 2 (approved)
  {
    id: EV_CB_2,
    milestone_id: MS_CB_2,
    user_id: USR_2,
    narrative:
      "5 complete prosthetic units have been produced with updated housing design that is compatible with both 3D printing (FDM) and injection molding. All housing parts were printed in recycled PETG from Eko3D in Casablanca. Each unit comes with a comprehensive user guide in French and Arabic covering fitting, calibration, charging, and basic maintenance. The injection molding-compatible design was validated by sending STEP files to a local molding shop (Plastima Maroc) who confirmed the parts are moldable with minor draft angle adjustments. Updated BOM per unit: $82 (down from $85 due to bulk motor purchase).",
    files: [
      { url: "https://storage.adt-demo.org/evidence/cb-m2-cad-step.zip", key: "cb-m2-cad-step.zip", type: "application/zip", name: "STEP and Fusion 360 CAD files" },
      { url: "https://storage.adt-demo.org/evidence/cb-m2-units.jpg", key: "cb-m2-units.jpg", type: "image/jpeg", name: "5 completed prosthetic units" },
      { url: "https://storage.adt-demo.org/evidence/cb-m2-user-guide.pdf", key: "cb-m2-user-guide.pdf", type: "application/pdf", name: "User guide (FR/AR)" },
    ],
    ai_review: {
      completeness_score: 94,
      progress_assessment:
        "All 5 units produced and documented. CAD files provided in both formats. Injection molding feasibility validated with a local manufacturer. User guide in French and Arabic demonstrates thoughtful localization. BOM cost reduction from $85 to $82 shows continued cost optimization.",
      concerns: [
        "Draft angle adjustments for injection molding should be incorporated into the master CAD files before Milestone 3",
      ],
      recommendation: "Approve",
    },
    reviewer_decision: "approved",
    reviewer_notes:
      "Excellent manufacturing progress. The bilingual user guide and injection molding validation show forward thinking. Approved — please integrate the draft angle adjustments into the master CAD before the clinical trial.",
    submitted_at: "2025-07-10T14:00:00Z",
    reviewed_at: "2025-07-16T11:00:00Z",
  },
];

// =============================================================================
// UNIFIED SEED_DATA EXPORT
// =============================================================================

export const SEED_DATA = {
  challenges: CHALLENGES,
  submissions: SUBMISSIONS,
  evaluations: EVALUATIONS,
  interview_sessions: INTERVIEW_SESSIONS,
  interview_answers: INTERVIEW_ANSWERS,
  grants: GRANTS,
  milestones: MILESTONES,
  milestone_evidence: MILESTONE_EVIDENCE,
} as const;
