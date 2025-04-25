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
import ProjectInfo from "./ProjectInfo";

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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1280);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: false, // Whether animation should happen only once
    });

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

    if (isSmallScreen) {
      setIsModalOpen(true); // Open modal on small screens
    }

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
      <Flex gap="4" id="projectsContainer">
        {/* Project Details Section */}
        {!isSmallScreen && (
          <div className="lineContainer" id="projectInfo" data-aos="fade-up">
            {selectedProject ? (
              <ProjectInfo
                project={selectedProject}
                getSkill={getSkill}
                prevImage={prevImage}
                nextImage={nextImage}
                currentImageIndex={currentImageIndex}
              />
            ) : (
              <Flex align="center" justify="center" width={100} height={100}>
                <Spinner size="3" />
              </Flex>
            )}
          </div>
        )}

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
      {isModalOpen && isSmallScreen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header id="modalHeader">
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </header>
            <ProjectInfo
              project={selectedProject}
              getSkill={getSkill}
              prevImage={prevImage}
              nextImage={nextImage}
              currentImageIndex={currentImageIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
}
