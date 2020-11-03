export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: 'localhost',
		port: 3306,
		username: 'root',
        password: 'root',
        database: 'test',
        autoLoadEntities: true,
        synchronize: true
	}
});