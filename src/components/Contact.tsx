import { Card, CardContent } from '@/components/ui/card';
import { useContent } from '@/context/ContentContext';
import { Icon } from '@/lib/icons';

const Contact = () => {
  const { content } = useContent();
  const { contact } = content;
  const meta = content.sections.contact;

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in text-center">
          <h2 className="text-4xl font-bold tracking-tight">{meta.title}</h2>
          <div className="accent-rule mx-auto mt-4 w-24"></div>
          {meta.subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{meta.subtitle}</p>
          )}
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-transparent glass">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-semibold">{contact.infoTitle}</h3>
                <div className="space-y-4">
                  {contact.info.map((info) => (
                    <div key={info.id} className="flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl chip">
                        <Icon name={info.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        {info.link ? (
                          <a href={info.link} className="text-muted-foreground smooth-transition hover:text-primary">
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

            <Card className="border-0 bg-transparent glass">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-semibold">{contact.socialTitle}</h3>
                <div className="space-y-3">
                  {contact.socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center rounded-xl border border-border p-3 smooth-transition hover:border-primary/50 hover:bg-primary/5"
                    >
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl chip smooth-transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon name={social.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium smooth-transition group-hover:text-primary">{social.label}</p>
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
