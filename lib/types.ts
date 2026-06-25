export type Tier = "Apprentice" | "Builder" | "Operator" | "Principal";

export type Vertical =
  | "Defense Tech"
  | "Biotech"
  | "Health Sciences"
  | "Climate Tech"
  | "Energy & Power"
  | "Robotics"
  | "ML/AI Research"
  | "Cryptography"
  | "Hardware & Semiconductors"
  | "Space Tech"
  | "Edge Computing"
  | "Agritech";

export type Availability = "Available" | "Engaged" | "Partial" | "On Leave";

export interface SkillScore {
  skill: string;
  score: number; // 0-100
}

export interface WokkahthonRun {
  cohort: string;
  date: string;
  agentsBuilt: number;
  completionRate: number;
  industry: string;
  verdict: "Advanced" | "Pool" | "Reassigned";
}

export interface Project {
  title: string;
  vertical: Vertical;
  role: string;
  outcome: string;
}

export interface Talent {
  id: string;
  name: string;
  headline: string;
  city: string;
  country: string;
  flag: string;
  tier: Tier;
  verticals: Vertical[];
  skills: SkillScore[];
  availability: Availability;
  availabilityDetail: string;
  completionRate: number; // %
  agentsBuilt: number;
  hoursLogged: number;
  rate: string; // hourly band
  wokkahthons: WokkahthonRun[];
  projects: Project[];
  bio: string;
  joined: string;
  yearsExp: number;
  spokenLanguages: string[];
  githubHandle: string;
}

export interface Cohort {
  id: string;
  name: string;
  window: string;
  status: "Live" | "Assessment" | "Closed";
  enrolled: number;
  active: number;
  agentsTarget: number;
  agentsActual: number;
  verticalFocus: Vertical[];
  partner?: string;
  advancement: number; // % advanced to Operator+
}

// === Evaluation & Interview Types ===

export type EvaluationStatus = "pending" | "evaluating" | "evaluated" | "error";
export type Recommendation = "Advance" | "Review" | "Reject";
export type InterviewStatus = "pending" | "in_progress" | "completed" | "reviewed";
export type InterviewRecommendation = "Advance to Panel" | "Needs Follow-up" | "Reject";
export type UserRole = "admin" | "reviewer" | "investor" | "participant";
export type GrantStatus = "active" | "completed" | "paused" | "terminated";
export type MilestoneStatus = "pending" | "submitted" | "under_review" | "approved" | "revision_requested" | "rejected";

export interface Challenge {
  id: string;
  name: string;
  description: string;
  year: number;
  status: "active" | "closed";
  criteria: CriterionConfig[];
  created_at: string;
}

export interface CriterionConfig {
  name: string;
  weight: number;
  description: string;
}

export interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  participant_name: string;
  team_name?: string;
  repo_url?: string;
  documentation_url?: string;
  video_pitch_url?: string;
  description: string;
  claimed_technologies: string[];
  country?: string;
  city?: string;
  status: EvaluationStatus;
  created_at: string;
}

export interface EvaluationCriterionScore {
  name: string;
  weight: number;
  score: number;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CodeAnalysis {
  languages: string[];
  quality: string;
  architecture_notes: string;
}

export interface VideoAnalysis {
  transcript: string;
  presentation_quality: number;
  technical_understanding: number;
  key_points: string[];
}

export interface Evaluation {
  id: string;
  submission_id: string;
  criteria_scores: EvaluationCriterionScore[];
  overall_score: number;
  recommendation: Recommendation;
  summary: string;
  code_analysis?: CodeAnalysis;
  video_analysis?: VideoAnalysis;
  evaluated_by: string;
  duration_ms?: number;
  created_at: string;
}

export interface InterviewQuestion {
  id: string;
  order: number;
  category: "technical" | "process" | "authenticity" | "behavioral";
  question: string;
  context: string;
  expected_depth: string;
  max_duration_seconds: number;
}

export interface AnswerAnnotation {
  timestamp_seconds: number;
  note: string;
  type: "positive" | "concern" | "flag";
}

export interface AnswerEvaluation {
  technical_accuracy: number;
  depth_of_understanding: number;
  authenticity: number;
  communication_quality: number;
  overall_score: number;
  reasoning: string;
  red_flags: string[];
  annotations: AnswerAnnotation[];
}

export interface InterviewAnswer {
  id: string;
  session_id: string;
  question_id: string;
  video_url?: string;
  video_key?: string;
  transcript?: string;
  duration_seconds?: number;
  evaluation?: AnswerEvaluation;
  created_at: string;
}

export interface InterviewReport {
  overall_score: number;
  recommendation: InterviewRecommendation;
  summary: string;
  strength_areas: string[];
  concern_areas: string[];
  red_flags: string[];
  follow_up_questions: string[];
}

export interface InterviewSession {
  id: string;
  submission_id: string;
  user_id: string;
  participant_name?: string;
  status: InterviewStatus;
  questions: InterviewQuestion[];
  overall_report?: InterviewReport;
  created_at: string;
  completed_at?: string;
}

// === Grant & Milestone Types ===

export interface Grant {
  id: string;
  submission_id: string;
  user_id: string;
  participant_name?: string;
  total_amount: number;
  currency: string;
  status: GrantStatus;
  created_at: string;
}

export interface EvidenceRequirement {
  type: string;
  description: string;
}

export interface Milestone {
  id: string;
  grant_id: string;
  order_num: number;
  title: string;
  description: string;
  evidence_requirements: EvidenceRequirement[];
  amount: number;
  deadline?: string;
  status: MilestoneStatus;
  created_at: string;
}

export interface MilestoneEvidence {
  id: string;
  milestone_id: string;
  user_id: string;
  narrative?: string;
  files?: { url: string; key: string; type: string; name: string }[];
  repo_url?: string;
  video_url?: string;
  video_key?: string;
  ai_review?: {
    completeness_score: number;
    progress_assessment: string;
    concerns: string[];
    recommendation: "Approve" | "Request More Info" | "Reject";
  };
  reviewer_decision?: string;
  reviewer_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
}

// === Joined types for UI ===

export interface SubmissionWithEvaluation extends Submission {
  evaluation?: Evaluation;
  interview?: InterviewSession;
  grant?: Grant;
}
