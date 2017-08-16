import { Router } from 'express';
import path from 'path';
import cameraApi from '../lib/goProApi';
import fs from 'fs';
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
				let rootPath = path.dirname(require.main.filename) + '/../';

				// delete file after it is sent
				res.on('finish', () => {
					fs.unlink(`${rootPath}${filename}`);
				});

				// respond with latest photo file
				res.sendFile(`./${filename}`, {
					root: rootPath
				});
			});
		});
	});

	return api;
}
