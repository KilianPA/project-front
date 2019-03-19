// Configuration for your app
const envparser = require('./src/envparser')
module.exports = function (ctx) {
	return {
		// app plugins (/src/plugins)
		plugins: [
			'axios', 'vuelidate'
		],
		css: [
			'app.styl'
		],
		extras: [
			ctx.theme.mat ? 'roboto-font' : null,
			'material-icons', // optional, you are not bound to it
			'ionicons',
			// 'mdi',
			'fontawesome'
		],
		supportIE: false,
		build: {
			env: ctx.dev
				? { // so on dev we'll have
					API: JSON.stringify('http://localhost:8000/api/'),
					SPOTIFY_TOKEN: JSON.stringify('BQArnxeCFJmDt_SRyb_FuNgftDPJncCSQ1gTyqa1JWLr7NTopaPCjNWLbd4rvgg4eA-jGsOcWQHKiyYuC28'),
					SPOTIFY_URL: JSON.stringify('https://api.spotify.com/v1/search'),
					FIREBASE_KEY: JSON.stringify('AIzaSyDplXkRfDuXERjkQIsRT_E9KSdk1wHPLsc'),
					FIREBASE_DOMAIN: JSON.stringify('kilian-pa-2018.firebaseapp.com'),
					FIREBASE_DATABASE: JSON.stringify('https://kilian-pa-2018.firebaseio.com'),
					FIREBASE_PROJECT_ID: JSON.stringify('kilian-pa-2018'),
					FIREBASE_STORAGE_BUCKET: JSON.stringify('kilian-pa-2018.appspot.com'),
					FIREBASE_SENDER_ID: JSON.stringify('608726727709')
				}
				: { // and on build (production):
					API: JSON.stringify('https://project-back.herokuapp.com/api/'),
					SPOTIFY_TOKEN: JSON.stringify(process.env.SPOTIFY_TOKEN),
					SPOTIFY_URL: JSON.stringify('https://api.spotify.com/v1/search'),
					FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
					FIREBASE_DOMAIN: JSON.stringify(process.env.FIREBASE_DOMAIN),
					FIREBASE_DATABASE: JSON.stringify(process.env.FIREBASE_DATABASE),
					FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
					FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
					FIREBASE_SENDER_ID: JSON.stringify(process.env.FIREBASE_SENDER_ID)
				},
			scopeHoisting: true,
			// vueRouterMode: 'history',
			// vueCompiler: true,
			// gzip: true,
			// analyze: true,
			// extractCSS: false,
			extendWebpack(cfg) {
				cfg.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				})
			}
		},
		devServer: {
			// https: true,
			// port: 8080,
			open: true // opens browser window automatically
		},
		// framework: 'all' --- includes everything; for dev only!
		framework: {
			components: [
				'QLayout',
				'QLayoutHeader',
				'QLayoutDrawer',
				'QPageContainer',
				'QPage',
				'QToolbar',
				'QToolbarTitle',
				'QBtn',
				'QIcon',
				'QList',
				'QListHeader',
				'QItem',
				'QItemMain',
				'QItemSide',
				'QCard',
				'QCardMain',
				'QCardTitle',
				'QInput',
				'QField',
				'QDatetime',
				'QAutocomplete',
				'QSelect',
        'QItemSeparator',
        'QItemTile',
        'QStepper',
        'QStep',
        'QStepperNavigation',
				'QUploader'
			],
			directives: [
				'Ripple'
			],
			// Quasar plugins
			plugins: [
				'Notify',
				'LocalStorage'
			],
			// iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
			i18n: 'fr' // Quasar language
		},
		// animations: 'all' --- includes all animations
		animations: ['slideInLeft', 'slideOutRight'],
		ssr: {
			pwa: false
		},
		pwa: {
			// workboxPluginMode: 'InjectManifest',
			// workboxOptions: {},
			manifest: {
				// name: 'Quasar App',
				// short_name: 'Quasar-PWA',
				// description: 'Best PWA App in town!',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#027be3',
				icons: [
					{
						'src': 'statics/icons/icon-128x128.png',
						'sizes': '128x128',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-192x192.png',
						'sizes': '192x192',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-256x256.png',
						'sizes': '256x256',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-384x384.png',
						'sizes': '384x384',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-512x512.png',
						'sizes': '512x512',
						'type': 'image/png'
					}
				]
			}
		},
		cordova: {
			// id: 'org.cordova.quasar.app'
		},
		electron: {
			// bundler: 'builder', // or 'packager'
			extendWebpack(cfg) {
				// do something with Electron process Webpack cfg
			},
			packager: {
				// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',

				// Window only
				// win32metadata: { ... }
			},
			builder: {
				// https://www.electron.build/configuration/configuration

				// appId: 'quasar-app'
			}
		}
	}
}
