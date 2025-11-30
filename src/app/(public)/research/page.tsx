import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Research | Guney Yildiz',
  description: 'PhD research at Cambridge University on political risk and regional conflict dynamics.',
};

export default function ResearchPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Research
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            My academic research focuses on understanding political risk, conflict dynamics, 
            and regional politics in the Middle East.
          </p>
        </div>

        {/* PhD Research */}
        <section className="mb-16">
          <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎓</span>
              <span className="text-teal font-ui font-medium">PhD Research</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-charcoal mb-4">
              Political Risk and Regional Conflict Dynamics in the Middle East
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              University of Cambridge | 2020 - Present
            </p>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                My doctoral research examines how political risk emerges and evolves in 
                conflict-affected regions, with a particular focus on the Middle East. 
                The study develops a novel framework for understanding the interplay 
                between domestic political dynamics, regional power competition, and 
                international intervention.
              </p>
              <p>
                Key research questions include:
              </p>
              <ul>
                <li>How do local, regional, and international factors interact to shape political risk?</li>
                <li>What role do non-state actors play in regional conflict dynamics?</li>
                <li>How can political risk assessment be improved through multi-level analysis?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Research Framework */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-8">
            Research Framework: RCM Model
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="font-heading font-semibold text-charcoal mb-2">Regime</h3>
              <p className="text-gray-600 text-sm">
                Analysis of domestic political structures, institutions, and governance patterns.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-heading font-semibold text-charcoal mb-2">Competition</h3>
              <p className="text-gray-600 text-sm">
                Regional power dynamics, alliances, and competitive pressures between states.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-heading font-semibold text-charcoal mb-2">Mediation</h3>
              <p className="text-gray-600 text-sm">
                International intervention, diplomatic efforts, and external influence patterns.
              </p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-8">
            Academic Publications
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Political Risk Assessment in Conflict Zones: A Multi-Level Framework',
                journal: 'Journal of International Affairs',
                year: '2023',
                status: 'Published',
              },
              {
                title: 'Turkey\'s Regional Role: Between Mediation and Competition',
                journal: 'Middle Eastern Studies',
                year: '2022',
                status: 'Published',
              },
              {
                title: 'Non-State Actors and Regional Stability: The Kurdish Case',
                journal: 'Conflict Studies Quarterly',
                year: '2024',
                status: 'Under Review',
              },
            ].map((pub) => (
              <div key={pub.title} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-charcoal mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-ui">
                      {pub.journal} | {pub.year}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-ui rounded-full ${
                    pub.status === 'Published' 
                      ? 'bg-teal/10 text-teal' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {pub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Research Collaboration
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            I welcome opportunities for research collaboration, academic partnerships, 
            and policy-oriented projects.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
