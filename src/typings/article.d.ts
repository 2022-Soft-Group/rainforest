type ArticlesListItem = {
  title: string;
  author: string;
  authorID: number;
  description: string;
  view: number;
  like: number;
  collection: number;
  comments: number;
  tags: string[];
  image: string;
  articleID: number;
  column: string;
  columnID: number;
};

type ArticleUpload = {
  title: string;
  content: string;
  description: string;
  image: string;
  tags: Arrary<number>;
  columnID: number;
};
