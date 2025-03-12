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

  const [projects, setProjects] = useState([]); // State to store JSON data

  // Fetch JSON data
  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data)) // Store fetched data in state
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

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
      <Flex gap="4" height="84vh">
        <div className="lineContainer" id="projectInfo">
          <img
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
            className="projectImg"
            alt=""
          />
          <h2>Titulo</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat tincidunt mi tristique convallis. Vestibulum viverra
            pulvinar mauris, eu molestie velit rutrum non.
          </p>
          <Flex gap="1" wrap="wrap">
            <Badge size="3">JavaScript</Badge> <Badge size="3">Bootstrap</Badge>
            <Badge size="3">Figma</Badge> <Badge size="3">Illustrator</Badge>
            <Badge size="3">JavaScript</Badge> <Badge size="3">Bootstrap</Badge>
            <Badge size="3">Figma</Badge> <Badge size="3">Illustrator</Badge>
          </Flex>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat tincidunt mi tristique convallis. Vestibulum viverra
            pulvinar mauris, eu molestie velit rutrum non.
          </p>
          <h3>Poster</h3>
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_vintage-posters-e4806ad9b3d6f2f2f0e5d8709ae1d222.jpg"
            className="projectPoster"
            alt=""
          />
          <h3>Promotional video</h3>
          <img
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
            className="projectVideo"
            alt=""
          />

          <h3>Video tour</h3>
          <img
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
            className="projectVideo"
            alt=""
          />
        </div>
        <div className="lineContainer" id="projectsPContainer">
          {/* <div id="coisa"> */}
          {projects.map((project, index) => (
            <Card
              key={project.name}
              className="projectCard cardsProjects"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <h2 className="titleCard">{project.name}</h2>

              <div>
                <p>{project.shortDescription}</p>
                <Button radius="full" variant="solid" size="3">
                  Learn more
                </Button>
              </div>

              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
                alt=""
                className="projectCardImg"
              />
            </Card>
          ))}
          {/* </div> */}
        </div>
      </Flex>
    </div>
  );
}
