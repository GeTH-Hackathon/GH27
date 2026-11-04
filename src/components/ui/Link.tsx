import type {AnchorHTMLAttributes} from 'react';
import {url} from '@site/src/lib/url';

// An internal link: `to` is a site path, prefixed with the base url.
export default function Link({to, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement> & {to: string}) {
  return <a href={url(to)} {...rest} />;
}
