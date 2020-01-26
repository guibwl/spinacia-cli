import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// require all modules ending in "__test__" from the
// current directory and all subdirectories
const testsContext = require.context('../../../app', true, /\/__test__\//);

testsContext.keys().forEach(testsContext);
