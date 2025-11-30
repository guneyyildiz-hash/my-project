import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

const stats = [
  { label: 'Total Articles', value: '42', change: '+3 this month', href: '/admin/articles' },
  { label: 'Total Videos', value: '18', change: '+2 this month', href: '/admin/videos' },
  { label: 'Forbes Articles', value: '24', change: null, href: '/admin/articles?publication=forbes' },
  { label: 'BBC Articles', value: '8', change: null, href: '/admin/articles?publication=bbc' },
];

const recentActivity = [
  { type: 'article', action: 'Published', title: 'Turkey\'s Energy Crisis', time: '2 hours ago' },
  { type: 'video', action: 'Added', title: 'Middle East Panel Discussion', time: '1 day ago' },
  { type: 'article', action: 'Updated', title: 'Gulf States Diplomacy', time: '2 days ago' },
  { type: 'article', action: 'Published', title: 'Syria Reconstruction', time: '3 days ago' },
];

export const metadata = {
  title: 'Dashboard | Admin',
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal">Dashboard</h1>
          <p className="text-gray-600 font-ui">Welcome back! Here&apos;s an overview of your content.</p>
        </div>
        <Link href="/admin/add-content">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Content
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card hover className="h-full">
              <CardContent>
                <p className="text-sm font-ui text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-charcoal">{stat.value}</p>
                {stat.change && (
                  <p className="text-sm text-teal font-ui mt-1">{stat.change}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/add-content" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-teal/5 hover:bg-teal/10 transition-colors text-left">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-ui font-medium text-charcoal">Add Article</p>
                    <p className="text-xs text-gray-500">Paste URL to auto-import</p>
                  </div>
                </button>
              </Link>
              <Link href="/admin/add-content?type=video" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-terracotta/5 hover:bg-terracotta/10 transition-colors text-left">
                  <span className="text-xl">🎥</span>
                  <div>
                    <p className="font-ui font-medium text-charcoal">Add Video</p>
                    <p className="text-xs text-gray-500">Import from YouTube</p>
                  </div>
                </button>
              </Link>
              <Link href="/" target="_blank" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                  <span className="text-xl">👁️</span>
                  <div>
                    <p className="font-ui font-medium text-charcoal">View Site</p>
                    <p className="text-xs text-gray-500">Open in new tab</p>
                  </div>
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-xl">
                    {activity.type === 'article' ? '📄' : '🎥'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-charcoal truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-ui">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Status */}
      <Card>
        <CardHeader>
          <CardTitle>Content by Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Forbes', 'BBC', 'SWP Berlin', 'ECFR', 'MEI', 'Other'].map((pub) => (
              <div key={pub} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-heading font-bold text-charcoal">
                  {pub === 'Forbes' ? '24' : pub === 'BBC' ? '8' : Math.floor(Math.random() * 10)}
                </p>
                <p className="text-sm text-gray-500 font-ui">{pub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
