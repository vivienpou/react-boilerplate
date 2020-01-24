/**
 *
 * Asynchronously loads the component for LeftMenu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
