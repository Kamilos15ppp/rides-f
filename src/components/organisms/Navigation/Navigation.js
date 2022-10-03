import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCarSide,
  faListUl,
  faPlusCircle,
  faSearch,
  faBus,
  faSubway,
  faBusAlt,
  faWarehouse,
  faChartBar,
  faListOl,
  faUserAlt,
  faKey,
  faSignOutAlt,
  faUserPlus,
  faUsers,
  faTable,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from './Navigation.styles';
import PropTypes from 'prop-types';

const Navigation = ({ handleLogout }) => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { SubMenu } = Menu;

  return (
    <Wrapper>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
        style={{ width: '46px', borderRadius: '30px' }}
      >
        <SubMenu
          key="sub1"
          icon={<FontAwesomeIcon icon={faTable} />}
          title="Przejazdy"
        >
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faListUl} />}>
            <Link to="/rides">Lista</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faPlusCircle} />}>
            <Link to="/add">Dodaj</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faSearch} />}>
            <Link to="/search">Szukaj</Link>
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
          <Menu.Item key="7" icon={<FontAwesomeIcon icon={faWarehouse} />}>
            <Link to="/vehicles/depots">Zajezdnie</Link>
          </Menu.Item>
          {/*<SubMenu*/}
          {/*  // disabled={true}*/}
          {/*  key="sub3"*/}
          {/*  title="Zajezdnie"*/}
          {/*  icon={<FontAwesomeIcon icon={faWarehouse} />}*/}
          {/*>*/}
          {/*  <Menu.Item key="7">Zajezdnia 1</Menu.Item>*/}
          {/*  <Menu.Item key="8">Zajezdnia 2</Menu.Item>*/}
          {/*  <Menu.Item key="9">Zajezdnia 3</Menu.Item>*/}
          {/*</SubMenu>*/}
        </SubMenu>
        <SubMenu
          key="sub4"
          icon={<FontAwesomeIcon icon={faChartBar} />}
          title="Statystyki"
        >
          <Menu.Item key="10" icon={<FontAwesomeIcon icon={faListOl} />}>
            <Link to="/ranking">Ranking</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FontAwesomeIcon icon={faListUl} />}>
            <Link to="/statement">Zestawienie</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          icon={<FontAwesomeIcon icon={faUserAlt} />}
          title="Konto"
        >
          {isAdmin ? (
            <>
              <Menu.Item key="12" icon={<FontAwesomeIcon icon={faUserPlus} />}>
                <Link to="/add-user">Dodaj użytkownika</Link>
              </Menu.Item>
              <Menu.Item key="13" icon={<FontAwesomeIcon icon={faUsers} />}>
                <Link to="/users-management">Użytkownicy</Link>
              </Menu.Item>
            </>
          ) : null}
          <Menu.Item key="14" icon={<FontAwesomeIcon icon={faKey} />}>
            <Link to="/change-password">Zmień hasło</Link>
          </Menu.Item>
          <Menu.Item
            key="15"
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            as="a"
            onClick={handleLogout}
          >
            Wyloguj
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="16"
          icon={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
          as="a"
          onClick={() => window.history.go(1)}
        >
          Naprzód
        </Menu.Item>
        <Menu.Item
          key="17"
          icon={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
          as="a"
          onClick={() => window.history.go(-1)}
        >
          Cofnij
        </Menu.Item>
      </Menu>
    </Wrapper>
  );
};

export default Navigation;

Navigation.propTypes = {
  handleLogout: PropTypes.func,
};
