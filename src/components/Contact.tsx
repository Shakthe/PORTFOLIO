import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "shakthevell.m@gmail.com",
      link: "mailto:shakthevell.m@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91-7338917196",
      link: "tel:+917338917196"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Chennai, India",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      username: "@Shakthe",
      link: "https://github.com/Shakthe"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      username: "shakthevell-m",
      link: "https://www.linkedin.com/in/shakthevell-m-39301329a/"
    },
    {
      icon: <ExternalLink className="h-5 w-5" />,
      label: "LeetCode",
      username: "@shakthe",
      link: "https://leetcode.com/u/shakthe/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <Card className="card-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <div className="text-primary">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="text-muted-foreground hover:text-primary smooth-transition"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="card-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/50 smooth-transition group"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary smooth-transition">{social.label}</p>
                        <p className="text-sm text-muted-foreground">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;