import { FormElements } from "../form-builder-elements";
import SidebarFormElementButton from "../sidebar-form-element-button";

export default function ElementsButtonsSidebar() {
  return (
    <div className="space-y-3">
      <h1>Elements</h1>
      <div className="grid grid-cols-3 gap-3">
        <SidebarFormElementButton formElement={FormElements.TextField} />
      </div>
    </div>
  );
}
