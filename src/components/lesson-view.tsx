// src/components/lesson-view.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, FileText, Play } from 'lucide-react';

interface LessonViewProps {
  lesson: {
    title: string;
    type: string;
    content: {
      videoUrl: string;
      description: string;
    };
    resources: {
      title: string;
      type: string;
      url: string;
    }[];
    estimatedTime: string;
    difficulty: string;
    skills: string[];
  };
  onComplete: () => void;
  isCompleted: boolean;
}

export function LessonView({ lesson, onComplete, isCompleted }: LessonViewProps) {
  const [showResources, setShowResources] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">{lesson.difficulty}</Badge>
          <span className="text-sm text-gray-500">{lesson.estimatedTime}</span>
        </div>
      </div>

      {lesson.type === 'video' && (
        <div className="mb-8 aspect-video">
          <iframe
            src={lesson.content.videoUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <Card className="mb-8">
        <div className="p-6">
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content.description }}
          />
        </div>
      </Card>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills Covered</h3>
          <div className="flex flex-wrap gap-2">
            {lesson.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={() => setShowResources(!showResources)}
            className="mb-4"
          >
            {showResources ? 'Hide Resources' : 'Show Resources'}
          </Button>

          {showResources && (
            <div className="space-y-3">
              {lesson.resources.map((resource, index) => (
                <Card key={index}>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {resource.type === 'pdf' ? (
                        <FileText className="w-5 h-5 text-red-500" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-500" />
                      )}
                      <span>{resource.title}</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t">
          <Button
            onClick={onComplete}
            disabled={isCompleted}
            className="w-full"
          >
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </Button>
        </div>
      </div>
    </div>
  );
}