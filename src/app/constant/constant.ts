export enum VISIBILITY {
  PUBLIC = 'PUBLIC',
  FOLLOWERS = 'FOLLOWERS',
  FRIENDS = 'FRIENDS',
  ONLY_ME = 'ONLY_ME',
}
export enum EntityType {
  Post = 'Post',
  Challenge = 'Challenge',
  Story = 'Story',
  Service = 'Service',
  Course='Course',
  Mentor='Mentor',
}

export enum MEDIA_TYPE {
  image = 'image',
  video = 'video',
  raw = 'raw',
}
export const excludeField = ['searchTerm', 'sort', 'fields', 'page', 'limit'];
