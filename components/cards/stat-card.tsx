// components/cards/stat-card.tsx
interface StatCardProps {
    number: string;
    label: string;
  }
  
  export function StatCard({ number, label }: StatCardProps) {
    return (
      <div className="p-4">
        <div className="text-4xl font-bold text-red-600 mb-2">{number}</div>
        <div className="text-gray-400">{label}</div>
      </div>
    );
  }