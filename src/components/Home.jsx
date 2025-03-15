import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Flex,
  Text,
  Button,
  Container,
  Card,
  Inset,
  Strong,
  Avatar,
  Badge,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: false, // Whether animation should happen only once
    });
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="mainBody">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 845"
        fill="none"
        id="backgroundSvg"
      >
        <path d="M1.55504e-05 0H1440V845C1440 845 1226.5 619.722 741.5 473.25C256.5 326.777 142 158.025 1.55504e-05 74.6802C-1.9438e-05 59.0015 1.55504e-05 0 1.55504e-05 0Z" />
      </svg>
      <div className="mWidth homeMainDiv" data-aos="fade-up">
        <h1 align="right">Hi!</h1>
        <h3 align="right">
          I'm a UX/UI designer and a full stack web developer
        </h3>
        <Button radius="full" variant="solid" size="4">
          My work
        </Button>
      </div>
      <div className="mWidth homeDiv" data-aos="fade-up">
        <h1 className="pageTitle">Projects</h1>
        <div id="projectsContainer">
          {["Training Wheels", "Project 2", "Project 3"].map((title, index) => (
            <Card
              key={index}
              className="projectCard"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <h2 className="titleCard">{title}</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                volutpat tincidunt mi tristique convallis. Vestibulum viverra
                pulvinar mauris, eu molestie velit rutrum non.
              </p>
              <Button radius="full" variant="solid" size="3">
                Learn more
              </Button>

              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
                alt=""
                className="projectCardImg"
              />
            </Card>
          ))}
        </div>
      </div>
      <div className="line"></div>
      <div className="mWidth homeDiv" data-aos="fade-up">
        <h1 className="pageTitle">About me</h1>
        <Flex gap="6">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="B"
            size="9"
          />
          <div>
            <p className="meDescription">
              Hi! I’m Beatriz, a UX/UI designer and full-stack web developer
              with a passion for crafting seamless digital experiences. I’m
              currently pursuing my master’s degree in Communication and Web
              Technologies at the University of Aveiro, where I’m deepening my
              knowledge of design, development, and innovative web solutions.
            </p>
            <Button radius="full" variant="solid" size="3">
              Learn more
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}
