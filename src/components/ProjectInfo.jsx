import { Flex, Text, Badge, HoverCard, Spinner } from "@radix-ui/themes";
import ProjectDescription from "./ProjectDescription";

export default function ProjectInfo({
  project,
  getSkill,
  prevImage,
  nextImage,
  currentImageIndex,
}) {
  if (!project) {
    return (
      <Flex align="center" justify="center" width={100} height={100}>
        <Spinner size="3" />
      </Flex>
    );
  }

  return (
    <div>
      <div className="imageSlider">
        <button onClick={prevImage} className="slideBtn">
          ◀
        </button>
        <img
          src={project.photos?.[currentImageIndex]}
          className="projectImg"
          alt={project.name}
        />
        <button onClick={nextImage} className="slideBtn">
          ▶
        </button>
      </div>

      <h2>{project.name}</h2>
      <p>{project.shortDescription}</p>

      <Flex gap="1" wrap="wrap">
        {project.skills.map((skillId, i) => {
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

      <ProjectDescription description={project.description} />

      {project.poster && (
        <>
          <h3>Poster</h3>
          <img
            src={project.poster}
            className="projectPoster"
            alt="Project Poster"
          />
        </>
      )}

      {project.video_promotional && (
        <>
          <h3>Promotional Video</h3>
          <video className="projectVideo" controls>
            <source src={project.video_promotional} type="video/mp4" />
          </video>
        </>
      )}

      {project.video_tour && (
        <>
          <h3>Video Tour</h3>
          <video
            key={project.id + "-tour"}
            className="projectVideo"
            muted
            controls
          >
            <source src={project.video_tour} type="video/mp4" />
          </video>
        </>
      )}
    </div>
  );
}
