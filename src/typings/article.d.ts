type ArticleItem = {
  title: string;
  author: string;
  authorID: number;
  description: string;
  view: number;
  like: number;
  collection: number;
  comments: number;
  tags: TagItem[];
  image: string | undefined;
  articleID: number;
  thumbnail: string | null;
  deleted: boolean;
  modifyTime: string;
  createTime: string;
};

type DraftItem = {
  title: string;
  authorID: number;
  tags: TagItem[];
  image: string;
  thumbnail: string;
  draftID: number;
  description: string;
};

type ArticleUpload = {
  title: string;
  content: string;
  description: string;
  image?: string;
  private: boolean;
  imageID?: number;
};

type CommentListItem = {
  commentorID: number;
  content: string;
  image: string | null;
  toCommentID: number | null;
  like: number;
  liked: boolean;
  createTime: string;
  commentID: number;
  toCommentorName: string;
  deleted: boolean;
};
