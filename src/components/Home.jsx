import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [num, setNum] = useState(0);

  const projectIdsToShow = [1, 2, 3, 4];

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error));

    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 1024) {
        setNum(1.5);
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1280) {
        setNum(0);
        setSlidesPerView(2);
      } else {
        setNum(0);
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView(); // Set initial value
    window.addEventListener("resize", updateSlidesPerView); // Listen for window resize
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const filteredProjects = projects.filter((project) =>
    projectIdsToShow.includes(project.id)
  );

  // Handle navigation to next slide
  const goToNextSlide = () => {
    if (currentSlide < filteredProjects.length + 1 - slidesPerView) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  return (
    <div className="mainBody">
      <div className="mWidth homeMainDiv" data-aos="fade-up">
        <h1 align="left">Hi!</h1>
        <h3 align="left">I'm a UX/UI designer and Full-stack Web Developer</h3>
        <Button
          radius="full"
          variant="solid"
          size={{
            initial: "3",
            md: "4",
          }}
        >
          My work
        </Button>
      </div>

      <img src="/pc.png" alt="" id="pcImg" data-aos="fade-up" />
      <div className="mWidth homeDiv" data-aos="fade-up">
        <h1 className="pageTitle">Projects</h1>

        {/* Carousel Container */}
        <div className="carousel-container">
          {/* Carousel Content */}
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${
                currentSlide * (107 / slidesPerView + num)
              }%)`,
            }}
          >
            {filteredProjects.map((project, index) => (
              <Card key={index} className="projectCard">
                <h2 className="titleCard">{project.name}</h2>
                <p>{project.shortDescription}</p>
                <Button
                  radius="full"
                  variant="solid"
                  size={{
                    initial: "2",
                    md: "3",
                  }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  Learn more
                </Button>
                {project.logo && (
                  <img src={project.logo} alt="" className="projectCardImg" />
                )}
              </Card>
            ))}
            <Card className="projectCard" id="lastCard">
              <h2>Want to see more projects?</h2>
              <Link to="/projects">
                <Button radius="full" variant="solid" size="3">
                  See all
                </Button>
              </Link>
            </Card>
          </div>

          {/* Navigation Buttons */}
          <button onClick={goToPreviousSlide} className="carousel-nav prev">
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgBtn"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
                fill="none"
              />
              {/* Inner Fill Path */}
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* <Button className="carousel-nav prev" onClick={goToPreviousSlide}>
            &#8592; 
          </Button> */}

          <button onClick={goToNextSlide} className="carousel-nav next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgBtn"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                stroke="black"
                stroke-width="5" /* Bigger stroke */
                stroke-linejoin="round"
                fill="none"
              />

              {/* Inner fill (original path) */}
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* <Button className="carousel-nav next" onClick={goToNextSlide}>
            &#8594; 
          </Button> */}
        </div>
      </div>

      <div className="line"></div>
      <div className="mWidth homeDiv" data-aos="fade-up">
        <h1 className="pageTitle">About me</h1>
        <Flex gap="6" id="meDiv">
          <Avatar
            src="/pfp.png"
            fallback="B"
            size={{
              initial: "8",
              md: "9",
            }}
          />
          <div>
            <p className="meDescription">
              Hi! I’m Beatriz, a UX/UI designer and full-stack web developer
              with a passion for crafting seamless digital experiences. I’m
              currently pursuing my master’s degree in Communication and Web
              Technologies at the University of Aveiro, where I’m deepening my
              knowledge of design, development, and innovative web solutions.
            </p>
            {/* <Button radius="full" variant="solid" size="3">
              Learn more
            </Button> */}
          </div>
        </Flex>
      </div>
    </div>
  );
}
