import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow hover:shadow-lg smooth-transition animate-fade-in">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Software Development Intern
                      </h3>
                      <p className="text-xl text-primary font-semibold mb-2">
                        Saipem Private Limited
                      </p>
                    </div>
                    <div className="flex flex-col lg:items-end text-muted-foreground">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        May 2025 – July 2025
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Chennai, On-Site
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Developed an internal tool using <strong>.NET and MS SQL Server</strong> that improved 
                          workflow efficiency by <strong>30%</strong> through real-time deployment.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Designed and implemented responsive front-end interfaces with <strong>HTML, CSS, and JavaScript</strong>, 
                          enhancing usability across devices.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Integrated secure <strong>CRUD operations</strong> for dynamic data flow, supporting 
                          multi-user interactions with role-based access.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Coordinated with cross-functional teams to deliver <strong>bug-free, production-ready software</strong> on schedule.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['.NET', 'MS SQL Server', 'HTML/CSS', 'JavaScript', 'CRUD Operations', 'Responsive Design'].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Achievements */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center card-shadow hover:shadow-lg smooth-transition animate-fade-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                <p className="text-sm text-muted-foreground">Workflow Efficiency Improvement</p>
              </CardContent>
            </Card>
            <Card className="text-center card-shadow hover:shadow-lg smooth-transition animate-fade-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Employees Supported</p>
              </CardContent>
            </Card>
            <Card className="text-center card-shadow hover:shadow-lg smooth-transition animate-fade-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">On-Schedule Delivery</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;