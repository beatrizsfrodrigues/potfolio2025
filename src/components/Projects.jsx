import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Flex, Text, Button, Badge, Card } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import ProjectDescription from "./ProjectDescription";

export default function Projects() {
  const [projects, setProjects] = useState([]); // State to store projects data
  const [skills, setSkills] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project

  // Fetch JSON data
  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setSelectedProject(data[0]); // Set first project as default
      })
      .catch((error) => console.error("Error fetching projects:", error));

    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: false, // Whether animation should happen only once
    });
  }, []);

  const getSkillName = (id) => {
    const skill = skills.find((s) => s.id === id);
    return skill ? skill.name : "Unknown Skill";
  };

  return (
    <div className="mWidth">
      <h1 className="pageTitle firstDiv">Projects</h1>
      <Flex gap="4" height="84vh">
        {/* Project Details Section */}
        <div className="lineContainer" id="projectInfo">
          {selectedProject ? (
            <>
              <img
                src={selectedProject.photos?.[0]}
                className="projectImg"
                alt={selectedProject.name}
              />
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.shortDescription}</p>

              <Flex gap="1" wrap="wrap">
                {selectedProject.skills.map((skillId, i) => (
                  <Badge key={i} size="3">
                    {getSkillName(skillId)}
                  </Badge>
                ))}
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

              {selectedProject.video_tour && (
                <>
                  <h3>Video Tour</h3>
                  <video
                    key={selectedProject.id + "-tour"}
                    className="projectVideo"
                    controls
                  >
                    <source src={selectedProject.video_tour} type="video/mp4" />
                  </video>
                </>
              )}
            </>
          ) : (
            <p>Loading project details...</p>
          )}
        </div>

        {/* Project List Section */}
        <div className="lineContainer" id="projectsPContainer">
          {projects.map((project, index) => (
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
                onClick={() => setSelectedProject(project)}
              >
                Learn more
              </Button>

              {project.logo && (
                <img src={project.logo} alt="" className="projectCardImg" />
              )}
            </Card>
          ))}
        </div>
      </Flex>
    </div>
  );
}
