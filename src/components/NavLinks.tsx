import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const NavLinkList = [
  {
    text: 'Dashboard',
    icon: DashboardIcon,
    path: '/'
  },
  {
    text: 'Setup',
    icon: SettingsIcon,
    path: '/admin'
  }
];

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit'
}));

const NavLinks = () => {
  return (
    <>
      {NavLinkList.map((link, index) => (
        <StyledLink to={link.path} key={index}>
          <ListItemButton>
            <ListItemIcon>
              <link.icon />
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItemButton>
        </StyledLink>
      ))}
    </>
  );
};

export default NavLinks;
