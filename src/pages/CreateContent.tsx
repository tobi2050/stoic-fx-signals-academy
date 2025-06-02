
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

export default function CreateContent() {
  const [contentType, setContentType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');

  const handleGenerateIdeas = () => {
    // AI content generation placeholder
    setDescription('Detailed description of your content...');
  };

  const handleCreateContent = () => {
    console.log('Creating content:', { contentType, title, description, imageUrl, duration, cost });
  };

  return (
    <MainLayout title="Create Content">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Advanced Scalping Masterclass"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of your content..."
                rows={4}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-green-600 border-green-200"
                onClick={handleGenerateIdeas}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content Ideas
              </Button>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Optional)
              </label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g., https://placeholder.co/300x200"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (e.g., 4 weeks, 3h 30m)
              </label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 4 weeks"
              />
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost ($) (Leave 0 for Free)
              </label>
              <Input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="e.g., 99"
              />
            </div>

            {/* Create Button */}
            <Button
              onClick={handleCreateContent}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!contentType || !title}
            >
              Create Content
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
