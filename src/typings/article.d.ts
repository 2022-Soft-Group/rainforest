type ArticlesListItem = {
  title: string;
  author: string;
  authorID: number;
  description: string;
  view: number;
  like: number;
  collection: number;
  comments: number;
  tags: TagItem[];
  image: string;
  articleID: number;
};

type ArticleUpload = {
  title: string;
  content: string;
  description: string;
  image: string;
  tags: Arrary<number>;
  private: boolean;
};

type CommentListItem = {
  commentorID: number;
  content: string;
  image: string | null;
  toCommentID: number | null;
  like: number;
  createTime: string;
  commentID: number;
  toCommentorName: string;
};
