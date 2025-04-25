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
        <button onClick={prevImage} className="carousel-nav prev slideBtn">
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
        {/* <button onClick={prevImage} className="slideBtn">
          ◀
        </button> */}
        <img
          src={project.photos?.[currentImageIndex]}
          className="projectImg"
          alt={project.name}
        />
        <button onClick={nextImage} className="carousel-nav next slideBtn">
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
        {/* <button onClick={nextImage} className="slideBtn">
          ▶
        </button> */}
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
        <div className="infoDiv">
          <h3>Poster</h3>
          <img
            src={project.poster}
            className="projectPoster"
            alt="Project Poster"
          />
        </div>
      )}

      {project.video_promotional && (
        <div className="infoDiv">
          <h3>Promotional Video</h3>
          <video className="projectVideo" controls>
            <source src={project.video_promotional} type="video/mp4" />
          </video>
        </div>
      )}

      {project.video_tour && (
        <div className="infoDiv">
          <h3>Video Tour</h3>
          <video
            key={project.id + "-tour"}
            className="projectVideo"
            muted
            controls
          >
            <source src={project.video_tour} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
