/**
 * منصة الطلاب والمستقبل | نظام تخزين وإدارة بيانات الطالب الذكية
 * دعم التخزين الهجين (Offline-First عبر LocalStorage مع مزامنة السحابة)
 */

export type UserRole =
  | "school_student" // طالب مدرسة (توجيهي)
  | "uni_student"    // طالب جامعي
  | "graduate"       // خريج باحث عن عمل
  | "parent"         // ولي أمر
  | "advisor"        // مرشد أكاديمي / تربوي
  | "recruiter";     // ممثل سوق العمل

export type TawjihiBranch =
  | "scientific"        // علمي
  | "literary"          // أدبي
  | "industrial"        // صناعي
  | "information_tech"  // تكنولوجيا المعلومات
  | "health"            // حقل صحي
  | "agricultural";     // زراعي

export interface StudentProfile {
  name: string;
  role: UserRole;
  tawjihiBranch: TawjihiBranch;
  tawjihiGpa: number; // e.g. 88.5
  governorate: string; // المحافظة
  budgetTier: "public_regular" | "public_parallel" | "private" | "flexible";
  interests: string[];
}

export interface CertProgressRecord {
  status: "not_started" | "in_progress" | "completed";
  progressPercent: number;
  completedAt?: string;
}

export interface StudentState {
  profile: StudentProfile;
  bookmarkedMajors: string[]; // slugs
  bookmarkedCerts: string[];  // ids
  certProgress: Record<string, CertProgressRecord>;
  points: number;
  badges: string[];
}

const DEFAULT_STATE: StudentState = {
  profile: {
    name: "طالب طموح",
    role: "school_student",
    tawjihiBranch: "scientific",
    tawjihiGpa: 82.0,
    governorate: "عمان",
    budgetTier: "public_regular",
    interests: ["البرمجة والذكاء الاصطناعي", "التكنولوجيا"],
  },
  bookmarkedMajors: ["computer-science", "cybersecurity"],
  bookmarkedCerts: ["cs50x", "google-cybersecurity-foundations"],
  certProgress: {
    "cs50x": { status: "in_progress", progressPercent: 40 },
  },
  points: 150,
  badges: ["مستكشف المستقبل", "مخطط التوجيهي"],
};

const STORAGE_KEY = "students_future_student_state_v1";

let listeners: Array<() => void> = [];
let cachedState: StudentState | null = null;
let lastRawStorage: string | null = null;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function getStudentState(): StudentState {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cachedState = DEFAULT_STATE;
      lastRawStorage = null;
      return DEFAULT_STATE;
    }
    if (raw === lastRawStorage && cachedState !== null) {
      return cachedState;
    }
    lastRawStorage = raw;
    cachedState = { ...DEFAULT_STATE, ...JSON.parse(raw) };
    return cachedState;
  } catch {
    cachedState = DEFAULT_STATE;
    return DEFAULT_STATE;
  }
}

export function saveStudentState(next: Partial<StudentState>): StudentState {
  const current = getStudentState();
  const updated: StudentState = {
    ...current,
    ...next,
    profile: {
      ...current.profile,
      ...(next.profile || {}),
    },
  };

  cachedState = updated;
  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(updated);
      lastRawStorage = raw;
      localStorage.setItem(STORAGE_KEY, raw);
    } catch (e) {
      console.error("Failed to save student state to localStorage", e);
    }
  }

  emitChange();
  return updated;
}

export function toggleMajorBookmark(slug: string): boolean {
  const current = getStudentState();
  const exists = current.bookmarkedMajors.includes(slug);
  const updated = exists
    ? current.bookmarkedMajors.filter((s) => s !== slug)
    : [...current.bookmarkedMajors, slug];

  let points = current.points;
  let badges = [...current.badges];
  if (!exists) {
    points += 15; // مكافأة على استكشاف وحفظ التخصص
    if (!badges.includes("صانع القرارات")) {
      badges.push("صانع القرارات");
    }
  }

  saveStudentState({
    bookmarkedMajors: updated,
    points,
    badges,
  });

  return !exists;
}

export function toggleCertBookmark(certId: string): boolean {
  const current = getStudentState();
  const exists = current.bookmarkedCerts.includes(certId);
  const updated = exists
    ? current.bookmarkedCerts.filter((id) => id !== certId)
    : [...current.bookmarkedCerts, certId];

  saveStudentState({
    bookmarkedCerts: updated,
  });

  return !exists;
}

export function updateCertProgress(
  certId: string,
  status: "not_started" | "in_progress" | "completed",
  progressPercent = 100
) {
  const current = getStudentState();
  const existing = current.certProgress[certId] || { status: "not_started", progressPercent: 0 };
  
  let points = current.points;
  let badges = [...current.badges];

  if (status === "completed" && existing.status !== "completed") {
    points += 100;
    if (!badges.includes("حاصد الشهادات")) {
      badges.push("حاصد الشهادات");
    }
  } else if (status === "in_progress" && existing.status === "not_started") {
    points += 25;
  }

  const updatedProgress = {
    ...current.certProgress,
    [certId]: {
      status,
      progressPercent: status === "completed" ? 100 : progressPercent,
      completedAt: status === "completed" ? new Date().toISOString() : existing.completedAt,
    },
  };

  saveStudentState({
    certProgress: updatedProgress,
    points,
    badges,
  });
}

/**
 * الاشتراك في تغييرات الحالة مع التوافق الكامل مع React
 */
export function subscribeStudentStore(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/**
 * خوارزمية مطابقة التخصصات الذكية مع معدل وفرع الطالب
 */
export interface MatchedMajorInfo {
  slug: string;
  matchScore: number; // 0 - 100
  status: "متاح تنافسياً" | "متاح موازياً" | "خارج النطاق الحالي" | "غير متاح للفرع";
  reason: string;
  minEstimatedGpa: number;
}

// الحدود الدنيا التقريبية لمعدلات القبول في الأردن
const MAJOR_GPA_THRESHOLDS: Record<string, { minGpa: number; allowedBranches: TawjihiBranch[] }> = {
  "computer-science": { minGpa: 78, allowedBranches: ["scientific", "industrial", "information_tech"] },
  "cybersecurity": { minGpa: 82, allowedBranches: ["scientific", "industrial", "information_tech"] },
  "data-science-ai": { minGpa: 84, allowedBranches: ["scientific", "industrial", "information_tech"] },
  "software-engineering": { minGpa: 80, allowedBranches: ["scientific", "industrial", "information_tech"] },
  "nursing": { minGpa: 75, allowedBranches: ["scientific", "health"] },
  "civil-engineering": { minGpa: 80, allowedBranches: ["scientific", "industrial"] },
  "medicine": { minGpa: 93, allowedBranches: ["scientific", "health"] },
  "dentistry": { minGpa: 89, allowedBranches: ["scientific", "health"] },
  "pharmacy": { minGpa: 82, allowedBranches: ["scientific", "health"] },
  "medical-lab": { minGpa: 75, allowedBranches: ["scientific", "health"] },
  "biomedical-engineering": { minGpa: 83, allowedBranches: ["scientific", "industrial"] },
  "renewable-energy-engineering": { minGpa: 80, allowedBranches: ["scientific", "industrial"] },
  "fintech": { minGpa: 72, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
  "digital-media-design": { minGpa: 68, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
  "supply-chain-logistics": { minGpa: 65, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
  "electrical-engineering": { minGpa: 80, allowedBranches: ["scientific", "industrial"] },
  "mechanical-engineering": { minGpa: 80, allowedBranches: ["scientific", "industrial"] },
  "business-administration": { minGpa: 65, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
  "accounting": { minGpa: 70, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
  "english-language": { minGpa: 65, allowedBranches: ["scientific", "literary"] },
  "law": { minGpa: 75, allowedBranches: ["scientific", "literary"] },
  "digital-marketing": { minGpa: 65, allowedBranches: ["scientific", "literary", "industrial", "information_tech"] },
};

export function evaluateMajorMatch(majorSlug: string, profile: StudentProfile): MatchedMajorInfo {
  const meta = MAJOR_GPA_THRESHOLDS[majorSlug] || { minGpa: 65, allowedBranches: ["scientific", "literary"] };

  if (!meta.allowedBranches.includes(profile.tawjihiBranch)) {
    return {
      slug: majorSlug,
      matchScore: 15,
      status: "غير متاح للفرع",
      reason: `هذا التخصص متاح لفروع محددة لا تشمل فرعك الحالي (${profile.tawjihiBranch}).`,
      minEstimatedGpa: meta.minGpa,
    };
  }

  const gpaDiff = profile.tawjihiGpa - meta.minGpa;

  if (gpaDiff >= 0) {
    const score = Math.min(100, Math.round(75 + gpaDiff * 2.5));
    return {
      slug: majorSlug,
      matchScore: score,
      status: "متاح تنافسياً",
      reason: `معدلك (${profile.tawjihiGpa}) أعلى من الحد الأدنى التقديري للقبول التنافسي (${meta.minGpa}).`,
      minEstimatedGpa: meta.minGpa,
    };
  } else if (gpaDiff >= -8) {
    const score = Math.max(40, Math.round(70 + gpaDiff * 4));
    return {
      slug: majorSlug,
      matchScore: score,
      status: "متاح موازياً",
      reason: `معدلك قريب من الحد التنافسي، ويمكنك قبوله عبر البرنامج الموازي أو الجامعات الخاصة.`,
      minEstimatedGpa: meta.minGpa,
    };
  } else {
    return {
      slug: majorSlug,
      matchScore: 25,
      status: "خارج النطاق الحالي",
      reason: `الحد التقديري للقبول (${meta.minGpa}) أعلى من معدلك الحالي بفارق ملحوظ.`,
      minEstimatedGpa: meta.minGpa,
    };
  }
}
