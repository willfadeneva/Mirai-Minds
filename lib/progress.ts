export type ProgressKind =
  | "alphabet"
  | "vocab"
  | "story"
  | "game"
  | "worksheet"
  | "placement";

export function makeProgressId(
  kind: ProgressKind,
  grade: number | string,
  id: string
) {
  return `${kind}:grade-${grade}:${id}`;
}
