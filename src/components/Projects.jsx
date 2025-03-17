import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Flex,
  Text,
  Button,
  Badge,
  Card,
  HoverCard,
  Spinner,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import ProjectDescription from "./ProjectDescription";

export default function Projects() {
  const { id } = useParams();

  if (!id) {
    // Redirect to the first project if no ID is provided
    return <Navigate to="/projects/0" replace />;
  }

  const [projects, setProjects] = useState([]); // State to store projects data
  const [skills, setSkills] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: false, // Whether animation should happen only once
    });
  }, []);

  // Fetch JSON data
  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        const project = data.find((proj) => proj.id === parseInt(id));
        setSelectedProject(project || projects[0]);
      })
      .catch((error) => console.error("Error fetching projects:", error));

    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  const handleLearnMore = (project) => {
    setSelectedProject(project);

    setTimeout(() => {
      const projectInfoElement = document.getElementById("projectInfo");
      if (projectInfoElement) {
        projectInfoElement.scrollTop = 0; // Scroll inner content to the top
      }
    }, 100); // Small delay to ensure content updates before scrolling
  };

  const getSkill = (id) =>
    skills.find((s) => s.id === id) || { name: "Unknown", description: "" };

  const nextImage = () => {
    if (selectedProject.photos) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedProject.photos.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject.photos) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.photos.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="mWidth">
      <h1 className="pageTitle firstDiv" data-aos="fade-up">
        Projects
      </h1>
      <Flex gap="4" height="84vh">
        {/* Project Details Section */}
        <div className="lineContainer" id="projectInfo" data-aos="fade-up">
          {selectedProject ? (
            <>
              <div className="imageSlider">
                <button onClick={prevImage} className="slideBtn">
                  <svg
                    width="15"
                    height="15"
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

                <img
                  src={selectedProject.photos?.[currentImageIndex]}
                  className="projectImg"
                  alt={selectedProject.name}
                />

                <button onClick={nextImage} className="slideBtn">
                  <svg
                    width="15"
                    height="15"
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
              </div>

              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.shortDescription}</p>

              <Flex gap="1" wrap="wrap">
                {selectedProject.skills.map((skillId, i) => {
                  const skill = getSkill(skillId);
                  return (
                    <HoverCard.Root key={i}>
                      <HoverCard.Trigger>
                        <Badge size="3">{skill.name}</Badge>
                      </HoverCard.Trigger>
                      <HoverCard.Content maxWidth="250px">
                        <Text size="2">{skill.description}</Text>
                      </HoverCard.Content>
                    </HoverCard.Root>
                  );
                })}
              </Flex>

              <ProjectDescription description={selectedProject.description} />

              {selectedProject.poster && (
                <>
                  <h3>Poster</h3>
                  <img
                    src={selectedProject.poster}
                    className="projectPoster"
                    alt="Project Poster"
                  />
                </>
              )}

              {selectedProject.video_promotional && (
                <>
                  <h3>Promotional Video</h3>
                  <video className="projectVideo" controls>
                    <source
                      src={selectedProject.video_promotional}
                      type="video/mp4"
                    />
                  </video>
                </>
              )}
              {/* ! escolher videos sem som!!!!! anda tem som */}
              {selectedProject.video_tour && (
                <>
                  <h3>Video Tour</h3>
                  <video
                    key={selectedProject.id + "-tour"}
                    className="projectVideo"
                    muted
                    controls
                  >
                    <source src={selectedProject.video_tour} type="video/mp4" />
                  </video>
                </>
              )}
            </>
          ) : (
            <Flex align="center" justify="center" width={100} height={100}>
              <Spinner size="3" />
            </Flex>
          )}
        </div>

        {/* Project List Section */}
        <div
          className="lineContainer"
          id="projectsPContainer"
          data-aos="fade-up"
        >
          <div>
            {projects.length ? (
              projects.map((project, index) => (
                <Card
                  key={project.name}
                  className={`projectCard cardsProjects ${
                    selectedProject?.id === project.id ? "active" : ""
                  }`}
                >
                  <h2 className="titleCard">{project.name}</h2>
                  <p>{project.shortDescription}</p>

                  <Button
                    radius="full"
                    variant="solid"
                    size="3"
                    onClick={() => handleLearnMore(project)}
                  >
                    Learn more
                  </Button>

                  {project.logo && (
                    <img src={project.logo} alt="" className="projectCardImg" />
                  )}
                </Card>
              ))
            ) : (
              <Flex align="center" justify="center" width={100} height={100}>
                <Spinner size="3" />
              </Flex>
            )}
          </div>
        </div>
      </Flex>
    </div>
  );
}
