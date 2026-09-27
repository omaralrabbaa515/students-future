import { useSyncExternalStore } from "react";
import {
  getStudentState,
  subscribeStudentStore,
  saveStudentState,
  toggleMajorBookmark,
  toggleCertBookmark,
  updateCertProgress,
  evaluateMajorMatch,
  type StudentProfile,
  type StudentState,
} from "@/lib/student-store";

export function useStudent() {
  const state = useSyncExternalStore<StudentState>(
    subscribeStudentStore,
    getStudentState,
    getStudentState // SSR fallback
  );

  return {
    ...state,
    updateProfile: (profile: Partial<StudentProfile>) => saveStudentState({ profile: { ...state.profile, ...profile } }),
    toggleMajorBookmark,
    toggleCertBookmark,
    updateCertProgress,
    evaluateMajorMatch: (slug: string) => evaluateMajorMatch(slug, state.profile),
  };
}
