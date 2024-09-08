import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 lg:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              className="h-14 sm:h-24 lg:h-32"
              src="logo.png"
              alt="Hirrd logo"
            />{" "}
          </span>{" "}
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          {/* add custom style to button component  */}
          <Button variant="blue" size="xl">
            Find Jobs{" "}
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 "
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              // number of elements per slide
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner  */}
      {/* <img src="/banner.png" alt="banner" className="w-full" /> */}
      <img src="/banner3.webp" alt="banner" className="w-full" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            {" "}
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      {/* accordion */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;

// blue: "bg-blue-500 hover:bg-blue-600",
//         xl: "h-14 sm:h-16 rounded-md px-14 text-lg sm:text-xl font-bold",

// tailwind to css
// flex flex-col
// display: flex;
// flex-direction: column;

// gap-10
// gap: 2.5rem;
// in tailwind by default 4 means 1 rem ie 16 px

// sm:gap-20 py-10
// @media (min-width: 640px) { gap: 5rem;padding-top: 2.5rem; padding-bottom: 2.5rem;}
// (small screens and up)
// sm: are applied when the viewport width is 640px or larger.

// lg:py-20
// @media (min-width: 1024px) { padding-top: 5rem; padding-bottom: 5rem; }
// (large screens and up)
// lg: are applied when the viewport width is 1024px or larger.

// text-4xl
// font-size: 2.25rem; line-height: 2.5rem;

// font-extrabold
// font-weight: 800

// h-14
// height: 3.5rem;

// text-gray-300
// color of the text.
// color: #D1D5DB;

// w - full;
// width: 100%;

// basis - 1 / 3;
// flex-basis: 33.333%;
// initial size of a flex item within a flex container.
// flex item take up one-third of the available space in the flex container before any remaining space is distributed.

// object - contain;
// object-fit: contain
// ensures that the content is scaled to fit within the container while maintaining its aspect ratio.

// grid grid-cols-1
// display: grid; //applies a grid layout to the container, enabling you to place child elements in a grid format.
// grid-template-columns: repeat(1, minmax(0, 1fr)); //grid to have a single column. The column will take up the full available width of the container, ensuring that all grid items are placed in one vertical column.
