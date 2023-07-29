import about from './about';
import archive from './archive';
import home from './home';
import page from './page';
import single from './single';
import upcomingShows from './upcoming-shows';

const template = {
  'front-page': home,
  'template-About': about,
  'template-Upcoming-Shows': upcomingShows,
  page,
  single,
  archive,
};

export default template;
