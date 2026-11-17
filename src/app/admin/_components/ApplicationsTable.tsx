import type { BusinessApplication } from "@prisma/client";
import { ApplicationRow } from "./ApplicationRow";

export function ApplicationsTable({ applications }: { applications: BusinessApplication[] }) {
  if (applications.length === 0) {
    return <p className="card mt-6 p-8 text-center text-muted-foreground">Одоогоор хүсэлт алга.</p>;
  }
  return (
    <div className="card mt-6 overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Байгууллага</th>
            <th className="px-4 py-3">Холбоо барих</th>
            <th className="px-4 py-3">Төлөв</th>
            <th className="px-4 py-3">Огноо</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <ApplicationRow key={a.id} application={a} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
