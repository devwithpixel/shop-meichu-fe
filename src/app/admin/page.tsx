import AdminOnly from "@/components/middleware/admin-only";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <AdminOnly>
      <section className="flex gap-3">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Shop Meichu</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </section>
    </AdminOnly>
  );
}
