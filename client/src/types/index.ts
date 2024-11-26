export type AuthenticatedType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
};

export type SortOrderType = "latest" | "oldest";

export type FormCardType = {
  id: string;
  title: string;
  description: string;
  visitsCount: number;
  submissionsCount: number;
  updatedAt: Date;
  createdAt: Date;
  published: boolean;
};
