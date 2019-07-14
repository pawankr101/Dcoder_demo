export const server_config = {
	appName: 'server',
	hostName: 'http://localhost',
	hostingPort: 3000,
	localDB: 'mongodb://localhost:27017/dcoder', 
	remoteDB: '',
	clientHostName: 'http://localhost',
	clientHostingPort: 3030
};

export const public_apis = [
	'/', '/user/login', '/user/register'
]