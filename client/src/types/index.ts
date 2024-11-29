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

  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes: Record<string, any>;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};
