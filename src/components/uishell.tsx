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
import Link from "next/link";
import type { pages } from "../logic/frontend";

export const UIShell = ({ current }: { current: pages }) => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-labelledby="damishra">
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
                <Link href="/" passHref={true}>
                  <SideNavLink
                    aria-current={current === "dashboard" ? `page` : false}
                    renderIcon={Dashboard16}
                  >
                    Dashboard
                  </SideNavLink>
                </Link>
                <SideNavMenu
                  renderIcon={Email16}
                  title="Mail Management"
                  isActive={
                    current === "mail_all" ||
                    current === "mail_completed_view" ||
                    current === "mail_incomplete_view" ||
                    current === "mail_create" ||
                    current === "mail_processing_view"
                  }
                >
                  <Link href="/mail" passHref={true}>
                    <SideNavMenuItem
                      aria-current={current === "mail_all" ? `page` : false}
                      href="#"
                    >
                      View All Records
                    </SideNavMenuItem>
                  </Link>
                  <Link href="/mail/incoming" passHref={true}>
                    <SideNavMenuItem
                      aria-current={current === "mail_create" ? `page` : false}
                      href="#"
                    >
                      Create New Record
                    </SideNavMenuItem>
                  </Link>

                  <Link href="/mail?filter=INCOMPLETE" passHref={true}>
                    <SideNavMenuItem
                      aria-current={
                        current === "mail_incomplete_view" ? `page` : false
                      }
                      href="#"
                    >
                      View Incomplete Records
                    </SideNavMenuItem>
                  </Link>
                  <Link href="/mail?filter=PROCESSING" passHref={true}>
                    <SideNavMenuItem
                      aria-current={
                        current === "mail_processing_view" ? `page` : false
                      }
                      href="#"
                    >
                      View Processing Records
                    </SideNavMenuItem>
                  </Link>
                  <Link href="/mail?filter=COMPLETED" passHref={true}>
                    <SideNavMenuItem
                      aria-current={
                        current === "mail_completed_view" ? `page` : false
                      }
                      href="#"
                    >
                      View Completed Records
                    </SideNavMenuItem>
                  </Link>
                </SideNavMenu>
                <SideNavMenu
                  renderIcon={CalendarHeatMap16}
                  title="Appointments"
                >
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View All Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    Create New Record
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Incomplete Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Processing Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Completed Records
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={Query16} title="Parliament Q & A">
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View All Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    Create New Record
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Incomplete Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Processing Records
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current={current === "UNDEFINED" ? `page` : false}
                    href="#"
                  >
                    View Completed Records
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink
                  aria-current={current === "UNDEFINED" ? `page` : false}
                  renderIcon={ProgressBarRound16}
                  href="#"
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
};

export default UIShell;
