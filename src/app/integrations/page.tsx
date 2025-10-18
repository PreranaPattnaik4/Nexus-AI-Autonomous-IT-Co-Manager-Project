'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialIntegrations = [
  { name: 'Jira', description: 'Task & ticket management', connected: true },
  { name: 'Slack', description: 'Communication bridge', connected: false },
  { name: 'Monitoring API', description: 'System metrics data source', connected: true },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const { toast } = useToast();

  const handleToggle = (integrationName: string) => {
    setIntegrations(prevIntegrations =>
      prevIntegrations.map(integration => {
        if (integration.name === integrationName) {
          const newState = !integration.connected;
          toast({
            title: `Integration ${newState ? 'Connected' : 'Disconnected'}`,
            description: `${integration.name} has been successfully ${newState ? 'connected' : 'disconnected'}.`,
          });
          return { ...integration, connected: newState };
        }
        return integration;
      })
    );
  };

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
                {integration.connected ? 'Connected' : 'Disconnected'}
              </span>
              <Switch
                checked={integration.connected}
                onCheckedChange={() => handleToggle(integration.name)}
                aria-label={`Toggle ${integration.name} integration`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggle(integration.name)}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
