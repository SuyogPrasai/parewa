import Link from 'next/link';
import { defineQuery } from 'next-sanity'

import { sanityFetch } from '@/sanity/live';
import { SocialInt } from '@/types/social';

import { Social } from '../misc/Social';
import FooterNewsletter from './FooterNewsletter';

const FOOTER_QUERY = defineQuery(`
  *[_type == "general"][0]{
    footerText,
    footerCategories[]->{
      "slug": slug.current,
      title
    },
    footerSocials[]->{
      "icon": icon.name,
      label,
      platform,
      url
    },
    links[]->{
      label,
      openInNewTab,
      url
    },
    privacy,
    logoText
  }
`)

async function Footer() {

  const { data: footer } = await sanityFetch({ query: FOOTER_QUERY });

  const socials = (footer?.footerSocials ?? []).filter(
    (s): s is SocialInt =>
      !!s.icon && !!s.label && !!s.platform && !!s.url
  );

  return (
    <footer className='p-5 relative bg-secondary-foreground text-primary-foreground mt-5 pt-20'>
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row justify-start gap-10 md:gap-20 border-b border-muted-foreground/40 py-5">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-4 font-oswald text-primary-foreground text-center md:text-left font-heading">PAREWA</h2>
            <p className="text-sm text-primary-foreground mb-6 font-roboto mx-auto md:mx-0 max-w-xs text-center md:text-left ">
              {footer?.footerText}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socials.map((social: SocialInt) => (
                <Social key={social.platform} label={social.label} icon={social.icon} url={social.url} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold mb-3 text-primary-foreground text-center md:text-left">Categories</h3>
            {footer?.footerCategories?.map((category) => (
              <div key={category.title} className="mb-2 text-center md:text-start">
                <Link href={`/articles?category=${category.slug}`} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200 space-y-2 text-sm text-center md:text-left">
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold mb-3 text-primary-foreground text-center md:text-left">Links</h3>
            {footer?.links?.map((link) => (
              <div key={link.label} className="mb-2 text-center md:text-start">
                <Link href={link.url ?? ""} target={link.openInNewTab ? '_blank' : '_self'} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200 space-y-2 text-sm text-center md:text-left">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <FooterNewsletter privacyPolicyLink={footer?.privacy ?? ""} />
        <div className="mt-10 border-t border-muted-foreground/40 pt-6 text-center text-muted-foreground text-xs">
          <p>PAREWA © {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer