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

export default function Projects() {
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
    <div className="mWidth ">
      <h1 className="pageTitle firstDiv">Projects</h1>
      <Flex gap="4" height="80vh">
        <div className="lineContainer" id="projectInfo">
          projeto
        </div>
        <div className="lineContainer" id="projectsContainer">
          <Flex wrap="wrap" gap="4" id="coisa">
            {[
              "Training Wheels",
              "Project 2",
              "Project 3",
              "Evergreen",
              "Eco-Meow",
            ].map((title, index) => (
              <Card
                key={index}
                className="projectCard"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <h2 className="titleCard">{title}</h2>
                {hoveredCard === index ? (
                  <div>
                    <Flex gap="1" wrap="wrap">
                      <Badge>ola</Badge>
                    </Flex>

                    <Button radius="full" variant="solid" size="3">
                      Learn more
                    </Button>
                  </div>
                ) : (
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec volutpat tincidunt mi tristique convallis. Vestibulum
                    viverra pulvinar mauris, eu molestie velit rutrum non.
                  </p>
                )}
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
                  alt=""
                  className="projectCardImg"
                />
              </Card>
            ))}
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
