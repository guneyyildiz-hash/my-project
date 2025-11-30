import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'About | Guney Yildiz',
  description: 'Learn more about Guney Yildiz - journalist, political risk consultant, and PhD candidate at Cambridge University.',
};

const timeline = [
  {
    year: '2020 - Present',
    title: 'PhD Candidate',
    organization: 'University of Cambridge',
    description: 'Researching political risk and regional conflict dynamics in the Middle East.',
  },
  {
    year: '2018 - Present',
    title: 'Contributing Writer',
    organization: 'Forbes',
    description: 'Regular analysis on Turkey, energy politics, and regional affairs.',
  },
  {
    year: '2016 - 2020',
    title: 'Political Risk Analyst',
    organization: 'Independent Consultant',
    description: 'Strategic advisory for governments and corporations on Middle East risks.',
  },
  {
    year: '2014 - 2018',
    title: 'Researcher',
    organization: 'European Council on Foreign Relations',
    description: 'Research on Turkey, Kurdish politics, and EU-Turkey relations.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Photo */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] rounded-2xl bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-4xl font-heading font-bold text-gray-400">GY</span>
                </div>
                <p className="text-gray-500 font-ui text-sm">Photo placeholder</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
              About Me
            </h1>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                I&apos;m a journalist and political risk consultant specializing in Turkey, the Middle East, 
                and Gulf politics. Currently pursuing a PhD at the University of Cambridge, my research 
                focuses on understanding regional conflict dynamics and political risk assessment.
              </p>
              <p>
                My work has been published in Forbes, BBC, and leading think tanks including the 
                European Council on Foreign Relations (ECFR), Stiftung Wissenschaft und Politik (SWP), 
                and the Middle East Institute (MEI).
              </p>
              <p>
                With over a decade of experience covering the region, I provide analysis and commentary 
                on Turkish domestic politics, Kurdish issues, energy security, and broader geopolitical 
                trends affecting the Middle East and beyond.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact">
                <Button>Get in Touch</Button>
              </Link>
              <a href="/files/cv.pdf" download>
                <Button variant="outline">Download CV</Button>
              </a>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-8">
            Career Timeline
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-teal font-ui font-medium">{item.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-3 h-3 bg-teal rounded-full" />
                  {index < timeline.length - 1 && (
                    <div className="absolute left-1/2 top-3 w-px h-full bg-gray-200 -translate-x-1/2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading font-semibold text-charcoal">{item.title}</h3>
                  <p className="text-teal font-ui text-sm mb-2">{item.organization}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-8">
            Featured In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Forbes', 'BBC', 'ECFR', 'SWP Berlin', 'MEI', 'Chatham House', 'Al Jazeera', 'DW'].map((pub) => (
              <div 
                key={pub}
                className="flex items-center justify-center h-20 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="font-heading font-semibold text-gray-400">{pub}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
