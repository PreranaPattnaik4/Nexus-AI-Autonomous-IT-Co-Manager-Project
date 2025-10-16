'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';

const integrations = [
  { name: 'Jira', description: 'Task & ticket management', connected: true },
  { name: 'Slack', description: 'Communication bridge', connected: false },
  { name: 'Monitoring API', description: 'System metrics data source', connected: true },
];

export default function IntegrationsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          <CardTitle>Integrations</CardTitle>
        </div>
        <CardDescription>
          Connect and manage third-party tools and services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
            <div>
              <p className="font-semibold">{integration.name}</p>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold ${integration.connected ? 'text-green-400' : 'text-yellow-400'}`}>
                {integration.connected ? 'Connected' : 'Pending'}
              </span>
              <Switch checked={integration.connected} />
              <Button variant="outline" size="sm">
                {integration.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
