import type { BusinessApplication } from "@prisma/client";
import { ApplicationStatus } from "./ApplicationStatus";
import { ApplyForm } from "./ApplyForm";

type Props = { application: BusinessApplication | null; defaults: { contactName: string; phone: string } };

/** Not (yet) B2B: application status and, if allowed, the form. */
export function ApplyView({ application, defaults }: Props) {
  const showForm = !application || application.status === "REJECTED";
  return (
    <div className="max-w-3xl">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Бизнес хэрэглэгч болох</h1>
      <p className="mt-2 text-muted-foreground">
        Ресторан, зочид буудал, дэлгүүр зэрэг байгууллагууд бүртгүүлээд бүх захиалгадаа үнэгүй хүргэлт авна.
      </p>
      {application && <ApplicationStatus application={application} />}
      {showForm && <ApplyForm defaults={defaults} />}
    </div>
  );
}
