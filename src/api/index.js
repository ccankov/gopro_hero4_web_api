import { version } from '../../package.json';
import { Router } from 'express';
import cameraApi from '../lib/goProApi';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		// take photo
		cameraApi.takePhoto().then(() => {

			// grab last photo
			return cameraApi.getLastPhoto();
		}).then((filename) => {

			// delete camera media
			cameraApi.deleteAllMedia().then(() => {
				// respond with version and filename
				res.json({ version, filename });
			});
		});
	});

	return api;
}
