interface SummaryBulletsProps {
  bullets: string[];
}

export default function SummaryBullets({ bullets }: SummaryBulletsProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="bg-teal/5 border border-teal/20 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-heading font-semibold text-teal mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Key Takeaways
      </h2>
      <ul className="space-y-3">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-ui font-medium">
              {index + 1}
            </span>
            <span className="text-gray-700 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
