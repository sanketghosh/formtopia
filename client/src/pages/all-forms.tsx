import FormCard from "@/components/cards/form-card";

export default function AllForms() {
  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4, 5].map(() => (
          <FormCard
            title="This is just to collect data"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A maiores nemo, magnam nesciunt ab et blanditiis ipsum maxime explicabo dignissimos."
            updatedOnDate={new Date()}
            clicks={3000}
            responses={986}
            isPublic
          />
        ))}
      </div>
    </div>
  );
}
