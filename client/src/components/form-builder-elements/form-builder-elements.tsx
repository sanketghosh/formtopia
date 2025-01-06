import { FormElementsType } from "@/types";
import {
  DateFieldFormElement,
  NumberFieldFormElement,
  ParagraphFieldFormElement,
  SeparatorFieldFormElement,
  SpacerFieldFormElement,
  SubtitleFieldFormElement,
  TextareaFieldFormElement,
  TextFieldFormElement,
  TitleFieldFormElement,
} from "@/components/form-builder-elements/fields";

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement,
};
