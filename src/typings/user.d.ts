type MessageInfo = {
  userName: string;
  userID: number;
  userAvatar: string;
  actions: number;
  articleTitle: string;
  articleID: string;
  msgID: number;
  content: string;
};

type User = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  sex: number;
  email: string;
  phone: string;
  coin: number;
  createTime: string;
  modifyTime: string;
  isAdmin: boolean;
};

type UserFeature = {
  id: number;
  name: string;
  avatar: string;
  articleNum: number;
  followingNum: number;
  followedNum: number;
  collectedNum: number;
  likedNum: number;
};
