type ColumnListItem = {
  id: number;
  img: string;
  title: string;
  description: string;
  followerNum: number;
  ArticleNum: number;
  userID: number;
};

type ColumnUpload = {
  cover?: string;
  title: string;
  description?: string;
  private?: number;
};
