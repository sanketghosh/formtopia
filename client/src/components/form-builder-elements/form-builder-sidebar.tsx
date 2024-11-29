import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import SidebarFormElementButton from "@/components/form-builder-elements/sidebar-form-element-button";

export default function FormBuilderSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[450px] overflow-y-auto border-l border-sidebar-border bg-sidebar lg:block">
      <div className="px-5 py-6">
        <SidebarFormElementButton formElement={FormElements.TextField} />
      </div>
    </aside>
  );
}
