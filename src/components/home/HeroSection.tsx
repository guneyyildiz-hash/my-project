import Link from 'next/link';
import { Button } from '@/components/ui';
import Container from '@/components/layout/Container';

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <p className="text-teal font-ui font-medium mb-4">
              Journalist · Political Risk Consultant · PhD Candidate
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-navy leading-tight mb-6">
              Guney Yildiz
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Covering Turkey, the Middle East, and Gulf politics. Contributing to Forbes, BBC, 
              and leading think tanks. Currently pursuing a PhD at Cambridge University.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/work/articles">
                <Button size="lg">
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal/10 to-terracotta/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-6xl font-heading font-bold text-gray-400">GY</span>
                </div>
                <p className="text-gray-500 font-ui text-sm">Photo placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
