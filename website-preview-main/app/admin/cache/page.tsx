'use client';

import { useState, useEffect } from 'react';
import { useCacheManager, useCacheMonitor } from '@/lib/hooks/use-cache-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Target,
  BarChart3,
  Settings,
  Shield,
  Trash2,
  Play,
  Pause,
  TrendingUp
} from 'lucide-react';

export default function CacheAdminPage() {
  const {
    stats,
    operations,
    isLoading,
    error,
    revalidatePath,
    revalidateTag,
    revalidateAll,
    selectiveRevalidate,
    refreshStats,
    clearOperations,
    getAvailableTags,
    getAvailablePaths,
    testWebhook
  } = useCacheManager();

  const {
    isMonitoring,
    monitoringData,
    startMonitoring,
    stopMonitoring,
    clearMonitoringData
  } = useCacheMonitor();

  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [customPath, setCustomPath] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const availableTags = getAvailableTags();
  const availablePaths = getAvailablePaths();

  // Handle authentication check
  useEffect(() => {
    // Check if admin token is configured
    if (!process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
      console.warn('Admin token not configured');
    }
  }, []);

  const handleQuickAction = async (action: string) => {
    try {
      switch (action) {
        case 'revalidate-all':
          await revalidateAll({ warmAfter: true });
          break;
        case 'revalidate-workshops':
          await revalidateTag('workshops', { cascade: true, warmAfter: true });
          break;
        case 'revalidate-homepage':
          await revalidatePath('/', { warmAfter: true });
          break;
        case 'refresh-stats':
          await refreshStats();
          break;
      }
    } catch (error) {
      console.error('Quick action failed:', error);
    }
  };

  const handleCustomRevalidation = async () => {
    if (selectedTargets.length === 0 && !customPath && !customTag) return;
    
    try {
      const targets = [...selectedTargets];
      if (customPath) targets.push(customPath);
      if (customTag) targets.push(customTag);
      
      await selectiveRevalidate(targets, { cascade: true, warmAfter: true });
      
      // Clear inputs
      setSelectedTargets([]);
      setCustomPath('');
      setCustomTag('');
    } catch (error) {
      console.error('Custom revalidation failed:', error);
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      loading: 'bg-blue-100 text-blue-800 border-blue-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      error: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const icons: Record<string, any> = {
      pending: Clock,
      loading: RefreshCw,
      success: CheckCircle,
      error: XCircle
    };
    
    const Icon = icons[status] || Clock;
    
    return (
      <Badge className={variants[status] || variants.pending}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cache Management</h1>
            <p className="text-gray-600 mt-1">
              Monitor and control intelligent cache revalidation system
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={refreshStats}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {isMonitoring ? (
              <Button
                variant="outline"
                onClick={stopMonitoring}
                className="flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Stop Monitoring
              </Button>
            ) : (
              <Button
                onClick={startMonitoring}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Monitoring
              </Button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="monitoring">Real-time</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Operations</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalOperations || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Since system start
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.successRate || 0}%</div>
                  <p className="text-xs text-muted-foreground">
                    Last 100 operations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.averageProcessingTime ? formatDuration(stats.averageProcessingTime) : '0ms'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Processing time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Queue Status</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.queueStatus?.pending || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pending operations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common cache operations for immediate execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickAction('revalidate-all')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <RefreshCw className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">Revalidate All</div>
                      <div className="text-xs text-muted-foreground">Full cache refresh</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleQuickAction('revalidate-workshops')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Target className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">Workshops</div>
                      <div className="text-xs text-muted-foreground">Workshop data only</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleQuickAction('revalidate-homepage')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Activity className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">Homepage</div>
                      <div className="text-xs text-muted-foreground">Main page only</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleQuickAction('refresh-stats')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <BarChart3 className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">Refresh Stats</div>
                      <div className="text-xs text-muted-foreground">Update metrics</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest cache revalidation operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivity?.slice(0, 5).map((activity, index) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{activity.type}</Badge>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(activity.result)}
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(activity.processingTime)}
                        </span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-muted-foreground py-8">
                      No recent activity
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            {/* Custom Revalidation */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Revalidation</CardTitle>
                <CardDescription>
                  Execute targeted cache invalidation with advanced options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Available Tags */}
                <div>
                  <div className="text-sm font-medium mb-2 block">Available Cache Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTargets.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedTargets(prev => 
                            prev.includes(tag) 
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Available Paths */}
                <div>
                  <div className="text-sm font-medium mb-2 block">Available Paths</div>
                  <div className="flex flex-wrap gap-2">
                    {availablePaths.map(path => (
                      <Button
                        key={path}
                        variant={selectedTargets.includes(path) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedTargets(prev => 
                            prev.includes(path) 
                              ? prev.filter(t => t !== path)
                              : [...prev, path]
                          );
                        }}
                      >
                        {path}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="custom-path" className="text-sm font-medium mb-2 block">Custom Path</label>
                    <input
                      id="custom-path"
                      type="text"
                      value={customPath}
                      onChange={(e) => setCustomPath(e.target.value)}
                      placeholder="/custom/path"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="custom-tag" className="text-sm font-medium mb-2 block">Custom Tag</label>
                    <input
                      id="custom-tag"
                      type="text"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      placeholder="custom-tag"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* Selected Targets */}
                {selectedTargets.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2 block">Selected Targets</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTargets.map(target => (
                        <Badge key={target} variant="secondary" className="flex items-center gap-1">
                          {target}
                          <button
                            onClick={() => setSelectedTargets(prev => prev.filter(t => t !== target))}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Execute Button */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleCustomRevalidation}
                    disabled={selectedTargets.length === 0 && !customPath && !customTag}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Execute Revalidation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTargets([]);
                      setCustomPath('');
                      setCustomTag('');
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Operations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Operations</CardTitle>
                  <CardDescription>
                    Track your manual revalidation operations
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearOperations}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {operations.length > 0 ? operations.map(operation => (
                    <div key={operation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{operation.type}</Badge>
                        <div>
                          <div className="font-medium">
                            {operation.targets?.join(', ') || 'All cache'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(operation.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(operation.status)}
                        {operation.processingTime && (
                          <span className="text-sm text-muted-foreground">
                            {formatDuration(operation.processingTime)}
                          </span>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-muted-foreground py-8">
                      No operations executed yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>
                  Comprehensive logging of all revalidation activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivity?.map((log) => (
                    <div key={log.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{log.type}</Badge>
                          <Badge variant="secondary">{log.source}</Badge>
                          {getStatusBadge(log.result)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{log.action}</div>
                        {log.targets.length > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Targets: {log.targets.join(', ')}
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Processing time: {formatDuration(log.processingTime)}
                        </div>
                        {log.error && (
                          <div className="text-sm text-red-600">
                            Error: {log.error}
                          </div>
                        )}
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-muted-foreground py-8">
                      No activity logs available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-time Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Real-time Monitoring</CardTitle>
                  <CardDescription>
                    Live cache performance metrics and activity
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isMonitoring ? "default" : "secondary"}>
                    {isMonitoring ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearMonitoringData}
                    disabled={monitoringData.length === 0}
                  >
                    Clear Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isMonitoring ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Monitoring active - collecting data every 10 seconds
                    </div>
                    
                    {monitoringData.length > 0 && (
                      <div className="space-y-3">
                        {monitoringData.slice(0, 10).map((data, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">
                                {new Date(data.timestamp).toLocaleTimeString()}
                              </span>
                              <div className="flex items-center gap-4 text-sm">
                                <span>Operations: {data.stats.totalOperations}</span>
                                <span>Success: {data.stats.successRate}%</span>
                                <span>Queue: {data.stats.queueStatus.pending}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Monitoring is not active. Click "Start Monitoring" to begin collecting real-time data.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Current system settings and environment status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Environment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Node Environment:</span>
                        <Badge variant="outline">{process.env.NODE_ENV || 'unknown'}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Revalidation Token:</span>
                        <Badge variant={process.env.NEXT_PUBLIC_REVALIDATE_TOKEN ? "default" : "destructive"}>
                          {process.env.NEXT_PUBLIC_REVALIDATE_TOKEN ? "Configured" : "Missing"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Features</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cascade Revalidation:</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Batch Processing:</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Cache Warming:</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Real-time Monitoring:</span>
                        <Badge variant="default">Available</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Rate Limits
                </CardTitle>
                <CardDescription>
                  Current security configuration and rate limiting status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Manual Requests</h4>
                    <div className="text-2xl font-bold">20</div>
                    <div className="text-sm text-muted-foreground">requests per minute</div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Webhook Requests</h4>
                    <div className="text-2xl font-bold">100</div>
                    <div className="text-sm text-muted-foreground">requests per minute</div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Admin Requests</h4>
                    <div className="text-2xl font-bold">50</div>
                    <div className="text-sm text-muted-foreground">requests per minute</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}