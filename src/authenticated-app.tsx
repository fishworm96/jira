import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { ProjectScreen } from "screens/project/index";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/project"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path={"/project/:projectId/*"} element={<ProjectScreen />} />
            <Route
              path="*"
              element={<Navigate to="/project" replace={true} />}
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type={"link"}
          onClick={resetRoute}
        >
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
