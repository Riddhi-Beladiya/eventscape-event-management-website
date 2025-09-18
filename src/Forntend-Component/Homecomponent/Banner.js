"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Benner.css";
import { Pagination } from "swiper";

const Benner = () => {
  return (
    <main>
      <div className="">
        <span>GULFPORT, FL</span>
        <h1>Salty Pelican Boat Tours</h1>
        <p>
          Beauty and mystery are hidden in the beautiful waters that surround
          the St. Petersburg and Tampa regions. Explore, learn, and let yourself
          go with daily departures & private charters upon request.
        </p>
        <button>CHECK AVAILABILITY</button>
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        keyboard={{ enabled: true }}
        mousewheel={{ thresholdDelta: 70 }}
        loop={true}
      >
        <SwiperSlide className="swiper-slide swiper-slide--one">
          <div>
            <h2>Jellyfish</h2>
            <p>
              Jellyfish and sea jellies are the informal common names given to
              the medusa-phase of certain gelatinous members of the subphylum
              Medusozoa, a major part of the phylum Cnidaria.
            </p>
            <a href="https://en.wikipedia.org/wiki/Jellyfish" target="_blank">
              explore
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide swiper-slide--two">
          <div>
            <h2>Seahorse</h2>
            <p>
              Experience the magic of a Florida sunset like never before on our
              daily Sunset Cruise. Departing from St. Petersburg, this 90-minute
              excursion offers the perfect vantage point to witness the
              breathtaking hues of the setting sun reflecting off the tranquil
              waters.
            </p>
            <a
              href="https://cdn.prod.website-files.com/67646bc27cd171f4f4446754/67648015fb1098364eaba017_dolpins-950x650-salty-pelican-banners-021.jpg"
              target="_blank"
            >
              explore
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide swiper-slide--three">
          <div>
            <h2>Octopus</h2>
            <p>
              Octopuses inhabit various regions of the ocean, including coral
              reefs, pelagic waters, and the seabed; some live in the intertidal
              zone and others at abyssal depths. Most species grow quickly,
              mature early, and are short-lived.
            </p>
            <a href="https://en.wikipedia.org/wiki/Octopus" target="_blank">
              explore
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide swiper-slide--four">
          <div>
            <h2>Shark</h2>
            <p>
              Sharks are a group of elasmobranch fish characterized by a
              cartilaginous skeleton, five to seven gill slits on the sides of
              the head, and pectoral fins that are not fused to the head.
            </p>
            <a href="https://en.wikipedia.org/wiki/Shark" target="_blank">
              explore
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide swiper-slide--five">
          <div>
            <h2>Dolphin</h2>
            <p>
              Dolphins are widespread. Most species prefer the warm waters of
              the tropic zones, but some, such as the right whale dolphin,
              prefer colder climates. Dolphins feed largely on fish and squid,
              but a few, such as the orca, feed on large mammals such as seals.
            </p>
            <a href="https://en.wikipedia.org/wiki/Dolphin" target="_blank">
              explore
            </a>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="swiper-pagination"></div>
    </main>
  );
};

export default Benner;
