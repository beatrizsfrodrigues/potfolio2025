import React from "react";

function ProjectDescription({ description }) {
  return <p dangerouslySetInnerHTML={{ __html: description }} />;
}

export default ProjectDescription;
