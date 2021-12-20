import {
  CalendarHeatMap16,
  Dashboard16,
  Email16,
  Notification20,
  ProgressBarRound16,
  Query16,
  Search20,
  User20,
} from "@carbon/icons-react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from "carbon-components-react";

export const UIShell = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header>
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="MFAHD | ">
            Office Governance Platform
          </HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search">
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="login" tooltipAlignment="end">
              <User20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavItems>
              <SideNavLink renderIcon={Dashboard16}>Dashboard</SideNavLink>
              <SideNavMenu
                renderIcon={Email16}
                title="Mail Management"
                isActive={true}
              >
                <SideNavMenuItem href="javascript:void(0)">
                  View All Records
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Create New Record
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Incomplete Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Processing Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Completed Records
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={CalendarHeatMap16} title="Appointments">
                <SideNavMenuItem href="javascript:void(0)">
                  View All Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Create New Record
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Incomplete Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Processing Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Completed Records
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Query16} title="Parliament Q & A">
                <SideNavMenuItem href="javascript:void(0)">
                  View All Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Create New Record
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Incomplete Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Processing Records
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  View Completed Records
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={ProgressBarRound16}
                href="javascript:void(0)"
              >
                Progress Report
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
      </>
    )}
  />
);

export default UIShell;
