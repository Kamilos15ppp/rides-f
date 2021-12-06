import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faCarSide,
  faListUl,
  faPlusCircle,
  faSearch,
  faBus,
  faSubway,
  faBusAlt,
  faWarehouse,
  faInfo,
  faListOl,
  faUserAlt,
  faKey,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from './Navigation.styles';

const Navigation = () => {
  const auth = useAuth();
  const { SubMenu } = Menu;

  return (
    <Wrapper>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
        style={{ width: '46px' }}
        defaultSelectedKeys={['1']}
      >
        <SubMenu
          key="sub1"
          icon={<FontAwesomeIcon icon={faClipboardList} />}
          title="Przejazdy"
        >
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faListUl} />}>
            <Link to="/rides">Lista</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faPlusCircle} />}>
            <Link to="/add">Dodaj</Link>
          </Menu.Item>
          <Menu.Item
            disabled={true}
            key="3"
            icon={<FontAwesomeIcon icon={faSearch} />}
          >
            Szukaj
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          icon={<FontAwesomeIcon icon={faCarSide} />}
          title="Pojazdy"
        >
          <Menu.Item key="4" icon={<FontAwesomeIcon icon={faBus} />}>
            <Link to="/vehicles/buses">Autobusy</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FontAwesomeIcon icon={faSubway} />}>
            <Link to="/vehicles/trams">Tramwaje</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FontAwesomeIcon icon={faBusAlt} />}>
            <Link to="/vehicles/others">Inne</Link>
          </Menu.Item>
          <SubMenu
            disabled={true}
            key="sub3"
            title="Zajezdnie"
            icon={<FontAwesomeIcon icon={faWarehouse} />}
          >
            <Menu.Item key="7">Zajezdnia 1</Menu.Item>
            <Menu.Item key="8">Zajezdnia 2</Menu.Item>
            <Menu.Item key="9">Zajezdnia 3</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          icon={<FontAwesomeIcon icon={faInfo} />}
          title="Statystyki"
        >
          <Menu.Item
            disabled={true}
            key="10"
            icon={<FontAwesomeIcon icon={faListOl} />}
          >
            Ranking
          </Menu.Item>
          <Menu.Item
            disabled={true}
            key="11"
            icon={<FontAwesomeIcon icon={faListUl} />}
          >
            Zestawienie
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          icon={<FontAwesomeIcon icon={faUserAlt} />}
          title="Konto"
        >
          <Menu.Item key="12" icon={<FontAwesomeIcon icon={faKey} />}>
            <Link to="/change-password">Zmień hasło</Link>
          </Menu.Item>
          <Menu.Item
            key="13"
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            as="a"
            onClick={auth.signOut}
          >
            Wyloguj
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Wrapper>
  );
};

export default Navigation;
