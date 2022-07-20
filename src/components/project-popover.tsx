import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProject } from "utils/project";
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects, isLoading } = useProject();
  const pinnedProjects = projects?.filter((project) => project.name);

  const content = (
    <div>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => dispatch(projectListActions.openProjectModal())}
        type={"link"}
      >
        创建项目
      </ButtonNoPadding>
    </div>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};
