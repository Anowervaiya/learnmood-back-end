export enum VISIBILITY {
  PUBLIC = 'PUBLIC',
  FOLLOWERS = 'FOLLOWERS',
  FRIENDS = 'FRIENDS',
  ONLY_ME = 'ONLY_ME',
}
export enum EntityType {
  POST = 'Post',
  CHALLENGE = 'Challenge',
  STORY = 'Story',
  SERVICE = 'Service',
  COURSE='Course'
}

export enum MEDIA_TYPE {
  image = 'image',
  video = 'video',
  raw = 'raw',
}
export const excludeField = ['searchTerm', 'sort', 'fields', 'page', 'limit'];
