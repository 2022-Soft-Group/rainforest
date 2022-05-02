type MessageInfo = {
  userName: string;
  userID: number;
  userAvatar: string;
  actions: number;
  articleTitle: string;
  articleID: string;
};

type User = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  sex: number;
  email: string;
  phone: string;
  coin: number;
  createTime: string;
  modifyTime: string;
  articleNum: number;
};
