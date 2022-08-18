import {useEffect, useRef} from 'react';
import {Image, Link, Video} from '@shopify/hydrogen';

import {Heading, Text} from '~/components';

import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}) {
  const textRef = useRef(null);

  useEffect(() => {
    console.log('gsap is running now!');
    gsap.registerPlugin(ScrollTrigger);
    // const tl = gsap.timeline();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#intro',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: true,
      },
    });
    tl.to('#heroText', {
      y: '-=100',
    });
  }, []);

  return (
    <div id="intro">
      <Link to={`/collections/${handle}`}>
        <section
          className={`relative justify-end flex flex-col w-full ${
            top && '-mt-nav'
          } ${
            height === 'full'
              ? 'h-screen'
              : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]'
          }`}
        >
          <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
            {spread?.reference && (
              <div className="">
                <SpreadMedia
                  scale={2}
                  sizes={
                    spreadSecondary?.reference
                      ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                      : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
                  }
                  widths={
                    spreadSecondary?.reference
                      ? [500, 450, 700]
                      : [500, 900, 1400]
                  }
                  width={spreadSecondary?.reference ? 375 : 750}
                  data={spread.reference}
                  loading={loading}
                />
              </div>
            )}
            {spreadSecondary?.reference && (
              <div className="hidden md:block">
                <SpreadMedia
                  sizes="(min-width: 80em) 700, (min-width: 48em) 450, 500"
                  widths={[450, 700]}
                  width={375}
                  data={spreadSecondary.reference}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
            <div id="heroText" ref={textRef}>
              {heading?.value && (
                <Heading format as="h2" size="display" className="max-w-md">
                  {heading.value}
                </Heading>
              )}
              {byline?.value && (
                <Text format width="narrow" as="p" size="lead">
                  {byline.value}
                </Text>
              )}
              {cta?.value && <Text size="lead">{cta.value}</Text>}
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}

function SpreadMedia({data, loading, scale, sizes, width, widths}) {
  if (data.mediaContentType === 'VIDEO') {
    return (
      <Video
        previewImageOptions={{scale, src: data.previewImage.url}}
        width={scale * width}
        className="block object-cover w-full h-full"
        data={data}
        controls={false}
        muted
        loop
        playsInline
        autoPlay
      />
    );
  }

  if (data.mediaContentType === 'IMAGE') {
    return (
      <Image
        widths={widths}
        sizes={sizes}
        alt={data.alt || 'Marketing Banner Image'}
        className="block object-cover w-full h-full"
        // @ts-ignore
        data={data.image}
        loading={loading}
        width={width}
        loaderOptions={{scale, crop: 'center'}}
      />
    );
  }

  return null;
}
