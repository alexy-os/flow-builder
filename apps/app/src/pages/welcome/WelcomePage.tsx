import { ArrowRight, Box, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeatureCard } from './components/FeatureCard';

export function WelcomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/50 p-6">
      <div className="max-w-3xl text-center space-y-8">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Welcome to Flow Builder
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-muted-foreground">
          Create amazing workflows with our intuitive builder
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <FeatureCard
            icon={<Box className="w-6 h-6" />}
            title="SimplY"
            description="Simple and understandable interface"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="FastY"
            description="Create processes in minutes"
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6" />}
            title="SafetY"
            description="Customize every element to your needs"
          />
        </div>

        {/* Action Button */}
        <Link
          to="/flow"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors group"
        >
          Start Building
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
} 