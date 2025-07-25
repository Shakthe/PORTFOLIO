import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Award, Calendar, Users } from 'lucide-react';

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  const mainProjects = [
    {
      title: "FlexiFlow",
      subtitle: "Web-Based Leave and Work From Home Request Management Tool",
      period: "May 2025 - July 2025",
      description: "Built a comprehensive web-based request management platform using .NET and MS SQL Server, enabling streamlined approvals for 50+ employees.",
      achievements: [
        "Developed department-level filtering and role-based access control",
        "Implemented real-time status tracking for enhanced transparency",
        "Created intuitive UI/UX for easy deployment and maintenance",
        "Ensured robust back-end data handling with secure CRUD operations"
      ],
      technologies: [".NET", "MS SQL Server", "HTML/CSS", "JavaScript", "CRUD Operations"],
      type: "Web Development",
      icon: "💼",
      stats: { users: "50+", efficiency: "30%" }
    },
    {
      title: "TragerX",
      subtitle: "Autonomous Smart Trolley System using ROS",
      period: "May 2023 - Jan 2025",
      description: "Engineered a smart autonomous trolley using Raspberry Pi, DC motors, ultrasonic and infrared sensors, and ROS for real-time human-following capability.",
      achievements: [
        "🥇 1st Place at CEG ITRIX'25",
        "🥈 2nd Place at IIITDM Kancheepuram IoT Hackathon",
        "Implemented path-finding algorithms for optimized navigation",
        "Achieved 40% better maneuverability and 20% lower power consumption"
      ],
      technologies: ["ROS", "Raspberry Pi", "Python", "C++", "Embedded C", "IoT Sensors"],
      type: "Hardware / IoT",
      icon: "🤖",
      stats: { awards: "2", improvement: "40%" }
    }
  ];

  const additionalProjects = [
    {
      title: "Decimal to IEEE 754 Converter",
      description: "A Python script to convert decimal values into IEEE 754 binary format with high precision.",
      technologies: ["Python", "Binary Conversion", "IEEE 754"],
      type: "Utility Tool"
    },
    {
      title: "Sports Image Detection",
      description: "Used machine learning algorithms to classify and detect different sports from images.",
      technologies: ["Python", "Machine Learning", "Computer Vision", "TensorFlow"],
      type: "Machine Learning"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Showcasing my journey from IoT hardware innovation to full-stack web development
          </p>
        </div>

        {/* Main Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {mainProjects.map((project, index) => (
            <Card 
              key={index} 
              className="card-shadow hover:shadow-lg smooth-transition animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{project.icon}</div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary smooth-transition">
                        {project.title}
                      </CardTitle>
                      <p className="text-primary font-medium">{project.subtitle}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {project.type}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {project.period}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{project.description}</p>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Projects */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowMore(!showMore)}
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground smooth-transition"
          >
            {showMore ? 'Show Less' : 'Show More Projects'}
          </Button>
        </div>

        {showMore && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {additionalProjects.map((project, index) => (
              <Card 
                key={index} 
                className="card-shadow hover:shadow-lg smooth-transition"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                      {project.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;