import { Suspense } from 'react';
import DoctorDashboardComponent from "../../components/DoctorDashboardComponent"

export default function DoctorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorDashboardComponent />
    </Suspense>
  );
}
