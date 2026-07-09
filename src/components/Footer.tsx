import { Link } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import { Icon } from '@/lib/icons';

const Footer = () => {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/60 py-10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">{content.hero.name} M</p>
            <p className="text-sm text-muted-foreground">{content.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-2">
            {content.contact.socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground smooth-transition hover:border-primary/50 hover:text-primary"
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {content.hero.name} M. All rights reserved.
            {/* Hidden admin entry — near-invisible, unlabeled. */}
            <Link
              to="/admin"
              aria-hidden="true"
              tabIndex={-1}
              className="ml-1 select-none text-[9px] leading-none text-white/[0.03] transition-colors hover:text-white/20"
            >
              .
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
