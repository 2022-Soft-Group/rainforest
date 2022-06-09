type ColumnListItem = {
  id: number;
  img: string;
  title: string;
  description: string;
  followerNum: number;
  articleNum: number;
  userID: number;
};

type ColumnUpload = {
  cover?: string;
  title: string;
  description?: string;
  private?: number;
};
type ColumnUpdate = {
  cover: string;
  title: string;
  description: string;
  columnID: string;
};
type ads = {
  title: string;
  url: string;
  img: string;
  id: number;
};
