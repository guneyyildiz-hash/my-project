import Link from 'next/link';
import Container from '@/components/layout/Container';

const expertiseAreas = [
  {
    title: 'AI & Technology',
    description: 'Leveraging artificial intelligence for political analysis, content generation, and research insights.',
    icon: '🤖',
    href: '/expertise#ai',
  },
  {
    title: 'Political & Economic Analysis',
    description: 'Strategic assessment of geopolitical risks and economic trends for businesses and governments.',
    icon: '📊',
    href: '/expertise#analysis',
  },
  {
    title: 'Turkey, Kurdish Affairs, Syria & Iraq',
    description: 'Deep expertise in Turkish politics, Kurdish issues, and Levant regional dynamics.',
    icon: '🇹🇷',
    href: '/expertise#turkey-levant',
  },
  {
    title: 'Gulf States, Energy & Trading',
    description: 'Analysis of Saudi Arabia, UAE, Qatar relations, energy markets, and regional trade.',
    icon: '⚡',
    href: '/expertise#gulf',
  },
];

export default function ExpertiseGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-charcoal mb-4">
            Areas of Expertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized knowledge spanning the Middle East, Turkey, and international relations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area) => (
            <Link 
              key={area.title}
              href={area.href}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-teal hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-4xl mb-4 block">{area.icon}</span>
              <h3 className="text-lg font-heading font-semibold text-charcoal mb-2 group-hover:text-teal transition-colors">
                {area.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
