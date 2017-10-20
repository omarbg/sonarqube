/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import { IndexLink, Link } from 'react-router';
import ContextNavBar from '../../../../components/nav/ContextNavBar';
import NavBarTabs from '../../../../components/nav/NavBarTabs';
import { Extension } from '../../../types';
import { translate } from '../../../../helpers/l10n';

interface Props {
  extensions: Extension[];
  customOrganizations: boolean;
  location: {};
}

export default class SettingsNav extends React.PureComponent<Props> {
  static defaultProps = {
    extensions: []
  };

  isSomethingActive(urls: string[]): boolean {
    const path = window.location.pathname;
    return urls.some((url: string) => path.indexOf((window as any).baseUrl + url) === 0);
  }

  isSecurityActive() {
    const urls = [
      '/admin/users',
      '/admin/groups',
      '/admin/permissions',
      '/admin/permission_templates'
    ];
    return this.isSomethingActive(urls);
  }

  isProjectsActive() {
    const urls = ['/admin/projects_management', '/admin/background_tasks'];
    return this.isSomethingActive(urls);
  }

  isSystemActive() {
    const urls = ['/admin/system'];
    return this.isSomethingActive(urls);
  }

  isMarketplace() {
    const urls = ['/admin/marketplace'];
    return this.isSomethingActive(urls);
  }

  renderExtension = ({ key, name }: Extension) => {
    return (
      <li key={key}>
        <Link to={`/admin/extension/${key}`} activeClassName="active">
          {name}
        </Link>
      </li>
    );
  };

  render() {
    const { customOrganizations, extensions } = this.props;
    const isSecurity = this.isSecurityActive();
    const isProjects = this.isProjectsActive();
    const isSystem = this.isSystemActive();

    const securityClassName = classNames('dropdown-toggle', { active: isSecurity });
    const projectsClassName = classNames('dropdown-toggle', { active: isProjects });
    const configurationClassNames = classNames('dropdown-toggle', {
      active: !isSecurity && !isProjects && !isSystem && !this.isMarketplace()
    });

    return (
      <ContextNavBar id="context-navigation" height={65}>
        <h1 className="navbar-context-header">
          <strong>{translate('layout.settings')}</strong>
        </h1>

        <NavBarTabs>
          <li className="dropdown">
            <a
              className={configurationClassNames}
              data-toggle="dropdown"
              id="settings-navigation-configuration"
              href="#">
              {translate('sidebar.project_settings')} <i className="icon-dropdown" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <IndexLink to="/admin/settings" activeClassName="active">
                  {translate('settings.page')}
                </IndexLink>
              </li>
              <li>
                <IndexLink to="/admin/settings/encryption" activeClassName="active">
                  {translate('property.category.security.encryption')}
                </IndexLink>
              </li>
              <li>
                <IndexLink to="/admin/custom_metrics" activeClassName="active">
                  {translate('custom_metrics.page')}
                </IndexLink>
              </li>
              {extensions.map(this.renderExtension)}
            </ul>
          </li>

          <li className="dropdown">
            <a className={securityClassName} data-toggle="dropdown" href="#">
              {translate('sidebar.security')} <i className="icon-dropdown" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <IndexLink to="/admin/users" activeClassName="active">
                  {translate('users.page')}
                </IndexLink>
              </li>
              {!customOrganizations && (
                <li>
                  <IndexLink to="/admin/groups" activeClassName="active">
                    {translate('user_groups.page')}
                  </IndexLink>
                </li>
              )}
              {!customOrganizations && (
                <li>
                  <IndexLink to="/admin/permissions" activeClassName="active">
                    {translate('global_permissions.page')}
                  </IndexLink>
                </li>
              )}
              {!customOrganizations && (
                <li>
                  <IndexLink to="/admin/permission_templates" activeClassName="active">
                    {translate('permission_templates')}
                  </IndexLink>
                </li>
              )}
            </ul>
          </li>

          <li className="dropdown">
            <a className={projectsClassName} data-toggle="dropdown" href="#">
              {translate('sidebar.projects')} <i className="icon-dropdown" />
            </a>
            <ul className="dropdown-menu">
              {!customOrganizations && (
                <li>
                  <IndexLink to="/admin/projects_management" activeClassName="active">
                    {translate('management')}
                  </IndexLink>
                </li>
              )}
              <li>
                <IndexLink to="/admin/background_tasks" activeClassName="active">
                  {translate('background_tasks.page')}
                </IndexLink>
              </li>
            </ul>
          </li>
          <li>
            <IndexLink to="/admin/system" activeClassName="active">
              {translate('sidebar.system')}
            </IndexLink>
          </li>

          <li>
            <IndexLink to="/admin/marketplace" activeClassName="active">
              {translate('marketplace.page')}
            </IndexLink>
          </li>
        </NavBarTabs>
      </ContextNavBar>
    );
  }
}
