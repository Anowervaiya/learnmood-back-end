export enum CHALLENGE_CATEGORY {
  language='language',
  health='health',
  reading='reading',
  habit='habit',
  skill = 'skill',
  academic_study='academic study',
  other='other',
}
export enum CHALLENGE_STATUS {
  upcoming='upcoming',
  ongoing='ongoing',
  completed='completed',
}
export const ChallengeSearchableFields = ['title', 'description', 'category'];