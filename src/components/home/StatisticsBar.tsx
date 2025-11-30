import Container from '@/components/layout/Container';

const stats = [
  { value: '100+', label: 'Articles Published' },
  { value: '50+', label: 'Media Appearances' },
  { value: '20+', label: 'Countries Covered' },
  { value: '10+', label: 'Years Experience' },
];

export default function StatisticsBar() {
  return (
    <section className="py-12 bg-navy">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-heading font-bold text-teal mb-2">
                {stat.value}
              </p>
              <p className="text-gray-300 font-ui text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
