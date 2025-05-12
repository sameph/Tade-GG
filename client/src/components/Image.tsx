import { Image } from '@imagekit/react';

export default function IKmage({src, className, w, h, alt}) {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      width={w}
      height={h}
      alt={alt}
    />
  )
}