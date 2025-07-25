import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Database, Wrench, Cpu } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "C++", level: 90 },
        { name: "Java (OOP)", level: 85 },
        { name: "Python", level: 88 },
        { name: "C#", level: 80 },
        { name: "C", level: 85 },
        { name: "Embedded C", level: 75 }
      ]
    },
    {
      title: "Web Technologies",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "React.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: ".NET", level: 85 },
        { name: "JavaScript", level: 88 },
        { name: "HTML/CSS", level: 90 }
      ]
    },
    {
      title: "Database & Tools",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "SQL", level: 85 },
        { name: "MS SQL Server", level: 80 },
        { name: "Git/GitHub", level: 90 },
        { name: "Visual Studio", level: 85 }
      ]
    },
    {
      title: "Core Competencies",
      icon: <Cpu className="h-6 w-6" />,
      skills: [
        { name: "Data Structures", level: 90 },
        { name: "Algorithms", level: 88 },
        { name: "OOP", level: 90 },
        { name: "Debugging", level: 85 },
        { name: "Unit Testing", level: 75 }
      ]
    }
  ];

  const certifications = [
    "Competitive Programming - LeetCode",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Full-Stack Development",
    "IoT & Embedded Systems",
    "Database Management"
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit spanning from low-level embedded programming to modern web development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="card-shadow hover:shadow-lg smooth-transition animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                    <div className="text-primary-foreground">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications & Expertise */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow animate-fade-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Wrench className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">Areas of Expertise</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((cert, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary p-3 text-center justify-center hover:bg-primary hover:text-primary-foreground smooth-transition"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-3 text-center">Competitive Programming</h4>
                <p className="text-center text-muted-foreground">
                  Active problem solver on <strong>LeetCode</strong> with consistent practice in algorithmic challenges. 
                  Strong foundation in competitive programming enhances my ability to write efficient, 
                  optimized code for real-world applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;