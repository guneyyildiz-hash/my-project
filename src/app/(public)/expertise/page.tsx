import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Expertise | Guney Yildiz',
  description: 'Areas of expertise including Turkey, Middle East, Gulf politics, energy security, and political risk analysis.',
};

const expertiseAreas = [
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI & Technology',
    description: 'Leveraging artificial intelligence for political analysis, content generation, and research insights.',
    topics: [
      'AI-powered content analysis',
      'Machine learning for risk assessment',
      'Natural language processing',
      'Automated research tools',
      'Data-driven insights',
      'Technology policy analysis',
    ],
  },
  {
    id: 'analysis',
    icon: '📊',
    title: 'Political & Economic Analysis',
    description: 'Strategic assessment frameworks for businesses, governments, and international organizations.',
    topics: [
      'Country risk assessment',
      'Geopolitical scenario planning',
      'Investment risk analysis',
      'Economic trend forecasting',
      'Policy impact evaluation',
      'Due diligence research',
    ],
  },
  {
    id: 'turkey-levant',
    icon: '🇹🇷',
    title: 'Turkey, Kurdish Affairs, Syria & Iraq',
    description: 'Deep expertise in Turkish politics, Kurdish issues, and Levant regional dynamics.',
    topics: [
      'Turkish domestic politics and elections',
      'Kurdish political movements',
      'Syrian civil war dynamics',
      'Post-ISIS Iraq',
      'Regional power competition',
      'Reconstruction challenges',
    ],
  },
  {
    id: 'gulf',
    icon: '⚡',
    title: 'Gulf States, Energy & Trading',
    description: 'Analysis of Gulf Cooperation Council dynamics, energy markets, and regional trade.',
    topics: [
      'Saudi Arabia\'s Vision 2030',
      'UAE regional strategy',
      'Energy market dynamics',
      'Gulf investment trends',
      'Regional trade networks',
      'Iran-Gulf relations',
    ],
  },
];

export default function ExpertisePage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Areas of Expertise
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Over a decade of specialized research and analysis on the Middle East, 
            Turkey, and international politics.
          </p>
        </div>

        {/* Expertise Areas */}
        <div className="space-y-16">
          {expertiseAreas.map((area) => (
            <section key={area.id} id={area.id} className="scroll-mt-24">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                  <span className="text-5xl block mb-4">{area.icon}</span>
                  <h2 className="text-2xl font-heading font-bold text-charcoal mb-3">
                    {area.title}
                  </h2>
                  <p className="text-gray-600">
                    {area.description}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="font-heading font-semibold text-charcoal mb-4">
                      Key Topics
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {area.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-navy rounded-2xl p-12">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Need Expert Analysis?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              I provide research, analysis, and advisory services for media organizations, 
              businesses, and policy institutions.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
