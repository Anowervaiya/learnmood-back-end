import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/auth/auth.route';
import { PostRoutes } from '../module/post/post.route';
import { CommentRoutes } from '../module/comments/comment.route';
import { ReactRoutes } from '../module/reacts/react.route';
import { OtpRoutes } from '../module/otp/otp.route';
import { StoryRoutes } from '../module/story/story.route';
import { ChallengeRoutes } from '../module/challenge/challenge.route';
import { PageRoutes } from '../module/page/page.routes';
import { ServiceRoutes } from '../module/service/service.routes';
import { MessageRoutes } from '../module/message/message.route';
import { ReviewRoutes } from '../module/reviews/review.route';
import { NotificationRoutes } from '../module/notifications/notification.route';
import { MentorRoutes } from '../module/mentors/mentor.route';
import { VideoRoutes } from '../module/video/video.route';


export const mainRoutes = Router();


const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/page',
    route: PageRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },

  {
    path: '/comment',
    route: CommentRoutes,
  },

  {
    path: '/react',
    route: ReactRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/otp',
    route: OtpRoutes,
  },
  {
    path: '/story',
    route: StoryRoutes,
  },
  {
    path: '/challenge',
    route: ChallengeRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/mentor',
    route: MentorRoutes,
  },
  {
    path: '/video',
    route: VideoRoutes,
  },
];

moduleRoutes.forEach(route => {
  if (route.route) {
    mainRoutes.use(route.path, route.route);
  }
});
