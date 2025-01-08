import React from "react";
import { LucideIcon } from "lucide-react";

export type AuthenticatedType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
};

export type SortOrderType = "latest" | "oldest";
export type SortStatusType = "all" | "published" | "unpublished";

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

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubtitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextareaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButton: {
    icon: LucideIcon;
    label: string;
  };

  formElementComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
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
  id: string;
  submittedAt: Date;
  city?: string;
  country?: string;
  browser?: string;
  os?: string;
  device?: string;
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

/***********************************
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 *                                 *
 **********************************/

export type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
  isPercentage: boolean;
};

export type SubmissionType = {
  browser?: string | null;
  city?: string | null;
  content: string;
  id: string;
  country?: string | null;
  submittedAt: string;
  device: string | null;
  os: string | null;
};

/************************* */

export type ColumnType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};
export type RowType = { [key: string]: string } & {
  submittedAt: Date;
};

export type SubmissionAccessType = "authenticated" | "everyone";
