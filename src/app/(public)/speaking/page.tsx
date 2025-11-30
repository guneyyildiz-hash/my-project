import { Container } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Speaking | Guney Yildiz',
  description: 'Speaking engagements, conference presentations, and panel discussions by Guney Yildiz.',
};

const speakingEvents = [
  {
    id: '1',
    title: 'Turkey\'s Regional Strategy: 2024 Outlook',
    event: 'Chatham House Middle East Conference',
    date: '2024-02-15',
    location: 'London, UK',
    type: 'keynote',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Energy Politics in the Eastern Mediterranean',
    event: 'ECFR Annual Summit',
    date: '2024-01-20',
    location: 'Brussels, Belgium',
    type: 'panel',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Kurdish Politics: Past, Present, and Future',
    event: 'Cambridge University Middle East Series',
    date: '2024-01-10',
    location: 'Cambridge, UK',
    type: 'lecture',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Gulf States: New Alliances, New Challenges',
    event: 'Middle East Institute Annual Conference',
    date: '2023-12-05',
    location: 'Washington, DC',
    type: 'panel',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Political Risk in the Middle East',
    event: 'Business Leaders Summit',
    date: '2023-11-15',
    location: 'Dubai, UAE',
    type: 'workshop',
    status: 'completed',
  },
];

const typeLabels: Record<string, { label: string; variant: 'teal' | 'terracotta' | 'olive' | 'gray' }> = {
  keynote: { label: 'Keynote', variant: 'teal' },
  panel: { label: 'Panel Discussion', variant: 'terracotta' },
  lecture: { label: 'Lecture', variant: 'olive' },
  workshop: { label: 'Workshop', variant: 'gray' },
};

export default function SpeakingPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Speaking Engagements
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            I regularly speak at conferences, universities, and policy forums on topics 
            related to Turkey, the Middle East, and political risk.
          </p>
        </div>

        {/* Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-6">
            Speaking Topics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Turkey & Regional Politics', description: 'Turkish foreign policy, domestic politics, and regional influence' },
              { title: 'Energy & Geopolitics', description: 'Energy security, pipeline politics, and resource competition' },
              { title: 'Political Risk Analysis', description: 'Risk assessment frameworks and scenario planning' },
            ].map((topic) => (
              <div key={topic.title} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-charcoal mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Events List */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-6">
            Recent & Upcoming Events
          </h2>
          <div className="space-y-4">
            {speakingEvents.map((event) => (
              <div 
                key={event.id}
                className={`bg-white rounded-xl border p-6 ${
                  event.status === 'upcoming' ? 'border-teal' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={typeLabels[event.type].variant}>
                        {typeLabels[event.type].label}
                      </Badge>
                      {event.status === 'upcoming' && (
                        <Badge variant="teal">Upcoming</Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-charcoal mb-1">
                      {event.title}
                    </h3>
                    <p className="text-teal font-ui">{event.event}</p>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="font-ui text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-400 text-sm font-ui">{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">
                Invite Me to Speak
              </h2>
              <p className="text-gray-600">
                I&apos;m available for keynote speeches, panel discussions, workshops, 
                and academic lectures. Get in touch to discuss your event.
              </p>
            </div>
            <div className="lg:text-right">
              <Link href="/contact">
                <Button size="lg">
                  Submit Speaking Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
