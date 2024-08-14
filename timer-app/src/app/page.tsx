// src/app/page.tsx
import DateTimeSelector from '../components/DateTimeSelector'; // Adjust the path if needed

export default function Home() {
  return (
    <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
 

      {/* DateTimeSelector Component */}
      <DateTimeSelector />
    </main>
  );
}
