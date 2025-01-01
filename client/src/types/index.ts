import React from "react";

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

/***********************************
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 **********************************/

/**
 * All the types related to
 * form builder and elements related to that
 */

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButton: {
    icon: React.ElementType;
    label: string;
  };

  formElementComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes: Record<string, any>;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};

/***********************************
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 **********************************/

export type Submission = {
  id: String;
  submittedAt: Date;
  city?: String;
  country?: String;
  browser?: String;
  os?: String;
  device?: String;
};

export type FormData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  description: string;
  content: string;
  visitsCount: number;
  submissionsCount: number;
  shareURL: string;
  formSubmissions: Submission[];
};
