import { Flex, Text, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Container, Card, Inset, Strong, Avatar } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="mainBody">
      <div className="mWidth homeMainDiv">
        <h1 align="right">Hi!</h1>
        <h3 align="right">
          I'm a UX/UI designer and a full stack web developer
        </h3>
      </div>
      <div className="mWidth homeDiv">
        <h1 className="pageTitle">Projects</h1>
        <div id="projectsContainer">
          <Card className="projectCard" radius="large">
            <h2>Training Wheels</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat tincidunt mi tristique convallis. Vestibulum viverra
              pulvinar mauris, eu molestie velit rutrum non.
            </p>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
              alt=""
              className="projectCardImg"
            />
          </Card>
          <Card className="projectCard" radius="large">
            <h2>Training Wheels</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat tincidunt mi tristique convallis. Vestibulum viverra
              pulvinar mauris, eu molestie velit rutrum non.
            </p>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
              alt=""
              className="projectCardImg"
            />
          </Card>
          <Card className="projectCard" radius="large">
            <h2>Training Wheels</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat tincidunt mi tristique convallis. Vestibulum viverra
              pulvinar mauris, eu molestie velit rutrum non.
            </p>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
              alt=""
              className="projectCardImg"
            />
          </Card>
        </div>
      </div>
      <div className="line"></div>
      <div className="mWidth homeDiv">
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
