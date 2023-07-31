import about from './about';
import archive from './archive';
import contact from './contact';
import home from './home';
import page from './page';
import single from './single';
import songList from './song-list';
import upcomingShows from './upcoming-shows';

const template = {
  'front-page': home,
  'template-About': about,
  'template-Contact': contact,
  'template-Upcoming-Shows': upcomingShows,
  'template-Song-List': songList,
  page,
  single,
  archive,
};

export default template;
