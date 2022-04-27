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
  columnID: number;
};
