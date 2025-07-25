import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Code, Cpu } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "B.Tech Computer Science (IoT)",
      subtitle: "Shiv Nadar University, Chennai",
      description: "8.1 GPA • Graduating May 2027",
      highlight: true
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "1st Place - CEG ITRIX'25",
      subtitle: "TragerX Project",
      description: "Autonomous smart trolley system"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "2nd Place - IIITDM Kancheepuram",
      subtitle: "IoT Hackathon",
      description: "Hardware innovation competition"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Active Competitive Programmer",
      subtitle: "LeetCode Platform",
      description: "Strong foundation in DSA"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Motivated Computer Science undergraduate with a strong foundation in Data Structures, Algorithms, 
            Object-Oriented Programming, and Full-Stack Development. Skilled in designing scalable, reliable 
            software solutions and passionate about IoT innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className={`card-shadow hover:shadow-lg smooth-transition hover:scale-105 animate-fade-in ${
                achievement.highlight ? 'border-primary/50 bg-primary/5' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  achievement.highlight ? 'bg-gradient-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                <p className="text-primary font-medium mb-2">{achievement.subtitle}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                I'm passionate about building intelligent hardware and scalable software solutions using 
                modern technologies like C++, Java, Python, .NET, React.js, and Node.js.
              </p>
              <p className="text-muted-foreground">
                My experience spans from embedded systems and IoT development to full-stack web applications. 
                I enjoy solving complex problems and have proven my ability to deliver high-impact projects 
                in collaborative, fast-paced environments.
              </p>
              <p className="text-muted-foreground">
                As an active competitive programmer on LeetCode, I continuously sharpen my algorithmic 
                thinking and problem-solving skills, which I apply to real-world development challenges.
              </p>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <Card className="card-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Cpu className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Core Interests</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Internet of Things (IoT) Development
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Full-Stack Web Development
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Embedded Systems & Hardware
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Competitive Programming
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Machine Learning Applications
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;